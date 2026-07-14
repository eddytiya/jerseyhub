import React from 'react'
import { NavLink } from 'react-router-dom'

import {

    FaClipboardList,

    FaUserCircle

} from '../../utils/navbarIcons'
const GuestNavbar = () => {

    return (

    <div className="nav-links">

        <NavLink

            className="nav-item-custom"

            to="/register"

        >

            <FaClipboardList />

            Register

        </NavLink>

        <NavLink

            className="nav-item-custom"

            to="/login"

        >

            <FaUserCircle />

            Login

        </NavLink>

    </div>

)

}

export default GuestNavbar