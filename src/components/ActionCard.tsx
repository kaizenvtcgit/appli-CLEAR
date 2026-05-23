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
    <div className="action-card">
      {!editable ? (
        <>
          <div className="action-header">
            <div className="action-title">{action.title}</div>
            <div className="action-meta">{action.category} • {action.urgency} {action.dueDate? '• '+new Date(action.dueDate).toLocaleDateString() : ''}</div>
          </div>
          <div className="action-badges">
            <span className={action.urgency === 'Urgent' ? 'badge badge-urgency' : action.urgency === 'Important' ? 'badge badge-positive' : 'badge badge-normal'}>{action.urgency}</span>
            <span className="badge badge-category">{action.category}</span>
          </div>
          <div className="action-controls">
            <button className="btn btn-secondary btn-small" onClick={()=>setEditable(true)}>Modifier</button>
            <button className="btn btn-secondary btn-small" onClick={()=>onDelete(action.id)}>Supprimer</button>
            {onValidate && <button className="btn btn-primary btn-small" onClick={()=>onValidate(action.id)}>Valider</button>}
          </div>
        </>
      ) : (
        <div className="card-form">
          <input className="text-input" value={local.title} onChange={e=>setLocal({...local,title:e.target.value})} />
          <div className="form-row">
            <select className="select" value={local.category} onChange={e=>setLocal({...local,category:e.target.value})}>
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
            <select className="select" value={local.status} onChange={e=>setLocal({...local,status: e.target.value as Status})}>
              <option>À valider</option>
              <option>À faire</option>
              <option>En cours</option>
              <option>En attente</option>
              <option>Bloqué</option>
              <option>Terminé</option>
              <option>Archivé</option>
            </select>
            <select className="select" value={local.urgency} onChange={e=>setLocal({...local,urgency: e.target.value as Urgency})}>
              <option>Faible</option>
              <option>Normal</option>
              <option>Important</option>
              <option>Urgent</option>
            </select>
          </div>
          <div className="form-row">
            <input className="text-input" type="date" value={local.dueDate? new Date(local.dueDate).toISOString().slice(0,10):''} onChange={e=>setLocal({...local,dueDate: e.target.value? new Date(e.target.value).toISOString():null})} />
          </div>
          <div className="edit-actions">
            <button className="btn btn-primary btn-small" onClick={save}>Enregistrer</button>
            <button className="btn btn-secondary btn-small" onClick={()=>setEditable(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  )
}
