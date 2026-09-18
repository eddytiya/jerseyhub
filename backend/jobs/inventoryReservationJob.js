const cron = require("node-cron");
const { releaseReservations } = require("../services/inventoryReservation");

const startInventoryReservationJob = () => {
    cron.schedule("* * * * *", () => releaseReservations({ expiresAt: { $lte: new Date() } })
        .catch((error) => console.error("Reservation release failed:", error.message)));
};

module.exports = { startInventoryReservationJob };
