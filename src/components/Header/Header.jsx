import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header-container">
        <Link to='/' className="header-title">feed</Link>
        <div className="header-buttons">
            <button className="submit-recipe">submit a recipe</button>
            <button className="create-account">create an account</button>
        </div>
    </div>
  )
}

export default Header