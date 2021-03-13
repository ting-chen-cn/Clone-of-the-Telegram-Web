import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import BorderColorOutlinedIcon  from '@material-ui/icons/BorderColorOutlined'
import { useSelector } from 'react-redux'
import {selectUser} from '../../../features/userSlice'
import './SideBar.css'
import SideBarThreads from './SideBarThreads '
import db from '../../../firebase'
import Profile from './Profile'

function SideBar() {
  const user = useSelector(selectUser)
  const [threads, setThreads] = useState([])
  const [showProfile,setShowProfile]=useState(false)
  useEffect(() => {
    db.collection('threads').onSnapshot((snapshot) =>
      setThreads(snapshot.docs.map((doc) => {
        return ({
          id: doc.id,
          data: doc.data(),
        })
      }
      ))
      
    )
  }, [])
  
  // const show = () =>{
  //       const element = document.getElementById("profile");
  //       element.classList.toggle("profile");
  //   }

  const show = () => {
    setShowProfile(!showProfile)
  }
  
  const addThread = () => {
    const threadName = prompt('Enter a thread name.')
    if (threadName) {
      db.collection('threads').add({
        threadName: threadName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: {
          email: user.email,
          displayName: user.displayName,
        },
      })
    }
  }

  return (
    <div className="sideBar">
      <div className="sideBar_header">
        <MenuIcon className="sidebar_menu" onClick={show} />
        <div>Telegram</div>
      </div>
      <div className="sideBar_body">
        {showProfile ?
          <div>
            <div className="sideBar_search">
            <SearchIcon className="searchIcon"/>
            <input placeholder="Search" className="search_input"></input>
          </div>
          <IconButton variant="outlined" id="sideBar_button" onClick={addThread}>
            <BorderColorOutlinedIcon  />
          </IconButton>
          <div className="sideBar_threads">
            {threads
              .map(({ id, data: { threadName } }) => (
                <SideBarThreads key={id} id={id} threadName={threadName}/>
              )
            )}
        </div>
          </div>
          :
          <Profile />
        }
          
        
        </div>
    </div>
  )
}

export default SideBar
