import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Today from './pages/Today'
import ToValidate from './pages/ToValidate'
import BrainDump from './pages/BrainDump'
import Responsibilities from './pages/Responsibilities'
import Settings from './pages/Settings'
import BottomNav from './components/BottomNav'
import { ActionItem } from './types'
import { loadActions, saveActions } from './lib/storage'

export default function App(){
  const [actions, setActionsState] = useState<ActionItem[]>([])
  const [dump, setDump] = useState('')

  useEffect(()=>{
    setActionsState(loadActions())
  },[])

  useEffect(()=>{
    saveActions(actions)
  },[actions])

  function setActions(a: ActionItem[]){ setActionsState(a) }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Today actions={actions} setActions={setActions} />} />
        <Route path="/vide" element={<BrainDump actions={actions} setActions={setActions} />} />
        <Route path="/valider" element={<ToValidate actions={actions} setActions={setActions} />} />
        <Route path="/responsabilites" element={<Responsibilities actions={actions} setActions={setActions} />} />
        <Route path="/params" element={<Settings setActionsDump={setDump} />} />
      </Routes>

      <BottomNav />
    </div>
  )
}
