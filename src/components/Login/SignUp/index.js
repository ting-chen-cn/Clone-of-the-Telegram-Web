import React,{useState} from 'react'
import db,{ auth } from '../../../firebase'

const SignUp = () => {
  const [username,setUsername]= useState('')
  const [email, setEmail] = useState('hello@163.com')
  const [password, setPassword] = useState('password')
  const [passwordRe, setPasswordRe] = useState('password')
  const [usernameRepeated,setUsernameRepeated]=useState(false)

  const checkUsername = async({ name }) => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      if (doc.data().displayName === name) {
        setUsernameRepeated(true)
      }
    })
  }

  const handleSignUp = async() => {
    await checkUsername(username)
    if(! usernameRepeated)
    {if (password === passwordRe) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) {
            db.collection('users').doc(res.user.uid).set({
              uid: res.user?.uid,
              photoURL: res.user?.photoURL,
              email: res.user?.email,
              displayName: username,
              phoneNumber: res.user?.phoneNumber,
            })
            const user = auth.currentUser
            user.updateProfile({
                displayName: username
            })
          }
          })
        .catch((error) => {
          alert(error.message)
            })
      } else {
        alert('passwords would be the same, please input again')
    }
    } else {
      alert('user name repeated, please use another one.')
      }
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
