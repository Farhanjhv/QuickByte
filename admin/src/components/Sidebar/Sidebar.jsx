import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>add items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img className='licon' src={assets.list_icon} alt="" />
          <p>list items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
