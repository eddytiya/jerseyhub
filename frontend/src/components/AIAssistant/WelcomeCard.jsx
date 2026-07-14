import React from "react";
import "./WelcomeCard.css";

const WelcomeCard = () => {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    return (

        <div className="ai-welcome-card">

            <div className="ai-welcome-badge">

                👋 {greeting}, Aditya

            </div>

            <h2>

                I'm JerseyHub AI

            </h2>

            <p>

                Your smart football shopping assistant.

            </p>

            <div className="ai-welcome-divider"></div>

            <div className="ai-feature-list">

                <div className="ai-feature">

                    <span>✓</span>

                    <p>Find Jerseys</p>

                </div>

                <div className="ai-feature">

                    <span>✓</span>

                    <p>Track Orders</p>

                </div>

                <div className="ai-feature">

                    <span>✓</span>

                    <p>Size Guide</p>

                </div>

                <div className="ai-feature">

                    <span>✓</span>

                    <p>Compare Products</p>

                </div>

            </div>

        </div>

    );

};

export default WelcomeCard;