import React from 'react'
import { ActionItem } from '../types'
import ActionCard from '../components/ActionCard'

type Props = {
  actions: ActionItem[]
  setActions: (a: ActionItem[])=>void
}

export default function Today({actions,setActions}:Props){
  const now = new Date()
  const urgent = actions.filter(a=> a.status !== 'Archivé' && a.urgency === 'Urgent')
  const overdue = actions.filter(a=> a.dueDate && new Date(a.dueDate) < now && a.status !== 'Archivé')
  const todo = actions.filter(a=> a.status === 'À faire')
  const blocked = actions.filter(a=> a.status === 'Bloqué')

  function saveOne(a: ActionItem){ setActions(actions.map(x=> x.id===a.id? a: x)) }
  function deleteOne(id:string){ setActions(actions.filter(a=> a.id!==id)) }

  return (
    <div className="container">
      <div className="page-title">Aujourd’hui</div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <div>
          <div className="muted">Urgent</div>
          {urgent.length===0 ? <div className="muted">Aucune action urgente.</div> : urgent.map(a=> <ActionCard key={a.id} action={a} onSave={saveOne} onDelete={deleteOne} />)}
        </div>
        <div>
          <div className="muted">En retard</div>
          {overdue.length===0 ? <div className="muted">Aucune action en retard.</div> : overdue.map(a=> <ActionCard key={a.id} action={a} onSave={saveOne} onDelete={deleteOne} />)}
        </div>
        <div>
          <div className="muted">À faire</div>
          {todo.length===0 ? <div className="muted">Aucune action à faire.</div> : todo.map(a=> <ActionCard key={a.id} action={a} onSave={saveOne} onDelete={deleteOne} />)}
        </div>
        <div>
          <div className="muted">Bloqué</div>
          {blocked.length===0 ? <div className="muted">Aucune action bloquée.</div> : blocked.map(a=> <ActionCard key={a.id} action={a} onSave={saveOne} onDelete={deleteOne} />)}
        </div>
      </div>
    </div>
  )
}
