import React from "react";

const WhyCard = ({ icon, title, text }) => {

    return (

        <div className="why-card">

            <div className="why-icon">

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {text}

            </p>

        </div>

    );

};

export default WhyCard;