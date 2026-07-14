const getMockReply = (message) => {

    const msg = message.toLowerCase();

    // ===============================
    // Barcelona
    // ===============================

    if (msg.includes("barcelona")) {

        return {
            type: "text",
            content:
                "⚽ I found Barcelona jerseys.\n\nHome Kit\nAway Kit\nThird Kit\n\nSoon I'll display real product cards."
        };

    }

    // ===============================
    // Best Sellers
    // ===============================

    if (
        msg.includes("best") ||
        msg.includes("seller") ||
        msg.includes("popular")
    ) {

        return {
            type: "text",
            content:
                "🔥 These are currently our best selling jerseys.\n\n• Real Madrid Home\n• Barcelona Home\n• Manchester United Home"
        };

    }

    // ===============================
    // Order
    // ===============================

    if (
        msg.includes("track") ||
        msg.includes("order")
    ) {

        return {
            type: "text",
            content:
                "📦 Sure!\n\nPlease enter your Order ID.\n\nExample:\nJH10254"
        };

    }

    // ===============================
    // Recommendation
    // ===============================

    if (
        msg.includes("recommend") ||
        msg.includes("size")
    ) {

        return {
            type: "text",
            content:
                "👕 I'd love to help.\n\nTell me your height and weight so I can recommend the perfect jersey size."
        };

    }

    // ===============================
    // Real Madrid
    // ===============================

    if (
        msg.includes("madrid")
    ) {

        return {
            type: "text",
            content:
                "🤍 Here are some Real Madrid jerseys.\n\nHome\nAway\nThird Kit"
        };

    }

    // ===============================
    // Default
    // ===============================

    return {

        type: "text",

        content:
            "🤖 I'm still learning.\n\nSoon I'll search the JerseyHub database and answer using real AI."

    };

};

export default getMockReply;