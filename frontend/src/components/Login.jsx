import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../utils/api";
import { FaUser } from "react-icons/fa";
import GoogleLoginButton from "./auth/GoogleLoginButton";
import {

    showSuccess,

    showError

} from "../utils/toastUtils";

import AuthLayout from "./auth/AuthLayout";
import AuthInput from "./auth/AuthInput";
import PasswordInput from "./auth/PasswordInput";
import AuthButton from "./auth/AuthButton";

const Login = () => {

    const [user, setUser] = useState({

    loginId: "",

    password: ""

});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

        axios.post(

             `${API_URL}/user/login`,

            user,

            {

                withCredentials:true

            }

        )

        .then((resp)=>{

            localStorage.setItem(

                "user",

                resp.data.user

            );

            localStorage.setItem(

                "role",

                resp.data.role

            );

            localStorage.setItem(

                "userId",

                resp.data.userId

            );

            showSuccess(

                "Login Successful 🎉"

            );

            if(

                resp.data.role==="admin"

            ){

               navigate("/admin");

            }

            else{

               navigate("/");

            }

        })

        .catch((err)=>{

            console.log(err);

            showError(

                err.response?.data?.message ||

                "Login Failed"

            );

        })

        .finally(()=>{

            setLoading(false);

        });

    };

    return (

    <AuthLayout

        title="Welcome Back"

        subtitle="Login to continue shopping your favourite football jerseys."

    >

        <form onSubmit={handleSubmit}>

            <AuthInput

    label="Username or Email"

    icon={<FaUser />}

    value={user.loginId}

    placeholder="Enter username or email"

    onChange={(e)=>

        setUser({

            ...user,

            loginId:e.target.value

        })

    }

/>

            <PasswordInput

                value={user.password}

                placeholder="Enter password"

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

                    Login

                </AuthButton>

            </div>

            <div className="admin-auth-divider">

                <span>

                    OR

                </span>

            </div>

            <GoogleLoginButton />

        </form>

        <div className="admin-auth-footer">

            Don't have an account?{" "}

            <NavLink to="/register">

                Register

            </NavLink>

        </div>

    </AuthLayout>

);

};

export default Login;