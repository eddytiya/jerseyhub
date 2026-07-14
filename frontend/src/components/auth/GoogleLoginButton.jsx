import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";
import {
    showSuccess,
    showError
} from "../../utils/toastUtils";

import "./GoogleLoginButton.css";

const GoogleLoginButton = () => {

    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {

        try {

            const resp = await axios.post(

                `${API_URL}/user/google-login`,

                {

                    credential:

                        credentialResponse.credential

                },

                {

                    withCredentials: true

                }

            );

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

                "Google Login Successful 🎉"

            );

            if (

                resp.data.role === "admin"

            ) {

                navigate("/");

            }

            else {

              navigate("/");

            }

        }

        catch (err) {

            console.log(err);

            showError(

                err.response?.data?.message ||

                "Google Login Failed"

            );

        }

    };

    return (

        <div className="admin-google-wrapper">

            <GoogleLogin

                theme="outline"

                size="large"

                shape="pill"

                width={360}

                text="continue_with"

                onSuccess={handleGoogleSuccess}

                onError={() => {

                    showError(

                        "Google Login Failed"

                    );

                }}

            />

        </div>

    );

};

export default GoogleLoginButton;