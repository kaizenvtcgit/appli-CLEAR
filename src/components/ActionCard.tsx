import React, { useState } from 'react'
import { ActionItem, Status, Urgency } from '../types'

type Props = {
  action: ActionItem
  onSave: (a: ActionItem)=>void
  onDelete: (id:string)=>void
  onValidate?: (id:string)=>void
}

export default function ActionCard({action,onSave,onDelete,onValidate}:Props){
  const [editable, setEditable] = useState(false)
  const [local, setLocal] = useState(action)

  function save(){
    setEditable(false)
    onSave({...local, updatedAt: new Date().toISOString()})
  }

  return (
    <div className="card">
      {!editable ? (
        <div>
          <div className="action-title">{action.title}</div>
          <div className="action-meta">{action.category} • {action.urgency} {action.dueDate? '• '+new Date(action.dueDate).toLocaleDateString() : ''}</div>
          <div style={{marginTop:8,display:'flex',gap:8}}>
            <button onClick={()=>setEditable(true)}>Modifier</button>
            <button onClick={()=>onDelete(action.id)}>Supprimer</button>
            {onValidate && <button onClick={()=>onValidate(action.id)}>Valider</button>}
          </div>
        </div>
      ) : (
        <div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <input value={local.title} onChange={e=>setLocal({...local,title:e.target.value})} />
            <div style={{display:'flex',gap:8}}>
              <select value={local.category} onChange={e=>setLocal({...local,category:e.target.value})}>
                <option>Maison</option>
                <option>Administratif</option>
                <option>Santé</option>
                <option>École</option>
                <option>Courses</option>
                <option>Famille</option>
                <option>Animaux</option>
                <option>Voiture</option>
                <option>Abonnements</option>
                <option>Finances</option>
                <option>Autre</option>
              </select>
              <select value={local.status} onChange={e=>setLocal({...local,status: e.target.value as Status})}>
                <option>À valider</option>
                <option>À faire</option>
                <option>En cours</option>
                <option>En attente</option>
                <option>Bloqué</option>
                <option>Terminé</option>
                <option>Archivé</option>
              </select>
              <select value={local.urgency} onChange={e=>setLocal({...local,urgency: e.target.value as Urgency})}>
                <option>Faible</option>
                <option>Normal</option>
                <option>Important</option>
                <option>Urgent</option>
              </select>
            </div>
            <div style={{display:'flex',gap:8}}>
              <input type="date" value={local.dueDate? new Date(local.dueDate).toISOString().slice(0,10):''} onChange={e=>setLocal({...local,dueDate: e.target.value? new Date(e.target.value).toISOString():null})} />
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={save}>Enregistrer</button>
              <button onClick={()=>setEditable(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
