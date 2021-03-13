import React from 'react'
import firebase from 'firebase'
import {useDispatch} from 'react-redux'
import { Avatar} from '@material-ui/core'
import db, { auth } from '../../../../firebase'
import { setThread } from '../../../../features/threadSlice'
import {logout} from '../../../../features/userSlice'
import Photo from './Photo'
import './Profile.css'


const Profile = () => {
  const dispatch =useDispatch()
  const user = firebase.auth().currentUser
  const useref = db.collection('users').doc(user.uid)
  
  const setDisplayName = () =>{
    const displayName = prompt('Enter your display name.')
    if (window.confirm(`Do you want to change your display name to ${displayName} `))
    {
    useref.update({ displayName: displayName })
    user.updateProfile({
      displayName: displayName
    }).then(function () {
      alert(`you successfully changed your display name to ${displayName}`)
    }).catch(function (error) {
      alert(error.message)
    })}
  }
  
  const openSetPhoto = () => {
    const element = document.getElementById("photo");
    element.classList.toggle("photo")
  }

  const signOut = () => {
    const data = {data:null}
    auth.signOut()
    dispatch(setThread(data))
    dispatch(logout())
  }
  return (
    <div id="profile" className="profile">
      <div>
        <Avatar onClick={openSetPhoto} src={user?.photoURL} />
        <p><strong>email:</strong> {user?.email}</p>
        <p onClick={setDisplayName}><strong>username:</strong> {user?.displayName ? user?.displayName : 'please set display name'}</p>
      </div>
      <Photo user={user}/>
      <div onClick={signOut}>
        <button >Sign Out</button>
      </div>
    </div>
  )
}

export default Profile
