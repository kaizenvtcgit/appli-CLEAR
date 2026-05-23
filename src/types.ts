export type Urgency = 'Faible' | 'Normal' | 'Important' | 'Urgent'

export type Status = 'À valider' | 'À faire' | 'En cours' | 'En attente' | 'Bloqué' | 'Terminé' | 'Archivé'

export interface ActionItem {
  id: string
  title: string
  category: string
  status: Status
  urgency: Urgency
  dueDate: string | null
  sourceText: string
  createdAt: string
  updatedAt: string
}
