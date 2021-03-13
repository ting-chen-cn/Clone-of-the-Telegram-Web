import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import BorderColorOutlinedIcon  from '@material-ui/icons/BorderColorOutlined'
import { useSelector } from 'react-redux'
import {selectUser} from '../../../features/userSlice'
import SideBarThreads from './SideBarThreads '
import db from '../../../firebase'
import Profile from './Profile'
import './SideBar.css'

function SideBar() {
  const user = useSelector(selectUser)
  const [threads, setThreads] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  
  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) =>
      setThreads(snapshot.docs.map((doc) => {
        return ({
          id: doc.id,
          data: doc.data(),
        })
      }))
    )
  }, [])

  const show = () => {
    setShowProfile(!showProfile)
  }
  const showThreads =threads.filter((t)=>t.id!==user.uid) 
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
          <Profile />
          :
          <div>
            <div className="sideBar_search">
              <SearchIcon className="searchIcon"/>
              <input placeholder="Search" className="search_input"></input>
              <IconButton variant="outlined" id="sideBar_button" onClick={addThread}>
              <BorderColorOutlinedIcon  />
            </IconButton>
            </div>
            <div className="sideBar_threads">
              {showThreads
                .map(({ id, data }) => (
                  <SideBarThreads key={id} id={id} data={data}/>
                )
              )}
            </div>
          </div>
        }
        </div>
    </div>
  )
}

export default SideBar
