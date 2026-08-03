import React from "react";
import { FaWhatsapp, FaFacebook, FaXTwitter, FaLink } from "react-icons/fa6";
import { showSuccess } from "../../utils/toastUtils";
import "./ShareButtons.css";

const ShareButtons = ({ title }) => {

    const url = window.location.href;

    const text = encodeURIComponent(`Check out ${title} on JerseyHub`);

    const encodedUrl = encodeURIComponent(url);

    const handleCopy = () => {

        navigator.clipboard.writeText(url);

        showSuccess("Link Copied To Clipboard");

    };

    return (

        <div className="share-buttons">

            <span className="share-label">Share :</span>

            <a
                href={`https://wa.me/?text=${text}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn whatsapp"
            >
                <FaWhatsapp />
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn facebook"
            >
                <FaFacebook />
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn twitter"
            >
                <FaXTwitter />
            </a>

            <button
                type="button"
                className="share-btn copy"
                onClick={handleCopy}
            >
                <FaLink />
            </button>

        </div>

    );

};

export default ShareButtons;
