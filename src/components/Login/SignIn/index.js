import React, { useState } from 'react'
import firebase from 'firebase'
import { auth } from '../../../firebase'

const SignIn = () => {
  const [email, setEmail] = useState('hello@163.com')
  const [password, setPassword] = useState('password')
  const handleSignIn = async() => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    const res= await auth.signInWithEmailAndPassword(email, password)
    // eslint-disable-next-line no-undef
    if(!res.user) return alert('user sign in fails, please try again.')
    setEmail('')
    setPassword('')
  }
  return (
    <div>
      <div id="signIn" className="signIn_default" >
        <div>
          <p>email</p>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <p>password</p>
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='signIn-button' onClick={handleSignIn}>
            sign in
        </button>
      </div>
    </div>
  )
}

export default SignIn
