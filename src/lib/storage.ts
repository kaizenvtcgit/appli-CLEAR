import { ActionItem } from '../types'

const KEY = 'clair:actions:v0'

export function loadActions(): ActionItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as ActionItem[]
  } catch (e) {
    console.error('Failed to load actions', e)
    return []
  }
}

export function saveActions(items: ActionItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function exportActions(): string {
  return JSON.stringify(loadActions(), null, 2)
}

export function clearAll() {
  localStorage.removeItem(KEY)
}
