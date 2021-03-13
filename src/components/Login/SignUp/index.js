import React,{useState} from 'react'
import db,{ auth } from '../../../firebase'

const SignUp = () => {
  const [email, setEmail] = useState('hello@163.com')
  const [password, setPassword] = useState('password')
  const [passwordRe, setPasswordRe] = useState('password')

  const handleSignUp = () => {
    if (password === passwordRe) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) {
            db.collection('users').doc(res.user.uid).collection('profile').add({
              uid: res.user?.uid,
              photoURL: res.user?.photoURL,
              email: res.user?.email,
              displayName: res.user?.displayName,
              phoneNumber: res.user?.phoneNumber,
            })
          }
          })
        .catch((error) => {
          alert(error.message)
            })
      } else {
        alert('passwords would be the same, please input again')
      }
    setEmail('')
    setPassword('')
    setPasswordRe('')
  }

  return (
    <div>
      <div id="signUp" className="signUp_default" >
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
            <div>
            <p>repeat password</p>
            <input
              type='password'
              value={passwordRe}
              onChange={({ target }) => setPasswordRe(target.value)}
            />
          </div>
          <button id='signUp-button' onClick={handleSignUp}>
            Create new user
          </button>
          </div>
    </div>
  )
}

export default SignUp
