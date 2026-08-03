import normalizeMessage from "./normalizeMessage";
import extractEntities from "./extractEntities";
import { ACTIONS } from "./constants";

const buildRequest = (message) => {

    const normalized = normalizeMessage(message);

    const entities = extractEntities(normalized);

    let action = ACTIONS.SEARCH_PRODUCTS;

    if (
        (
            normalized.includes("track") &&
            normalized.includes("order")
        ) ||
        entities.orderId
    ) {

        action = ACTIONS.TRACK_ORDER;

    }

    else if (
        normalized.includes("size") &&
        (
            normalized.includes("guide") ||
            normalized.includes("chart") ||
            normalized.includes("what") ||
            normalized.includes("which") ||
            normalized.includes("should") ||
            normalized.includes("fit")
        )
    ) {

        action = ACTIONS.SIZE_GUIDE;

    }

    else if (
        normalized.includes("recommend") ||
        normalized.includes("suggest")
    ) {

        action = ACTIONS.RECOMMEND;

    }

    else if (
        normalized.includes("wishlist")
    ) {

        action = ACTIONS.VIEW_WISHLIST;

    }

    else if (
        normalized.includes("cart")
    ) {

        action = ACTIONS.VIEW_CART;

    }

    else if (
        normalized.includes("featured") ||
        normalized.includes("popular") ||
        normalized.includes("best seller")
    ) {

        action = ACTIONS.SHOW_FEATURED;

    }

    return {

        action,

        query: normalized,

        entities

    };

};

export default buildRequest;