import React, {

    useState

} from "react";

import AIButton from "./AIButton";

import AIChatWindow from "./AIChatWindow";

import "./AIAssistant.css";

const AIAssistant = () => {

    const [

        isOpen,

        setIsOpen

    ] = useState(false);

    const toggleChat = () => {

        setIsOpen(

            prev => !prev

        );

    };

    return (

        <>

            <AIButton

                onClick={toggleChat}

            />

            {

                isOpen && (

                    <AIChatWindow

                        onClose={()=>

                            setIsOpen(false)

                        }

                    />

                )

            }

        </>

    );

};

export default AIAssistant;