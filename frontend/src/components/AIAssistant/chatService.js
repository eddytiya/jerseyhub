import buildRequest from "./engine";


import {

    aiSearchProducts,

    searchProducts,

    getFeaturedProducts,

    trackOrder

} from "./apiService";

import getMockReply from "./mockAI";

const ORDER_ID_REGEX = /\b[a-f0-9]{24}\b/i;

const STATUS_EMOJI = {

    Pending: "⏳",
    Processing: "🛠️",
    Shipped: "🚚",
    Delivered: "✅",
    Cancelled: "❌"

};

const formatOrderStatus = (order) => {

    const items = order.items

        .map(item => `• ${item.teamName} ${item.jerseyName} × ${item.quantity}`)

        .join("\n");

    const lines = [

        `${STATUS_EMOJI[order.status] || "📦"} Order ${order.orderId} is currently **${order.status}**.`,

        "",

        items,

        "",

        `Total: ₹${order.totalAmount}`,

        `Placed on: ${new Date(order.orderDate).toLocaleDateString()}`

    ];

    if (order.trackingNumber) {

        lines.push(`Tracking Number: ${order.trackingNumber}`);

    }

    if (order.status === "Shipped" && order.estimatedDelivery) {

        lines.push(`Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`);

    }

    if (order.status === "Delivered" && order.deliveredAt) {

        lines.push(`Delivered on: ${new Date(order.deliveredAt).toLocaleDateString()}`);

    }

    if (order.returnStatus && order.returnStatus !== "None") {

        lines.push(`Return Status: ${order.returnStatus}`);

    }

    return lines.filter(line => line !== undefined).join("\n");

};

const handleTrackOrder = async (rawText) => {

    const match = rawText.match(ORDER_ID_REGEX);

    if (!match) {

        return {

            type: "text",

            content:
                "That doesn't look like a valid Order ID. It's a 24-character code from your order confirmation email or the My Orders page — could you paste it again?",

            awaitingOrderId: true

        };

    }

    try {

        const order = await trackOrder(match[0]);

        return {

            type: "text",

            content: formatOrderStatus(order)

        };

    }

    catch (err) {

        if (err.response?.status === 404) {

            return {
                type: "text",
                content: "I couldn't find an order with that ID. Please double-check it and try again."
            };

        }

        if (err.response?.status === 403) {

            return {
                type: "text",
                content: "That order isn't linked to this account. Please log in with the account you used to place it, then try again."
            };

        }

        return {
            type: "text",
            content: "⚠ Something went wrong while tracking your order. Please try again in a moment."
        };

    }

};

const hasRecommendationHints = (entities) =>

    Boolean(

        entities.team ||
        entities.category ||
        entities.jerseyType ||
        entities.competition ||
        entities.maxPrice ||
        entities.minPrice ||
        entities.size

    );

const handleRecommend = async (query, entities) => {

    if (!hasRecommendationHints(entities)) {

        return {

            type: "text",

            content:
                "👕 I'd love to help! Tell me a team, competition, jersey type (home/away/third), or your budget — e.g. \"Recommend a Barcelona home jersey under ₹2000\"."

        };

    }

    const products = await aiSearchProducts(query, entities);

    if (!products || products.length === 0) {

        const fallback = await getFeaturedProducts();

        return {

            type: "products",

            content: "I couldn't find an exact match, but here are some popular picks:",

            products: fallback

        };

    }

    return {

        type: "products",

        products

    };

};

const SIZE_GUIDE_TEXT =
    "📏 JerseyHub Size Guide (chest width / length):\n\n" +
    "• S — 46 cm / 68 cm\n" +
    "• M — 49 cm / 70 cm\n" +
    "• L — 52 cm / 72 cm\n" +
    "• XL — 55 cm / 74 cm\n" +
    "• XXL — 58 cm / 76 cm\n\n" +
    "Tip: our jerseys run true to size — if you're between sizes, size up for a relaxed fit. You can also open the full Size Guide on any product page.";

export const sendToAI = async (message, state = {}) => {

    console.log("🚀 sendToAI() started");
    console.log("📩 Message:", message);

    try {

        if (state.awaitingOrderId) {

            return await handleTrackOrder(message);

        }

      const request = buildRequest(message);

        console.log("🧠 Routed Request:", request);

        switch (request.action) {

            /* =====================================
                    SEARCH PRODUCTS
            ===================================== */

            case "SEARCH_PRODUCTS": {

                console.log("🔍 SEARCH_PRODUCTS");

const products = await aiSearchProducts(

    request.query,

    request.entities

);
                console.log("✅ Products Received:", products);

                return {

                    type: "products",

                    products

                };

            }

            /* =====================================
                    FEATURED
            ===================================== */

            case "SHOW_FEATURED": {

                console.log("⭐ SHOW_FEATURED");

                const products = await getFeaturedProducts();

                console.log("✅ Featured Products:", products);

                return {

                    type: "products",

                    products

                };

            }

            /* =====================================
                    ORDER
            ===================================== */

            case "TRACK_ORDER": {

                console.log("📦 TRACK_ORDER");

                if (request.entities.orderId) {

                    return await handleTrackOrder(request.entities.orderId);

                }

                return {

                    type: "text",

                    content:
                        "📦 Sure! Please paste your Order ID (you'll find it in your order confirmation email, or under My Orders).",

                    awaitingOrderId: true

                };

            }

            /* =====================================
                    SIZE GUIDE
            ===================================== */

            case "SIZE_GUIDE":

                console.log("📏 SIZE_GUIDE");

                return {

                    type: "text",

                    content: SIZE_GUIDE_TEXT

                };

            /* =====================================
                    RECOMMEND
            ===================================== */

            case "RECOMMEND":

                console.log("👕 RECOMMEND");

                return await handleRecommend(request.query, request.entities);

            /* =====================================
                    CART
            ===================================== */

            case "VIEW_CART":

                console.log("🛒 VIEW_CART");

                return {

                    type: "text",

                    content:

                        "🛒 You can view and edit your cart anytime from the cart icon in the top navigation bar."

                };

            /* =====================================
                    WISHLIST
            ===================================== */

            case "VIEW_WISHLIST":

                console.log("❤️ VIEW_WISHLIST");

                return {

                    type: "text",

                    content:

                        "❤️ You can view your saved items from the wishlist (heart) icon in the top navigation bar."

                };

            /* =====================================
                    DEFAULT
            ===================================== */

            default:

                console.log("🤖 DEFAULT → mockAI");

                return getMockReply(message);

        }

    }

    catch (err) {

        console.error("❌ sendToAI Error:", err);

        return {

            type: "text",

            content:

                "⚠ Unable to connect to JerseyHub."

        };

    }

};