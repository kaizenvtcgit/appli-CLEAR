import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  {to: '/', label: 'Aujourd\u2019hui'},
  {to: '/vide', label: 'Vide ma t\u00eate'},
  {to: '/valider', label: '\u00c0 valider'},
  {to: '/responsabilites', label: 'Responsabilit\u00e9s'},
  {to: '/params', label: 'Param\u00e8tres'}
]

export default function BottomNav(){
  return (
    <div className="bottom-nav">
      <div className="nav-inner">
        {items.map(i=> (
          <NavLink key={i.to} to={i.to} className={({isActive})=> 'nav-button'+(isActive? ' active':'')} end>
            <div>{i.label}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
