import buildRequest from "./engine";


import {

    aiSearchProducts,

    searchProducts,

    getFeaturedProducts

} from "./apiService";

import getMockReply from "./mockAI";

export const sendToAI = async (message) => {

    console.log("🚀 sendToAI() started");
    console.log("📩 Message:", message);

    try {

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

            case "TRACK_ORDER":

                console.log("📦 TRACK_ORDER");

                return {

                    type: "text",

                    content:

                        "📦 Please enter your Order ID."

                };

            /* =====================================
                    CART
            ===================================== */

            case "VIEW_CART":

                console.log("🛒 VIEW_CART");

                return {

                    type: "text",

                    content:

                        "🛒 Cart integration is coming soon."

                };

            /* =====================================
                    WISHLIST
            ===================================== */

            case "VIEW_WISHLIST":

                console.log("❤️ VIEW_WISHLIST");

                return {

                    type: "text",

                    content:

                        "❤️ Wishlist integration is coming soon."

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