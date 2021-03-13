import React, { useState,useEffect } from 'react'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import MoodIcon from '@material-ui/icons/Mood';
import { MicNoneOutlined, SendRounded } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import {selectThread} from '../../../features/threadSlice'
import db,{auth} from '../../../firebase'
import Message from './Message'
import './Thread.css'



const Thread = () => {
  const [input, setInput] = useState('')
  const [messagesRe, setMessagesRe] = useState([])
  const [messagesSe, setMessagesSe] = useState([])
  const [user, setUser]= useState('')
  const currentUser = useSelector(selectUser)
  const thread = useSelector(selectThread)
  
  

  useEffect(() => {
    if (thread) {
      db
        .collection('users')
        .doc(thread.uid)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessagesSe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )
    }
    auth.onAuthStateChanged((authUser) => {
          setUser({
            uid: authUser?.uid,
            photoURL: authUser?.photoURL,
            email: authUser?.email,
            displayName:authUser?.displayName,
          })
    })
    if(currentUser){
      db
        .collection('users')
        .doc(currentUser?.uid)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessagesRe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )}
  }, [thread, currentUser])
  const filterRe = messagesRe.filter((m) => m?.data?.uid === thread?.uid)
  const filterSe = messagesSe.filter((m)=> m?.data?.uid=== currentUser?.uid)
  const messages = filterRe.concat(filterSe)
  
  const sendMessage = (event) => {
    event.preventDefault()
    db.collection('users').doc(thread.uid).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photoURL: user.photoURL,
      email: user.email,
      displayName:user.displayName,
    }).then(() => {
      setInput('')
    })
  }
  return (
    <div className="thread" >
      <div className="thread_header" >
        <div className="thread_header_content" >
          {thread ? (<Avatar 
                        src = {thread.photoURL}
                    />) : (<Avatar />)}
          <div className="thread_header_content_info" >
            <h4>{thread ? thread.displayName : "Click on any chat Name"}</h4>
            <h5>last seen { new Date ((messages[messages.length-1]?.data?.timestamp?.toDate())).toLocaleString()}</h5> 
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread_header_detail"/>
        </IconButton>
      </div>
      <div className="thread_message">
        {messages?.map(({ id, data }) => (
          <Message key={id} data={data}/>
          )
        )}
      </div>
      <div className="thread_input">
        <form>
          <IconButton>
            <MoodIcon />
          </IconButton>
          <input
            placeholder="write your message here"
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          ></input>
          <IconButton onClick={sendMessage} type='submit'>
            <SendRounded/>
          </IconButton>
          <IconButton>
            <MicNoneOutlined/>
          </IconButton>
        </form>
      </div>
    </div>
  )
}

export default Thread
