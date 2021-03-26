import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import {useSelector} from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import './Message.css'


const Message = forwardRef(({
    id, data: {
            timestamp,
            displayName,
            email,
            message,
            photoURL,
            uid
    }
}, ref) => {
  const user = useSelector(selectUser)
  
  
  return (
    <div ref={ref} className={`message ${user.email === email && `message_sender`}`}>
      <div className="photo-container">
        <Avatar src={photoURL} className="message_photo" />
      </div>
      <div  className="content_container">
        <div className="content_user">{displayName}</div>
        <div className="message_content">{message}</div>
      </div>
      <div className="time-container">
        <small className = "message_timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    </div>
  )
})

export default Message
