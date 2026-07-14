import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './NotificationBell.css'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {

    FaBell,

    FaTrash

} from '../../utils/navbarIcons'

dayjs.extend(relativeTime)

const NotificationBell = () => {

    const [open, setOpen] = useState(false)

    const [notifications, setNotifications] = useState([])

    const [unreadCount, setUnreadCount] = useState(0)

    const bellRef = useRef(null)

    // ==========================================
    // Fetch Notifications
    // ==========================================

    const fetchNotifications = () => {

        axios.get(

            'http://localhost:2987/notification'

        )

        .then((resp) => {

            setNotifications(resp.data)

        })

        .catch((err) => {

            console.log(err)

        })

    }

    // ==========================================
    // Fetch Unread Count
    // ==========================================

    const fetchUnreadCount = () => {

        axios.get(

            'http://localhost:2987/notification/count'

        )

        .then((resp) => {

            setUnreadCount(

                resp.data.count

            )

        })

        .catch((err) => {

            console.log(err)

        })

    }

    // ==========================================
    // Mark Notification Read
    // ==========================================

    const markNotificationRead = (id) => {

        axios.put(

            `http://localhost:2987/notification/read/${id}`

        )

        .then(() => {

            fetchNotifications()

            fetchUnreadCount()

        })

        .catch((err) => {

            console.log(err)

        })

    }

    // ==========================================
    // Mark All Notifications Read
    // ==========================================

    const markAllNotificationsRead = () => {

        axios.put(

            'http://localhost:2987/notification/read-all'

        )

        .then(() => {

            fetchNotifications()

            fetchUnreadCount()

        })

        .catch((err) => {

            console.log(err)

        })

    }

    const getRelativeTime = (date) => {

    if (!date) {

        return ''

    }

    const seconds = dayjs().diff(

        dayjs(date),

        'second'

    )

    if (seconds < 60) {

        return 'Just now'

    }

    return dayjs(date).fromNow()

}

// ==========================================
// Delete Notification
// ==========================================

const deleteNotification = (id) => {

    axios.delete(

        `http://localhost:2987/notification/${id}`

    )

    .then(() => {

        fetchNotifications()

        fetchUnreadCount()

    })

    .catch((err) => {

        console.log(err)

    })

}

    // ==========================================
    // useEffect
    // ==========================================

    
useEffect(() => {

    fetchNotifications()

    fetchUnreadCount()

    // Auto Refresh Every 5 Seconds

    const interval = setInterval(() => {

        fetchNotifications()

        fetchUnreadCount()

    }, 5000)

    const handleClick = (e) => {

        if (

            bellRef.current &&

            !bellRef.current.contains(e.target)

        ) {

            setOpen(false)

        }

    }

    document.addEventListener(

        'mousedown',

        handleClick

    )

    return () => {

        clearInterval(interval)

        document.removeEventListener(

            'mousedown',

            handleClick

        )

    }

}, [])

   return (

    <div

        className="notification-wrapper"

        ref={bellRef}

    >

        <button

            className="notification-btn"

            onClick={() => setOpen(!open)}

        >

            <FaBell />

            {

                unreadCount > 0 &&

                <span className="notification-count">

                    {unreadCount}

                </span>

            }

        </button>

        {

            open &&

            <div className="notification-dropdown">

                <h5>

                    Notifications

                </h5>

                {

                    notifications.length === 0 ?

                    (

                        <p

                            style={{

                                textAlign: "center",

                                padding: "30px",

                                color: "#777"

                            }}

                        >

                            No Notifications

                        </p>

                    )

                    :

                    (

                        notifications.map((item) => (

                            <div

                                className="notification-item"

                                key={item._id}

                                onClick={() =>

                                    markNotificationRead(

                                        item._id

                                    )

                                }

                            >

                                <div

                                    className="notification-dot"

                                    style={{

                                        opacity:

                                            item.isRead

                                                ? 0.25

                                                : 1

                                    }}

                                ></div>

                                <div

                                    style={{

                                        flex: 1,

                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "flex-start",

                                        gap: "15px"

                                    }}

                                >

                                    <div style={{ flex: 1 }}>

                                        <strong

                                            style={{

                                                display: "block",

                                                marginBottom: "6px",

                                                fontSize: "16px",

                                                fontWeight: "600",

                                                color:

                                                    item.isRead

                                                        ? "#888"

                                                        : "#222"

                                            }}

                                        >

                                            {item.title}

                                        </strong>

                                        <small

                                            style={{

                                                display: "block",

                                                lineHeight: "1.5",

                                                color:

                                                    item.isRead

                                                        ? "#999"

                                                        : "#666"

                                            }}

                                        >

                                            {item.message}

                                        </small>

                                        <small

                                            style={{

                                                display: "block",

                                                marginTop: "8px",

                                                color: "#999",

                                                fontSize: "13px"

                                            }}

                                        >

                                            {

                                                getRelativeTime(

                                                    item.createdAt

                                                )

                                            }

                                        </small>

                                    </div>

                                    <button

                                        className="delete-notification-btn"

                                        onClick={(e) => {

                                            e.stopPropagation()

                                            deleteNotification(

                                                item._id

                                            )

                                        }}

                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                            </div>

                        ))

                    )

                }

                <button

                    className="view-all-btn"

                    onClick={markAllNotificationsRead}

                >

                    ✔ Mark All Read

                </button>

            </div>

        }

    </div>

)

}

export default NotificationBell