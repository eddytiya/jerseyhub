import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Profile.css'
import {

    showSuccess,

    showError

} from '../utils/toastUtils'
const Profile = () => {

    const [profile, setProfile] = useState({
        uname: '',
        email: '',
        role: ''
    })

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {

        axios.get(
            'http://localhost:2987/profile',
            {
                withCredentials: true
            }
        )

        .then((resp) => {

            setProfile(resp.data)

        })

        .catch((err) => {

            console.log(err)

        })

    }, [])

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        })

    }

    const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.put(

            'http://localhost:2987/profile',

            {

                uname: profile.uname,

                email: profile.email

            },

            {

                withCredentials: true

            }

        )

        .then((resp) => {

            showSuccess(

                resp.data.message ||

                "Profile Updated Successfully"

            )

            localStorage.setItem(

                'user',

                profile.uname

            )

            setTimeout(() => {

                window.location.reload()

            }, 1000)

        })

        .catch((err) => {

            showError(

                err.response?.data?.message ||

                "Operation Failed"

            )

        })

    }

    const handlePasswordSubmit = (e) => {

        e.preventDefault()

        axios.put(

            'http://localhost:2987/profile/change-password',

            password,

            {

                withCredentials: true

            }

        )

        .then((resp) => {

            showSuccess(resp.data.message)

            setPassword({

                currentPassword: '',

                newPassword: '',

                confirmPassword: ''

            })

        })

        .catch((err) => {

          showError(

                err.response?.data?.message ||

                "Operation Failed"

            )

        })

    }

    return (

        <div className="container profile-page">

            <div className="row justify-content-center">

                <div className="profile-title">

                    <h1>Account Settings</h1>

                    <p>
                        Manage your profile information and security settings.
                    </p>

                </div>

                <div className="col-lg-6 mb-4">

                    {/* Profile Card */}

                    <div className="card shadow mb-4">

                        <div className="card-body">

    <div className="profile-header">

       <div className="profile-avatar profile-avatar-hover">

            {profile.uname?.charAt(0).toUpperCase()}

        </div>

        <div>

            <h2>

                {profile.uname}

            </h2>

            <p>

                Manage your personal information and account settings.

            </p>

        </div>

    </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        <i className="fa-solid fa-user me-2"></i>
                                        Username
                                    </label>

                                    <input

                                        type="text"

                                        name="uname"

                                        className="form-control"

                                        value={profile.uname}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
    <i className="fa-solid fa-envelope me-2"></i>
    Email
</label>

                                    <input

                                        type="email"

                                        name="email"

                                        className="form-control"

                                        value={profile.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
    <i className="fa-solid fa-shield-halved me-2"></i>
    Role
</label>

                                    <div className="role-badge">

                                        {profile.role.toUpperCase()}

                                    </div>

                                </div>

                                <button

                                    className="btn profile-save-btn w-100"

                                >

                                    Save Changes

                                </button>

                            </form>

                        </div>

                    </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                    {/* Change Password Card */}

                    <div className="card shadow">

                        <div className="card-body">

                            <div className="profile-section-title">

                                <i className="fa-solid fa-lock"></i>

                                <span>

                                    Change Password

                                </span>

                            </div>

                            <form onSubmit={handlePasswordSubmit}>

                                <div className="mb-3">

                                    <i className="fa-solid fa-lock me-2"></i>
Current Password

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="currentPassword"

                                        value={password.currentPassword}

                                        onChange={handlePasswordChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <i className="fa-solid fa-key me-2"></i>
New Password

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="newPassword"

                                        value={password.newPassword}

                                        onChange={handlePasswordChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <i className="fa-solid fa-circle-check me-2"></i>
Confirm Password

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="confirmPassword"

                                        value={password.confirmPassword}

                                        onChange={handlePasswordChange}

                                        required

                                    />

                                </div>

                                <button

                                    className="btn profile-password-btn w-100"

                                >

                                    Change Password

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Profile