import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import {

    FaUserCircle,

    FaChevronDown,

    FaShoppingCart,

    FaClipboardList,

    FaCog,

    FiLogOut

} from "../../utils/navbarIcons";

import { FaEnvelope } from "react-icons/fa";

const UserMenu = ({

    username,

    role,

    handleLogout,

    userMenuOpen,

    setUserMenuOpen

}) => {
const menuRef = useRef(null);

useEffect(() => {

    const handleClickOutside = (event) => {

        if (

            menuRef.current &&

            !menuRef.current.contains(event.target)

        ) {

            setUserMenuOpen(false);

        }

    };

    document.addEventListener(

        "mousedown",

        handleClickOutside

    );

    return () => {

        document.removeEventListener(

            "mousedown",

            handleClickOutside

        );

    };

}, [setUserMenuOpen]);


    return (

        <div

            className="premium-user-menu"

            ref={menuRef}

        >

            <button

                className="user-dropdown-btn"

                onClick={() =>

                    setUserMenuOpen(

                        !userMenuOpen

                    )

                }

            >

                <div className="user-card">

                    <div className="avatar">

                        <FaUserCircle/>

                        <span className="online-dot"/>

                    </div>

                    <div>

                        <div className="username">

                            {username}

                        </div>

                        <div className="user-role">

                            {

                                role==="admin"

                                ?

                                "Administrator"

                                :

                                "Customer"

                            }

                        </div>

                    </div>

                </div>

                <FaChevronDown

                    className={

                        userMenuOpen

                        ?

                        "dropdown-arrow rotate"

                        :

                        "dropdown-arrow"

                    }

                />

            </button>

            {

                

                    userMenuOpen && (

    <div className="premium-dropdown">

        {/* ===========================
                HEADER
        ============================ */}

        <div className="dropdown-user">

            <FaUserCircle className="dropdown-avatar" />

            <h5>

                {username}

            </h5>

            <p>

                {

                    role === "admin"

                        ? "Administrator"

                        : "Customer"

                }

            </p>

        </div>

        {/* ===========================
                PROFILE
        ============================ */}

        <NavLink

            to="/profile"

            className="dropdown-link"

            onClick={() => setUserMenuOpen(false)}

        >

            <FaUserCircle />

            <span>

                My Profile

            </span>

        </NavLink>

        <NavLink

            to="/profile"

            className="dropdown-link"

            onClick={() => setUserMenuOpen(false)}

        >

            <FaCog />

            <span>

                Settings

            </span>

        </NavLink>

        {

    role === "admin"

    &&

    <>

        <NavLink

            to="/manage-subscribers"

            className="dropdown-link"

            onClick={() =>

                setUserMenuOpen(false)

            }

        >

            <FaEnvelope />

            <span>

                Newsletter Subscribers

            </span>

        </NavLink>

        <NavLink

            to="/email-campaigns"

            className="dropdown-link"

            onClick={() =>

                setUserMenuOpen(false)

            }

        >

            <FaEnvelope />

            <span>

                Email Campaigns

            </span>

        </NavLink>

    </>

}

        {

            role === "customer"

            &&

            <>

                <NavLink

                    to="/cart"

                    className="dropdown-link"

                    onClick={() => setUserMenuOpen(false)}

                >

                    <FaShoppingCart />

                    <span>

                        Cart

                    </span>

                </NavLink>

                <NavLink

                    to="/orders"

                    className="dropdown-link"

                    onClick={() => setUserMenuOpen(false)}

                >

                    <FaClipboardList />

                    <span>

                        Orders

                    </span>

                </NavLink>

            </>

        }

        <div className="dropdown-divider"></div>

        <button

            className="logout-item"

            onClick={() => {

                setUserMenuOpen(false);

                handleLogout();

            }}

        >

            <FiLogOut />

            <span>

                Logout

            </span>

        </button>

    </div>

)

                

            }

        </div>

        )

}

export default UserMenu;