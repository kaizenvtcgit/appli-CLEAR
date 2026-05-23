import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  {to: '/', label: 'Aujourd’hui'},
  {to: '/vide', label: 'Vide ma tête'},
  {to: '/valider', label: 'À valider'},
  {to: '/responsabilites', label: 'Responsabilités'},
  {to: '/params', label: 'Paramètres'}
]

export default function BottomNav(){
  return (
    <div className="bottom-nav">
      <div className="nav-inner">
        {items.map(i=> (
          <NavLink key={i.to} to={i.to} className={({isActive})=> 'nav-button'+(isActive? ' active':'')} end>
            <span className="nav-label">{i.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
