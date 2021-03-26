import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import db from '../../../../firebase'
import { setThread } from '../../../../features/threadSlice'
import './SideBarThreads.css'


const SideBarThreads = ({ id, data,user }) => {
  const dispatch = useDispatch()
  

  const [messagesRe, setMessagesRe] = useState([])
  const [messagesSe, setMessagesSe] = useState([])
  

  useEffect(() => {
    if (id) {
      db
        .collection('users')
        .doc(id)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessagesSe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )
    }
    if(user){
      db
        .collection('users')
        .doc(user?.uid)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessagesRe(snapshot.docs.map((doc) => ({
            id: doc.id,
            data:doc.data(),
          })))
        )}
  }, [id, user])
  
  const filterRe = messagesRe.filter((m) => m?.data?.uid === id)
  const filterSe = messagesSe.filter((m)=> m?.data?.uid=== user?.uid)
  const messages = filterRe.concat(filterSe)
  messages.sort(function (a, b) { return a.data?.timestamp - b.data?.timestamp })

  return (
    <div
      onClick={()=>dispatch(setThread({data}))}
      className="sideBarThreads">
      <Avatar src={ data?.photoURL}/>
      <div className="sideBarThread_details">
        <p> {data.displayName}</p>
        <div>{messages[0]?.data?.message}</div>
        <small className="sideBarThread_timestamp">
          {/* { messages[0] ? toDate(messages[0]?.data?.timestamp) :null } */}
          { messages[0] ? new Date(messages[0]?.data?.timestamp?.toDate()).toLocaleString() : null}
        </small>
      </div>
      
    </div>
  )
}

export default SideBarThreads
