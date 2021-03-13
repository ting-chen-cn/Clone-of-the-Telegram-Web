import React,{useState} from 'react'
import { Avatar} from '@material-ui/core'
import db,{  firebaseApp } from '../../../../../firebase'



const Photo = ({user}) => {
  const [boy, setBoy] = useState('')
  const [girl, setGirl] = useState('')
  const [man, setMan] = useState('')
  const [woman, setWoman] = useState('')
  firebaseApp.storage().ref().child('images/boy.jpg').getDownloadURL().then((url) => setBoy(url))
  firebaseApp.storage().ref().child('images/girl.jpg').getDownloadURL().then((url) => setGirl(url))
  firebaseApp.storage().ref().child('images/man.jpg').getDownloadURL().then((url) => setMan(url))
  firebaseApp.storage().ref().child('images/woman.jpg').getDownloadURL().then((url)=>setWoman(url))
  
  const useref = db.collection('users').doc(user.uid)

  const openSetPhoto = () => {
    const element = document.getElementById("photo");
    element.classList.toggle("photo");
  }

  return (
      <div id="photo" className="photo_default">
        <div>
          <Avatar
            style={{ height: '80px', width: '80px' }}
          onClick={() => {
            useref.update({ photoURL: boy })
            user.updateProfile({ photoURL: boy })
            openSetPhoto()
          }}
            alt='boy' src={boy} />
          <Avatar
            style={{ height: '80px', width: '80px' }}
          onClick={() => {
            useref.update({ photoURL: girl })
            user.updateProfile({ photoURL: girl })
            openSetPhoto()
          }}
            alt='girl' src={girl} />
        </div>
        <div>
        <Avatar
          style={{ height: '80px', width: '80px' }}
          onClick={() => {
            useref.update({ photoURL: man })
            user.updateProfile({ photoURL: man })
            openSetPhoto()
          }}
          alt='man' src={man} />
        <Avatar
          style={{ height: '80px', width: '80px' }}
          onClick={() => {
            useref.update({ photoURL: woman })
            user.updateProfile({ photoURL: woman })
            openSetPhoto()
          }}
          alt='woman' src={woman} />
        </div>
      </div>
  )
}

export default Photo