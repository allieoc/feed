import React, {useState} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import './Auth.css'
import {useNavigate} from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();

    const [existingUser, setExistingUser] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            updateProfile(auth.currentUser, {displayName: name});
            navigate('/');
        })
        .catch(err => alert(err.code))
    };

    const handleLogin = (e) => {
      e.preventDefault();
      //login
      signInWithEmailAndPassword(auth, email, password)
      .then(res => navigate("/"))
      .catch(err => alert(err.code))
    }

  return (
    <div>
        {existingUser ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Log in with your email</h1>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?
            <span className="form-link" onClick={()=>setExistingUser(false)}>
              Sign up
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignUp}>
          <h1>Sign up with your email</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              required
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?
            <span className="form-link" onClick={()=>setExistingUser(true)}>
              Log In
            </span>
          </p>
        </form>
      )}
    </div>
  )
}

export default Auth