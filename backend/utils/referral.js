const crypto = require('crypto');
const userModel = require('../model/userModel');

const generateReferralCode = async (uname) => {

    let code;

    let exists = true;

    while (exists) {

        const base = (uname || "JH").replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase() || "JH";

        const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();

        code = `${base}${suffix}`;

        exists = await userModel.exists({ referralCode: code });

    }

    return code;

};

module.exports = { generateReferralCode };
