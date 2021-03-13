import React from 'react'
import firebase from 'firebase'
import { Avatar} from '@material-ui/core'
import {Tune} from '@material-ui/icons'
import { auth,firebaseApp } from '../../../../firebase'


const Profile = () => {
  const user = firebase.auth().currentUser
  const setDisplayName = () =>{
    const displayName = prompt('Enter your display name.')
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName
    }).then(function () {
      alert(`you successfully changed your display name to ${displayName}`)
    }).catch(function (error) {
      alert(error.message)
    });
  }
  const setPhoto = () =>{
    const photoURL = prompt('Enter your display name.')
    const user = firebase.auth().currentUser;
    const forestRef = firebaseApp.storage().ref().child('images/boy.jpg');
    forestRef.getDownloadURL().then((url) => {user.updateProfile({
      photoURL: url
    }).then(function () {
      alert(`you successfully changed your display name to ${photoURL}`)
    }).catch(function (error) {
      alert(error.message)
    }); })
    
    
  }
  

  const signOut = () => {
        auth.signOut();
  }
  return (
    <div id="profile" className="profile">
      <div>
        <Avatar alt={user?.displayName} src={user?.photoURL} />
        <h3>{user?.displayName}</h3>
      </div>
      <div className="profile_detail">
        <div onClick={setDisplayName}>
          <Tune/>
          <p >set display name</p>
        </div>
        <div onClick={setPhoto}>
          <Tune />
          <p >set PhotoURL</p>
        </div>
        <div onClick={signOut}>
          <Tune />
          <p >Sign Out</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
