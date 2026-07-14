import React from "react";

import "./AuthInput.css";

const AuthInput = ({

    label,

    type = "text",

    value,

    onChange,

    icon,

    name,

    placeholder = ""

}) => {

    return (

        <div className="admin-auth-input-group">

            <label>

                {label}

            </label>

            <div className="admin-auth-input-wrapper">

                <span className="admin-auth-input-icon">

                    {icon}

                </span>

                <input

                    type={type}

                    name={name}

                    value={value}

                    placeholder={placeholder}

                    onChange={onChange}

                    required

                />

            </div>

        </div>

    );

};

export default AuthInput;