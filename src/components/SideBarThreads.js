import React from 'react'
import './SideBarThreads.css'
import Avatar from '@material-ui/core/Avatar'

const SideBarThreads = () => {
  return (
    <div className="sideBarThreads">
      <Avatar />
      <div className="sideBarThread_details">
        <h3> Thread Name</h3>
        <p>Info</p>
        <small className="sideBarThread_timestamp">timeStamp</small>
      </div>
      
    </div>
  )
}

export default SideBarThreads
