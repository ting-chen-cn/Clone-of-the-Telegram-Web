import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import db from '../firebase'
import {setThread} from '../features/threadSlice'
import './SideBarThreads.css'


const SideBarThreads = ({ id, threadName }) => {
  const dispatch = useDispatch()
  const [threadInfo, setThreadInfo] = useState([])
  useEffect(() => {
    db.collection('threads').doc(id).collection('messages').orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setThreadInfo(snapshot.docs.map((doc) => 
          doc.data(),
      )))
  }, [id])
  return (
    <div
      onClick={()=>dispatch(setThread({threadId:id,threadName:threadName}))}
      className="sideBarThreads">
      <Avatar src={ threadInfo[0]?.photo}/>
      <div className="sideBarThread_details">
        <h3> {threadName}</h3>
        <p>{threadInfo[0]?.message}</p>
        <small className="sideBarThread_timestamp">
          {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
      
    </div>
  )
}

export default SideBarThreads
