import * as React from 'react'
import './uiStyles.css'

export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark md-4">
      <span className="navbar-brand">
        Juan
      </span>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  )
}
