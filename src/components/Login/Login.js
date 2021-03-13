import React from 'react'
import { Button } from '@material-ui/core'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Login.css'


const Login = () => {

  const showSignInform = () =>{
        const element = document.getElementById("signIn");
        element.classList.toggle("signIn");
    }
  const showSignUpform = () =>{
        const element = document.getElementById("signUp");
        element.classList.toggle("signUp");
  }

  return (
    <div className="login">
      <div className="login_telegram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt = "telgram logo"/>
        <h1>Telegram</h1>
      </div>
      <div>
        <Button onClick={showSignInform}>Sign in</Button>
        <SignIn/>
        <Button onClick={showSignUpform}>Sign up</Button>
        <SignUp/>
      </div>
    </div>
  )
}

export default Login
