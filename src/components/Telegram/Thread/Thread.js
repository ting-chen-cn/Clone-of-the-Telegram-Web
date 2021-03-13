import React, { useState,useEffect } from 'react'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import MoodIcon from '@material-ui/icons/Mood';
import { MicNoneOutlined, SendRounded } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import {selectThreadId,selectThreadName} from '../../../features/threadSlice'
import db from '../../../firebase'
import Message from './Message'
import './Thread.css'



const Thread = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const user = useSelector(selectUser)
  const threadId = useSelector(selectThreadId)
  const threadName = useSelector(selectThreadName)

  useEffect(() => {
    if (threadId) {
      db
        .collection('threads')
        .doc(threadId)
        .collection('messages')
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )
    }
  }, [threadId])

  const sendMessage = (event) => {
    event.preventDefault()
    db.collection('threads').doc(threadId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo ? user.photo: null,
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
          {threadId ? (<Avatar 
                        src = {user.photo}
                    />) : (<Avatar />)}
          <div className="thread_header_content_info" >
            <h4>{threadId ? threadName : "Click on any chat Name"}</h4>
            <h5>last seen { new Date ((messages[messages.length-1]?.data?.timestamp?.toDate())).toLocaleString()}</h5> 
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread_header_detail"/>
        </IconButton>
      </div>
      <div className="thread_message">
        {messages.map(({ id, data }) => (
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
