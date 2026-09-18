const Jersey = require("../model/jerseyModel");

const publishScheduledProducts = async () => {
    const now = new Date();
    return Jersey.updateMany(
        { status: "scheduled", publishAt: { $lte: now } },
        { $set: { status: "published", publishedAt: now, publishAt: null } }
    );
};

const startCatalogPublishingJob = () => {
    const timer = setInterval(() => {
        publishScheduledProducts().catch((error) => console.error("Scheduled publishing failed:", error.message));
    }, 60 * 1000);
    timer.unref?.();
    publishScheduledProducts().catch((error) => console.error("Initial scheduled publishing failed:", error.message));
    return timer;
};

module.exports = { publishScheduledProducts, startCatalogPublishingJob };
