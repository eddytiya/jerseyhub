const getCommand = (message) => {

    const text = message.toLowerCase().trim();

    /* ===================================
            FEATURED PRODUCTS
    =================================== */

    if (

        text.includes("featured") ||

        text.includes("best seller") ||

        text.includes("best sellers") ||

        text.includes("popular")

    ) {

        return {

            command: "SHOW_FEATURED"

        };

    }

    /* ===================================
            TRACK ORDER
    =================================== */

    if (

        text.includes("track") ||

        text.includes("order status")

    ) {

        return {

            command: "TRACK_ORDER"

        };

    }

    /* ===================================
            CART
    =================================== */

    if (

        text.includes("cart")

    ) {

        return {

            command: "SHOW_CART"

        };

    }

    /* ===================================
            WISHLIST
    =================================== */

    if (

        text.includes("wishlist")

    ) {

        return {

            command: "SHOW_WISHLIST"

        };

    }

    /* ===================================
            PRODUCT SEARCH
    =================================== */

    if (

        text.includes("show") ||

        text.includes("find") ||

        text.includes("search") ||

        text.includes("looking for") ||

        text.includes("jersey") ||

        text.includes("kit") ||

        text.includes("shirt")

    ) {

        return {

            command: "SEARCH_PRODUCTS",

            query: message

        };

    }

    /* ===================================
            DEFAULT
    =================================== */

    return {

        command: "GENERAL",

        query: message

    };

};

export default getCommand;