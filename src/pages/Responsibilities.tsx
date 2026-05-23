import React from 'react'
import { ActionItem } from '../types'
import ActionCard from '../components/ActionCard'

type Props = { actions: ActionItem[], setActions: (a:ActionItem[])=>void }

export default function Responsibilities({actions,setActions}:Props){
  const validated = actions.filter(a=> a.status !== 'À valider' && a.status !== 'Archivé')
  const byCat = new Map<string, ActionItem[]>()
  validated.forEach(a=>{
    if (!byCat.has(a.category)) byCat.set(a.category,[])
    byCat.get(a.category)!.push(a)
  })

  function saveOne(a: ActionItem){ setActions(actions.map(x=> x.id===a.id? a:x)) }
  function deleteOne(id:string){ setActions(actions.filter(a=> a.id!==id)) }

  function archiveIfFinished(a: ActionItem){
    if (a.status === 'Terminé'){
      setActions(actions.map(x=> x.id===a.id? {...x,status:'Archivé', updatedAt:new Date().toISOString()}:x))
    }
  }

  return (
    <div className="container">
      <div className="page-title">Responsabilités</div>
      <div className="page-subtitle">Classe tes actions par domaine pour une charge mentale allégée.</div>
      {[...byCat.entries()].map(([cat,list])=> (
        <div key={cat} className="section-block">
          <div className="section-label">{cat}</div>
          <div className="actions-list">
            {list.map(a=> (
              <div key={a.id}>
                <ActionCard action={a} onSave={saveOne} onDelete={deleteOne} />
                <div className="action-controls" style={{gap:12,marginTop:10}}>
                  <button className="btn btn-secondary btn-small" onClick={()=>archiveIfFinished(a)}>Archiver si terminé</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {validated.length===0 && <div className="empty-state-card">Aucune responsabilité validée.</div>}
    </div>
  )
}
