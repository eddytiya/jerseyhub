const validateEnv = () => {
    const required = [
        "MONGO_URI",
        "SESSION_SECRET",
        "RAZORPAY_KEY_ID",
        "RAZORPAY_KEY_SECRET",
        "GOOGLE_CLIENT_ID",
        "FRONTEND_URL",
    ];
    const missing = required.filter((key) => !process.env[key]?.trim());

    if (process.env.NODE_ENV === "production") {
        for (const key of ["EMAIL_USER", "EMAIL_PASS", "RAZORPAY_WEBHOOK_SECRET"]) {
            if (!process.env[key]?.trim()) missing.push(key);
        }
    } else if (Boolean(process.env.EMAIL_USER) !== Boolean(process.env.EMAIL_PASS)) {
        missing.push("EMAIL_USER and EMAIL_PASS must be configured together");
    }

    if (missing.length) {
        throw new Error(`Missing required environment configuration: ${missing.join(", ")}`);
    }

    if ((process.env.SESSION_SECRET || "").length < 32) {
        throw new Error("SESSION_SECRET must be at least 32 characters");
    }

    for (const key of ["FREE_SHIPPING_THRESHOLD", "STANDARD_SHIPPING_CHARGE", "GST_RATE", "COD_MAX_AMOUNT"]) {
        if (process.env[key] && (!Number.isFinite(Number(process.env[key])) || Number(process.env[key]) < 0)) {
            throw new Error(`${key} must be a non-negative number`);
        }
    }
};

module.exports = { validateEnv };
