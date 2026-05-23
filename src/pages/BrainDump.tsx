import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseToActions } from '../lib/parser'
import { ActionItem } from '../types'

type Props = { actions: ActionItem[], setActions: (a:ActionItem[])=>void }

export default function BrainDump({actions,setActions}:Props){
  const [text,setText] = useState('')
  const navigate = useNavigate()

  function transform(){
    const parsed = parseToActions(text)
    const merged = [...parsed, ...actions]
    setActions(merged)
    setText('')
    navigate('/valider')
  }

  return (
    <div className="container">
      <div className="page-title">Vide ma tête</div>
      <div className="page-subtitle">Transforme tes pensées en actions claires et gérables.</div>
      <div className="card">
        <textarea className="textarea" rows={8} value={text} onChange={e=>setText(e.target.value)} placeholder="Écrivez tout ce qui vous traverse l'esprit..."></textarea>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}>
          <button className="btn btn-primary" onClick={transform} disabled={!text.trim()}>Transformer en actions</button>
        </div>
      </div>
    </div>
  )
}
