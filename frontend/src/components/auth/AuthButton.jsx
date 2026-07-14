import React from "react";

import "./AuthButton.css";

const AuthButton = ({

    children,

    type = "submit",

    loading = false,

    onClick

}) => {

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={loading}

            className="admin-auth-btn"

        >

            {

                loading

                ?

                <span className="admin-auth-spinner"></span>

                :

                children

            }

        </button>

    );

};

export default AuthButton;