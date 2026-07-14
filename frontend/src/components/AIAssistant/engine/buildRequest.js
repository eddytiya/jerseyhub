import normalizeMessage from "./normalizeMessage";
import extractEntities from "./extractEntities";
import { ACTIONS } from "./constants";

const buildRequest = (message) => {

    const normalized = normalizeMessage(message);

    const entities = extractEntities(normalized);

    let action = ACTIONS.SEARCH_PRODUCTS;

    if (
        normalized.includes("track") &&
        normalized.includes("order")
    ) {

        action = ACTIONS.TRACK_ORDER;

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