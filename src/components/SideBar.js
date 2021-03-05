import React from 'react'
import './SideBar.css'
import SideBarThreads from './SideBarThreads'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import  BorderColorOutlinedIcon  from '@material-ui/icons/BorderColorOutlined'
import {
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings
} from '@material-ui/icons'


function SideBar() {
  return (
    <div className="sideBar">
      <div className="sideBar_header">
        <div className="sideBar_search">
          <SearchIcon className="searchIcon"/>
          <input placeholder="Search" className="search_input"></input>
        </div>
        <IconButton variant="outlined" id="sideBar_button">
          <BorderColorOutlinedIcon />
        </IconButton>
      </div>
      <div className="sideBar_threads">
        <SideBarThreads />
      </div>
      <div className="sideBar_bottom">
        <Avatar className="sideBar_bottom_avatar"/>
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
