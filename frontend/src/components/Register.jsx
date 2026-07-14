import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import {

    FaUser,

    FaEnvelope

} from "react-icons/fa";

import {

    showSuccess,

    showError

} from "../utils/toastUtils";

import AuthLayout from "./auth/AuthLayout";
import AuthInput from "./auth/AuthInput";
import PasswordInput from "./auth/PasswordInput";
import AuthButton from "./auth/AuthButton";

const Register = () => {

    const [user, setUser] = useState({

        uname: "",

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

        axios.post(

            "http://localhost:2987/user/register",

            user

        )

        .then(() => {

            showSuccess(

                "Registration Successful 🎉"

            );

            navigate("/login");

        })

        .catch((err) => {

            console.log(err);

            showError(

                err.response?.data?.message ||

                "Registration Failed"

            );

        })

        .finally(() => {

            setLoading(false);

        });

    };

    return (

        <AuthLayout

            title="Create Account"

            subtitle="Join JerseyHub and start shopping premium football jerseys."

        >

            <form onSubmit={handleSubmit}>

                <AuthInput

                    label="Username"

                    icon={<FaUser />}

                    value={user.uname}

                    placeholder="Enter username"

                    onChange={(e)=>

                        setUser({

                            ...user,

                            uname:e.target.value

                        })

                    }

                />

                <AuthInput

                    label="Email"

                    type="email"

                    icon={<FaEnvelope />}

                    value={user.email}

                    placeholder="Enter email"

                    onChange={(e)=>

                        setUser({

                            ...user,

                            email:e.target.value

                        })

                    }

                />

                <PasswordInput

                    value={user.password}

                    placeholder="Create password"

                    onChange={(e)=>

                        setUser({

                            ...user,

                            password:e.target.value

                        })

                    }

                />

                <div

                    style={{

                        marginTop:"28px"

                    }}

                >

                    <AuthButton

                        loading={loading}

                    >

                        Create Account

                    </AuthButton>

                </div>

            </form>

            <div

                className="admin-auth-footer"

            >

                Already have an account?

                <NavLink

                    to="/login"

                >

                    Login

                </NavLink>

            </div>

        </AuthLayout>

    );

};

export default Register;