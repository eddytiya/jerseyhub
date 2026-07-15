import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import './navbar/Navbar.css'

import { showSuccess } from '../utils/toastUtils'

import AdminNavbar from './navbar/AdminNavbar'
import CustomerNavbar from './navbar/CustomerNavbar'
import GuestNavbar from './navbar/GuestNavbar'
import SearchBar from './navbar/SearchBar'
import UserMenu from './navbar/UserMenu'
import NotificationBell from './navbar/NotificationBell'
import ThemeToggle from './navbar/ThemeToggle'
import WishlistButton from './navbar/WishlistButton';
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar/AdminNavbar.css";

const Navbar = () => {

    const [search, setSearch] = useState('')
    const [userMenuOpen, setUserMenuOpen] = useState(false)
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const role = localStorage.getItem('role')

    const username = localStorage.getItem('user')

    const handleSearch = (e) => {

        e.preventDefault()

        if (search.trim()) {

            navigate(`/search?name=${search}`)

        }

        else {

            navigate('/jerseys')

        }

    }

    const handleLogout = () => {

        localStorage.clear()

        showSuccess('Logout Successful 👋')

        setTimeout(() => {

            navigate('/login')

        }, 800)

    }

    return (

        <header className="custom-navbar">

            {/* LEFT */}

            <div className="navbar-left">

                <NavLink

                    className="logo"

                    to={
    role === "admin"
        ? "/admin"
        : "/"
}

                >

                    <div className="logo-circle">

                        ⚽

                    </div>

                    <div>

                        <h3>

                            JERSEYHUB

                        </h3>

                        <p>

                            Official Football Store

                        </p>

                    </div>

                </NavLink>

            </div>

            {/* CENTER */}

            <div className="navbar-center">

                {

                    role === 'admin'

                    &&

                    <AdminNavbar />

                }

                {

                    role === 'customer'

                    &&

                    <CustomerNavbar />

                }

                {

                    !role

                    &&

                    <GuestNavbar />

                }

            </div>
                {/* MOBILE MENU BUTTON */}

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >

                    {
                        mobileMenuOpen
                            ? <FaTimes />
                            : <FaBars />
                    }

                </button>
            {/* RIGHT */}

            <div className="navbar-right">

                {

                    role === 'admin'

                    &&

                    <NotificationBell />

                }

                {

                    role === 'customer'

                    &&

                    <SearchBar

                        search={search}

                        setSearch={setSearch}

                        handleSearch={handleSearch}

                    />

                }

                {/* Wishlist */}

                {

                    role === 'customer'

                    &&

                    <WishlistButton />

                }

                <ThemeToggle />

                {

                    role

                    &&

                    <UserMenu

                        username={username}

                        role={role}

                        handleLogout={handleLogout}

                        userMenuOpen={userMenuOpen}

                        setUserMenuOpen={setUserMenuOpen}

                    />

                }

            </div>

        </header>

    )

}

export default Navbar