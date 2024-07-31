import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth'

function Header() {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="header-container">
        <Link to='/' className="header-title">feed</Link>
        <div className="header-buttons">
          {
             user ?
             <div className="user-info">
              <h2>Hi, {user?.displayName}!</h2>
              <button style={{cursor:"pointer"}} onClick={() => navigate('/favorites')} className="view-favorites">view favorites</button>
              <button style={{cursor: "pointer"}} onClick={()=>signOut(auth)} className="create-account">sign out</button>
              </div>
              :
              <button style={{cursor: "pointer"}} onClick={() => navigate('/auth')} className="create-account">create an account</button>
          }
            
            
        </div>
    </div>
  )
}

export default Header