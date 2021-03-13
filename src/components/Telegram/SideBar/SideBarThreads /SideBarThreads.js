import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
// import db from '../../../../firebase'
import {setThread} from '../../../../features/threadSlice'
import './SideBarThreads.css'


const SideBarThreads = ({ id, data }) => {
  const dispatch = useDispatch()
  // const [threadInfo, setThreadInfo] = useState([])
  // useEffect(() => {
  //   db.collection('users').doc(id).collection('messages').orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) => setThreadInfo(snapshot.docs.map((doc) => 
  //         doc.data(),
  //     )))
  // }, [id])
  // console.log(data)
  return (
    <div
      onClick={()=>dispatch(setThread({data}))}
      className="sideBarThreads">
      <Avatar src={ data?.photoURL}/>
      <div className="sideBarThread_details">
        <h3> {data.displayName}</h3>
        {/* <div>sidebar </div> */}
        {/* <div>{threadInfo[0]?.message}</div> */}
        {/* <small className="sideBarThread_timestamp">
          {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small> */}
      </div>
      
    </div>
  )
}

export default SideBarThreads
