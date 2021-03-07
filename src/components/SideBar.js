import React,{useState,useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import  BorderColorOutlinedIcon  from '@material-ui/icons/BorderColorOutlined'
import {
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings
} from '@material-ui/icons'
import { useSelector } from 'react-redux'
import {selectUser} from '../features/userSlice'
import './SideBar.css'
import SideBarThreads from './SideBarThreads'
import db,{auth} from '../firebase'



function SideBar() {
  const user = useSelector(selectUser)
  const [threads, setThreads] = useState([])
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
  

  const addThread = () => {
    const threadName = prompt('Enter a thread name.')
    if (threadName) {
      db.collection('threads').add({
        threadName: threadName
      })
    }
  }

  return (
    <div className="sideBar">
      <div className="sideBar_header">
        <div className="sideBar_search">
          <SearchIcon className="searchIcon"/>
          <input placeholder="Search" className="search_input"></input>
        </div>
        <IconButton variant="outlined" id="sideBar_button" onClick={addThread}>
          <BorderColorOutlinedIcon  />
        </IconButton>
      </div>
      <div className="sideBar_threads">
        {threads
          .map(({ id, data: { threadName } }) => (
          <SideBarThreads key={id} id={id} threadName={threadName}/>
          )
        )}
      </div>
      <div className="sideBar_bottom">
        <Avatar src = {user.photo} className="sideBar_bottom_avatar" onClick={ ()=>auth.signOut()}/>
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  )
}

export default SideBar
