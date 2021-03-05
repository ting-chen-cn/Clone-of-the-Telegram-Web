import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import './Thread.css'
const Thread = () => {
const [input,setInput]=useState('')
  const sendMessage = (event) => {
    event.preventDefault();
    setInput('')
}
  return (
    <div className="thread" >
      <div className="thread_header" >
        <div className="thread_header_content" >
          <Avatar />
          <div className="thread_header_content_info" >
            <h4>ThreadName</h4>
            <h5>Last seen</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread_header_detail"/>
        </IconButton>
      </div>
      <div className="thread_message">
        message
      </div>
      <div className="thread_input">
        <input
          placeholder="write your message here"
          type="test"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        >
          
          </input>
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}

export default Thread
