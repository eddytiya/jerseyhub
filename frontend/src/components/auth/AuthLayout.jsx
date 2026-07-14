import React from "react";
import { motion } from "framer-motion";

import "./AuthLayout.css";

const AuthLayout = ({

    title,

    subtitle,

    children

}) => {

    return (

        <section className="admin-auth-page">

            {/* Background Glow */}

            <div className="admin-auth-circle admin-auth-circle-one"></div>

            <div className="admin-auth-circle admin-auth-circle-two"></div>

            <div className="admin-auth-circle admin-auth-circle-three"></div>

            <motion.div

                className="admin-auth-card"

                initial={{

                    opacity:0,

                    y:40,

                    scale:.96

                }}

                animate={{

                    opacity:1,

                    y:0,

                    scale:1

                }}

                transition={{

                    duration:.6,

                    type:"spring",

                    stiffness:110

                }}

            >

                <div className="admin-auth-header">

                    <span className="admin-auth-badge">

                        ⚽ JERSEYHUB

                    </span>

                    <h1>

                        {title}

                    </h1>

                    <p>

                        {subtitle}

                    </p>

                </div>

                {children}

            </motion.div>

        </section>

    );

};

export default AuthLayout;