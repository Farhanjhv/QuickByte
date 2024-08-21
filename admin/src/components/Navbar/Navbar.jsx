import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <div className='navbar'>
            <a className='logo'>Quick<span>Byte</span></a>
            <img src={assets.profile_image} className='profile' alt="" />
        </div>
    )
}

export default Navbar
