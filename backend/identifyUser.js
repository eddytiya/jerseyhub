const crypto = require('crypto');

/* ==========================================
    IDENTIFY LOGGED-IN USER OR GUEST SESSION
    (Allows Cart / Checkout Without Login)
========================================== */

const identifyUser = (req, res, next) => {

    if (!req.session.userId && !req.session.guestId) {

        req.session.guestId = crypto.randomUUID();

    }

    next();

};

module.exports = identifyUser;
