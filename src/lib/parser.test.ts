import { describe, it, expect } from 'vitest'
import { parseToActions } from './parser'

describe('parser', () => {
  it('split into multiple actions', () => {
    const text = "Appeler assurance. Acheter du pain demain. Répondre au mail de l'école."
    const res = parseToActions(text)
    expect(res.length).toBe(3)
  })

  it('detects Administratif', () => {
    const text = "Renvoyer le document d'assurance."
    const res = parseToActions(text)
    expect(res[0].category).toBe('Administratif')
  })

  it('detects École', () => {
    const text = "Préparer la réunion de l'école lundi."
    const res = parseToActions(text)
    expect(res[0].category).toBe('École')
  })

  it('detects urgency', () => {
    const text = "C'est urgent: appeler le médecin."
    const res = parseToActions(text)
    expect(res[0].urgency).toBe('Urgent')
  })

  it('detects demain as date', () => {
    const text = "Acheter des fleurs demain."
    const res = parseToActions(text)
    expect(res[0].dueDate).not.toBeNull()
  })

  it('no date -> dueDate null', () => {
    const text = "Penser à organiser le garage."
    const res = parseToActions(text)
    expect(res[0].dueDate).toBeNull()
  })
})
