import React from 'react'
import { Button } from '@material-ui/core'
import {auth,provider} from '../firebase'
import './Login.css'

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error)=>alert(error.message))
  }
  return (
    <div className="login">
      <div className="login_telegram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"/>
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  )
}

export default Login
