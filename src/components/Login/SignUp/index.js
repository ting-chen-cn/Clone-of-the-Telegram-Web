import React, { useState } from 'react'
import firebase from 'firebase'
import db,{ auth } from '../../../firebase'

const SignUp = () => {
  const [username,setUsername]= useState('')
  const [email, setEmail] = useState('hello@163.com')
  const [password, setPassword] = useState('password')
  const [passwordRe, setPasswordRe] = useState('password')
  const [usernameRepeated,setUsernameRepeated]=useState(false)

  const checkUsername = async({ name }) => {
    const snapshot = await db.collection('users').get()
    snapshot.forEach((doc) => {
      if (doc.data().displayName === name) {
        setUsernameRepeated(true)
      }
    })
  }

  const handleSignUp = async() => {
    await checkUsername(username)
    // eslint-disable-next-line no-undef
    if( usernameRepeated) return  alert('user name repeated, please use another one.')
    // eslint-disable-next-line no-undef
    if (password !== passwordRe) return alert('passwords would be the same, please input again')
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    const res= await auth.createUserWithEmailAndPassword(email, password)
    // eslint-disable-next-line no-undef
    if(!res.user) return alert('user sign up fails, please try again.')
    db.collection('users').doc(res.user.uid).set({
      uid: res.user?.uid,
      photoURL: res.user?.photoURL,
      email: res.user?.email,
      displayName: username,
      phoneNumber: res.user?.phoneNumber,
    })
    const user = auth.currentUser
    user.updateProfile({ displayName: username })
  }

  return (
    <div>
      <div id="signUp" className="signUp_default" >
        <div>
          <p>username</p>
          <input
            value={username}
            placeholder='please input the username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
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
