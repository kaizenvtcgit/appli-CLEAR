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
      {[...byCat.entries()].map(([cat,list])=> (
        <div key={cat} style={{marginBottom:12}}>
          <div style={{fontWeight:700,marginBottom:8}}>{cat}</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {list.map(a=> (
              <div key={a.id}>
                <ActionCard action={a} onSave={saveOne} onDelete={deleteOne} />
                <div style={{marginTop:6}}>
                  <button onClick={()=>archiveIfFinished(a)}>Archiver si terminé</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {validated.length===0 && <div className="muted">Aucune responsabilité validée.</div>}
    </div>
  )
}
