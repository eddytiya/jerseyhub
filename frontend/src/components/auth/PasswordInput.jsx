import React, { useState } from "react";

import {

    FaLock,

    FaEye,

    FaEyeSlash

} from "react-icons/fa";

import "./PasswordInput.css";

const PasswordInput = ({

    value,

    onChange,

    name = "password",

    label = "Password",

    placeholder = "Enter your password"

}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="admin-auth-input-group">

            <label>

                {label}

            </label>

            <div className="admin-auth-password-wrapper">

                <span className="admin-auth-input-icon">

                    <FaLock />

                </span>

                <input

                    type={

                        showPassword

                        ?

                        "text"

                        :

                        "password"

                    }

                    name={name}

                    value={value}

                    onChange={onChange}

                    placeholder={placeholder}

                    required

                />

                <button

                    type="button"

                    className="admin-auth-eye-btn"

                    onClick={()=>

                        setShowPassword(

                            !showPassword

                        )

                    }

                >

                    {

                        showPassword

                        ?

                        <FaEyeSlash />

                        :

                        <FaEye />

                    }

                </button>

            </div>

        </div>

    );

};

export default PasswordInput;