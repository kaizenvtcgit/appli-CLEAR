import React from 'react'
import { ActionItem } from '../types'
import ActionCard from '../components/ActionCard'

type Props = {
  actions: ActionItem[]
  setActions: (a: ActionItem[])=>void
}

export default function ToValidate({actions,setActions}:Props){
  const generated = actions.filter(a=> a.status === 'À valider')

  function saveOne(a: ActionItem){
    setActions(actions.map(x=> x.id===a.id? a: x))
  }
  function deleteOne(id:string){
    setActions(actions.filter(a=> a.id!==id))
  }
  function validate(id:string){
    setActions(actions.map(a=> a.id===id? {...a,status:'À faire', updatedAt:new Date().toISOString()}:a))
  }

  return (
    <div className="container">
      <div className="page-title">À valider</div>
      <div className="actions-list">
        {generated.length === 0 && <div className="muted">Aucune action en attente de validation.</div>}
        {generated.map(a=> (
          <ActionCard key={a.id} action={a} onSave={saveOne} onDelete={deleteOne} onValidate={validate} />
        ))}
      </div>
    </div>
  )
}
