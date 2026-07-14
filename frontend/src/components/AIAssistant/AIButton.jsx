import React from "react";

import "./AIButton.css";

const AIButton = ({ onClick }) => {

    return (

        <button

            className="ai-button"

            onClick={onClick}

            aria-label="Open JerseyHub AI"

        >

            <span className="ai-button-icon">

                🤖

            </span>

            <span className="ai-pulse"></span>

        </button>

    );

};

export default AIButton;