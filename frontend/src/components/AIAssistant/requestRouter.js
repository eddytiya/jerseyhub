const routeRequest = (message) => {

    const text = message.toLowerCase().trim();

    /* ===========================
            FEATURED
    =========================== */

    if (
        text.includes("featured") ||
        text.includes("best seller") ||
        text.includes("popular")
    ) {

        return {
            action: "SHOW_FEATURED"
        };

    }

    /* ===========================
            TRACK ORDER
    =========================== */

    if (
        text.includes("track") &&
        text.includes("order")
    ) {

        return {
            action: "TRACK_ORDER"
        };

    }

    /* ===========================
            CART
    =========================== */

    if (text.includes("cart")) {

        return {
            action: "VIEW_CART"
        };

    }

    /* ===========================
            WISHLIST
    =========================== */

    if (text.includes("wishlist")) {

        return {
            action: "VIEW_WISHLIST"
        };

    }

    /* ===========================
            PRODUCT SEARCH
    =========================== */

    const query = text

        .replace(/\b(show|find|search|give|display|recommend|want|need|looking|looking for|can you|please|me|all|the)\b/gi, "")

        .replace(/\b(jersey|jerseys|kit|kits|shirt|shirts|football)\b/gi, "")

        .replace(/\s+/g, " ")

        .trim();

    return {

        action: "SEARCH_PRODUCTS",

        query

    };

};

export default routeRequest;