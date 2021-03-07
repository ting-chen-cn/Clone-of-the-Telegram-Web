import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import {useSelector} from 'react-redux'
import { selectUser } from '../features/userSlice'
import './Message.css'


const Message = forwardRef(({
    id, data: {
            timestamp,
            displayName,
            email,
            message,
            photo,
            uid
    }
}, ref) => {
  const user = useSelector(selectUser)
  return (
    <div ref = {ref} className={`message ${user.email === email && `message_sender`}`}>
      <Avatar src={photo} className="message_photo" />
      <div className="message_content">
        <p className="message_content">{message}</p>
        <small className = "message_timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</small>
        {/* <small>{timestamp.format(new Date(timestamp?.toDate()))}</small> */}
      </div>
    </div>
  )
})

export default Message
