import React from "react";

import "./AIMessage.css";

import ProductMessage from "./ProductMessage";

const AIMessage = ({ message }) => {

    const {

        sender,

        messageType,

        content,

        data

    } = message;

    return (

        <div className={`ai-message ${sender}`}>

            {

                messageType === "text" && (

                    <div className="ai-bubble">

                        {content}

                    </div>

                )

            }

            {

                messageType === "products" && (

                    <ProductMessage

                        products={data}

                    />

                )

            }

        </div>

    );

};

export default AIMessage;