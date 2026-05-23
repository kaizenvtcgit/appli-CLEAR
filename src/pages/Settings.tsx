import React from 'react'
import { exportActions, clearAll } from '../lib/storage'

type Props = { setActionsDump: (items:string)=>void }

export default function Settings({setActionsDump}:Props){
  function handleExport(){
    const data = exportActions()
    setActionsDump(data)
    const blob = new Blob([data],{type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clair-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleClear(){
    if (confirm('Supprimer toutes les données stockées localement ? Cette action est irréversible.')){
      clearAll()
      window.location.reload()
    }
  }

  return (
    <div className="container">
      <div className="page-title">Paramètres & Mes données</div>
      <div className="page-subtitle">Garde le contrôle sur tes données locales et tes sauvegardes.</div>
      <div className="card">
        <p className="muted">Toutes les données sont stockées localement sur cet appareil dans cette version.</p>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:16}}>
          <button className="btn btn-primary" onClick={handleExport}>Exporter mes données (JSON)</button>
          <button className="btn btn-danger" onClick={handleClear}>Supprimer toutes mes données</button>
        </div>
      </div>
    </div>
  )
}
