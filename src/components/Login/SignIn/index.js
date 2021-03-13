import React, { useState } from 'react'
import { auth } from '../../../firebase'

const SignIn = () => {
  const [email, setEmail] = useState('hello@163.com')
  const [password, setPassword] = useState('password')
  const handleSignIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('login successfully')
        // console.log(res.user)
      })
        .catch((error) => {
          alert(error.message)
        })
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
