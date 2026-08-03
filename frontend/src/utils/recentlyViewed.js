const KEY = "recentlyViewed";
const MAX_ITEMS = 10;

export const trackRecentlyViewed = (jerseyId) => {

    if (!jerseyId) return;

    try {

        const existing = JSON.parse(localStorage.getItem(KEY)) || [];

        const updated = [
            jerseyId,
            ...existing.filter((id) => id !== jerseyId)
        ].slice(0, MAX_ITEMS);

        localStorage.setItem(KEY, JSON.stringify(updated));

    }
    catch (err) {
        console.log(err);
    }

};

export const getRecentlyViewedIds = (excludeId) => {

    try {

        const existing = JSON.parse(localStorage.getItem(KEY)) || [];

        return existing.filter((id) => id !== excludeId);

    }
    catch (err) {
        return [];
    }

};
