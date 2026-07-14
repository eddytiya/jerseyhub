import React from "react";
import "./AIHeader.css";
import {
    FaFutbol,
    FaTimes,
    FaCircle
} from "../../utils/navbarIcons";

const AIHeader = ({ onClose }) => {

    return (

        <div className="ai-header">

            <div className="ai-header-left">

                <div className="ai-header-logo">

                    <FaFutbol />

                </div>

                <div className="ai-header-content">

                    <div className="ai-header-title-row">

                        <h3>JerseyHub AI</h3>

                        <span className="ai-online">

                            <FaCircle />

                            Online

                        </span>

                    </div>

                    <p>

                        Your Football Shopping Assistant

                    </p>

                </div>

            </div>

            <button
                className="ai-header-close"
                onClick={onClose}
            >

                <FaTimes />

            </button>

        </div>

    );

};

export default AIHeader;