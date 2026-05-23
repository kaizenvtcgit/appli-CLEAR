import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  {to: '/', label: 'Jour'},
  {to: '/vide', label: 'Vider'},
  {to: '/valider', label: 'Valider'},
  {to: '/responsabilites', label: 'Resp.'},
  {to: '/params', label: 'Données'}
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
