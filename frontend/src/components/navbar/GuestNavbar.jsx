import React, { useId } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import {

    FaClipboardList,

    FaUserCircle

} from '../../utils/navbarIcons'
const GuestNavbar = () => {

    const pillId = `nav-pill-${useId()}`;

    return (

    <div className="nav-links">

        <NavLink

            className="nav-item-custom"

            to="/register"

        >

            {({ isActive }) => (
                <>
                    {isActive && (
                        <motion.span
                            layoutId={pillId}
                            className="nav-active-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                    )}
                    <FaClipboardList />
                    Register
                </>
            )}

        </NavLink>

        <NavLink

            className="nav-item-custom"

            to="/login"

        >

            {({ isActive }) => (
                <>
                    {isActive && (
                        <motion.span
                            layoutId={pillId}
                            className="nav-active-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                    )}
                    <FaUserCircle />
                    Login
                </>
            )}

        </NavLink>

    </div>

)

}

export default GuestNavbar
