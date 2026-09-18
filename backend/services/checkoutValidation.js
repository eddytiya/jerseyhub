const validationError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
};

const validateDeliveryInfo = (deliveryInfo) => {
    const required = ["fullName", "email", "phone", "address1", "city", "state", "pincode"];
    const missing = required.filter((field) => !String(deliveryInfo?.[field] || "").trim());
    if (missing.length) throw validationError(`Missing delivery information: ${missing.join(", ")}`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)) {
        throw validationError("Enter a valid email address");
    }
    if (!/^[6-9]\d{9}$/.test(String(deliveryInfo.phone).replace(/\D/g, ""))) {
        throw validationError("Enter a valid 10-digit Indian mobile number");
    }
    if (!/^[1-9]\d{5}$/.test(String(deliveryInfo.pincode))) {
        throw validationError("Enter a valid 6-digit Indian PIN code");
    }
};

module.exports = { validateDeliveryInfo };
