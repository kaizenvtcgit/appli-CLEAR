import { ActionItem, Urgency } from '../types'

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Administratif: ['assurance','facture','impôts','papier','document','banque','contrat','assurance'],
  École: ['école','classe','sortie','professeur','devoir','maternelle','cp','collège','lycée'],
  Santé: ['médecin','dentiste','ordonnance','rendez-vous','santé','hospital','hospitalier'],
  Courses: ['courses','acheter','supermarché','repas','caddie','épicerie'],
  Famille: ['cadeau','anniversaire','parent','enfant','famille','bébé'],
  Animaux: ['chien','chat','vétérinaire','animal','promener'],
  Voiture: ['voiture','contrôle technique','garage','essence','pneu'],
  Abonnements: ['abonnement','résilier','netflix','edf','téléphone','free','sfr'],
  Finances: ['facture','payer','banque','budget','impôt','revenu'],
  Maison: ['ménage','lessive','réparer','maison','réparation','bricolage']
}

const URGENT_WORDS = ['urgent','immédiat','tout de suite','asap','au plus vite','d\'urgence']
const IMPORTANT_WORDS = ['important','avant','dois','nécessaire']

function detectCategory(text: string): string {
  const t = text.toLowerCase()
  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const w of words) {
      if (t.includes(w)) return cat
    }
  }
  return 'Autre'
}

function detectUrgency(text: string): Urgency {
  const t = text.toLowerCase()
  for (const w of URGENT_WORDS) if (t.includes(w)) return 'Urgent'
  for (const w of IMPORTANT_WORDS) if (t.includes(w)) return 'Important'
  return 'Normal'
}

function parseRelativeDate(text: string): string | null {
  const t = text.toLowerCase()
  const now = new Date()
  if (t.includes("aujourd") || t.includes("aujourd'hui")) return now.toISOString()
  if (t.includes('demain')) {
    const d = new Date(now)
    d.setDate(d.getDate() + 1)
    return d.toISOString()
  }

  const weekdays: Record<string, number> = {
    lundi:1,mardi:2,mercredi:3,jeudi:4,vendredi:5,samedi:6,dimanche:0
  }
  for (const [name, idx] of Object.entries(weekdays)) {
    if (t.includes(name)) {
      // compute next weekday
      const d = new Date(now)
      const diff = (idx - d.getDay() + 7) % 7 || 7
      d.setDate(d.getDate() + diff)
      return d.toISOString()
    }
  }

  // naive absolute date detection: dd/mm or dd-mm
  const m = text.match(/(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?/) 
  if (m) {
    let day = parseInt(m[1],10)
    let month = parseInt(m[2],10) - 1
    let year = m[3] ? parseInt(m[3],10) : now.getFullYear()
    if (year < 100) year += 2000
    const d = new Date(year, month, day)
    if (!isNaN(d.getTime())) return d.toISOString()
  }

  return null
}

function splitSentences(text: string): string[] {
  // Normalize common separators: commas -> point, ' et ' -> point, then split on . ! ? ; or newline
  const normalized = text.replace(/,/g, '.').replace(/\s+et\s+/gi, '. ')
  return normalized
    .split(/[\n.!?;]+/)
    .map(s => s.trim())
    .filter(Boolean)
}

export function parseToActions(sourceText: string): ActionItem[] {
  const sentences = splitSentences(sourceText)
  const now = new Date().toISOString()
  const actions: ActionItem[] = sentences.map(s=>{
    const category = detectCategory(s)
    const urgency = detectUrgency(s)
    const dueDate = parseRelativeDate(s)
    return {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,
      title: s.length>120 ? s.slice(0,117)+'...' : s,
      category,
      status: 'À valider',
      urgency,
      dueDate,
      sourceText: sourceText,
      createdAt: now,
      updatedAt: now
    }
  })
  return actions
}
