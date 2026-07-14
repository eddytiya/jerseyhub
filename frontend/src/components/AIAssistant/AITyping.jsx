import React from "react";

import "./AITyping.css";

import {

    FaRobot

} from "../../utils/navbarIcons";

const AITyping = () => {

    return (

        <div className="ai-typing">

            <div className="ai-typing-avatar">

                <FaRobot />

            </div>

            <div className="ai-typing-bubble">

                <span></span>

                <span></span>

                <span></span>

            </div>

        </div>

    );

};

export default AITyping;