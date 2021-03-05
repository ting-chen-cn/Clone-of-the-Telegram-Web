import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Telegram from './components/telegram'
import Login from './components/Login'
import {selectUser,login,logout} from './features/userSlice'
import {auth} from './firebase'
import './App.css'

function App() {
  const user = useSelector(selectUser)
  const dispatch =useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
          uid: authUser.uid,
          photo: authUser.photo,
          email: authUser.email,
          displayName: authUser.displayName
          })
        )} else {
        dispatch(logout())
      }
    })
  },[dispatch])
  return (
    <div className="App">
      {user ? <Telegram/> : <Login/>}
    </div>
  );
}

export default App;
