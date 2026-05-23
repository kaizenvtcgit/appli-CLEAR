import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  {to: '/', icon: '🏠', label: 'Aujourd\u2019hui'},
  {to: '/vide', icon: '🧠', label: 'Vide ma t\u00eate'},
  {to: '/valider', icon: '✅', label: '\u00c0 valider'},
  {to: '/responsabilites', icon: '📋', label: 'Responsabilit\u00e9s'},
  {to: '/params', icon: '⚙️', label: 'Param\u00e8tres'}
]

export default function BottomNav(){
  return (
    <div className="bottom-nav">
      <div className="nav-inner">
        {items.map(i=> (
          <NavLink key={i.to} to={i.to} className={({isActive})=> 'nav-button'+(isActive? ' active':'')} end>
            <span className="nav-icon">{i.icon}</span>
            <span className="nav-label">{i.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
