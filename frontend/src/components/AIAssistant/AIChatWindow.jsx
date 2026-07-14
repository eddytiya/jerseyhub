import React, {
    useState,
    useEffect,
    useRef
} from "react";

import "./AIChatWindow.css";

import { getAIMetadata } from "./apiService";

import { setMetadata } from "./engine/metadataStore";

import {
    FaPaperPlane
} from "../../utils/navbarIcons";


import AITyping from "./AITyping";
import { sendToAI } from "./chatService";
import WelcomeCard from "./WelcomeCard";
import AIMessage from "./AIMessage";
import AIHeader from "./AIHeader";
const AIChatWindow = ({ onClose }) => {

   const [message, setMessage] = useState("");

const [messages, setMessages] = useState([]);

const [typing, setTyping] = useState(false);
const hasMessages = messages.length > 0;


const bottomRef = useRef(null);

useEffect(() => {

    bottomRef.current?.scrollIntoView({

        behavior: "smooth"

    });

}, [messages, typing]);


useEffect(() => {

    const loadMetadata = async () => {

        try {

            const data = await getAIMetadata();

            console.log("🧠 AI Metadata", data);

            setMetadata(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    loadMetadata();

}, []);

const handleSendMessage = async (text) => {

    console.log("1️⃣ handleSendMessage called");

    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    const userMessage = {

        id: crypto.randomUUID(),

        sender: "user",

        messageType: "text",

        content: trimmedMessage,

        data: null,

        timestamp: new Date()

    };

    setMessages(prev => [

        ...prev,

        userMessage

    ]);

    setMessage("");

    setTyping(true);

    try {

        console.log("2️⃣ Creating fake reply");

        // Temporary test
        console.log("2️⃣ Calling sendToAI...");

            const reply = await sendToAI(trimmedMessage);

            console.log("3️⃣ Reply:", reply);

        console.log("3️⃣ Reply:", reply);

        setMessages(prev => [

    ...prev,

    {

        id: crypto.randomUUID(),

        sender: "assistant",

        messageType: reply.type,

        content: reply.content || "",

        data: reply.products || [],

        timestamp: new Date()

    }

]);

    }

    catch (err) {

        console.error(err);

    }

    finally {

        setTyping(false);

    }


};

return (

    <div className="ai-chat-window">

        {/* ================= HEADER ================= */}

        <AIHeader onClose={onClose} />

        {/* ================= BODY ================= */}

        <div className="ai-chat-body">

            {!hasMessages && (

                <WelcomeCard />

            )}

            {/* ================= QUICK ACTIONS ================= */}

            <div className="ai-section-title">

                Popular Questions

            </div>

            <div className="ai-quick-actions">

                <button
                    disabled={typing}
                    onClick={() =>
                        handleSendMessage("Show me Barcelona Jerseys")
                    }
                >
                    ⚽ Barcelona Jerseys
                </button>

                <button
                    disabled={typing}
                    onClick={() =>
                        handleSendMessage("Show me Best Sellers")
                    }
                >
                    🔥 Best Sellers
                </button>

                <button
                    disabled={typing}
                    onClick={() =>
                        handleSendMessage("Track My Order")
                    }
                >
                    📦 Track Order
                </button>

                <button
                    disabled={typing}
                    onClick={() =>
                        handleSendMessage("Recommend me a Jersey")
                    }
                >
                    👕 Recommend Me
                </button>

            </div>

            {/* ================= CHAT ================= */}

            {messages.map((msg) => (

                <AIMessage
                    key={msg.id}
                    message={msg}
                />

            ))}

            {typing && <AITyping />}

            <div ref={bottomRef}></div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="ai-chat-footer">

            <input

                type="text"

                placeholder="Ask JerseyHub AI..."

                value={message}

                disabled={typing}

                onChange={(e) =>

                    setMessage(e.target.value)

                }

                onKeyDown={(e) => {

                    if (

                        e.key === "Enter" &&

                        !typing

                    ) {

                        handleSendMessage(message);

                    }

                }}

            />

            <button

                disabled={typing}

                onClick={() =>

                    handleSendMessage(message)

                }

            >

                <FaPaperPlane />

            </button>

        </div>

    </div>

);
}
export default AIChatWindow;