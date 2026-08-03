import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaUsers } from "react-icons/fa";
import API_URL from "../../utils/api";
import { showSuccess, showError } from "../../utils/toastUtils";

import "./ContactUs.css";

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    teamName: "",
    quantity: "",
    jerseyDetails: "",
    message: ""
};

const BulkOrderInquiry = () => {

    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

        axios.post(`${API_URL}/bulk-inquiry`, form)
        .then((resp) => {
            showSuccess(resp.data.message || "Inquiry Submitted");
            setForm(emptyForm);
        })
        .catch((err) => {
            showError(err.response?.data?.message || "Failed To Submit Inquiry");
        })
        .finally(() => {
            setLoading(false);
        });

    };

    return (

        <div className="contact-page">

            <div className="container">

                <div className="contact-hero">

                    <span>TEAM & BULK ORDERS</span>

                    <h1>Kitting Out A Whole Team?</h1>

                    <p>
                        Ordering 10 or more jerseys for your team, club or
                        event? Tell us what you need and we'll get back to
                        you with bulk pricing.
                    </p>

                </div>

                <div className="contact-wrapper">

                    <div className="contact-form">

                        <h2>Request A Quote</h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="teamName"
                                placeholder="Team / Club Name (Optional)"
                                value={form.teamName}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                placeholder="Number Of Jerseys"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="jerseyDetails"
                                placeholder="Which Jersey(s) / Sizes Needed"
                                value={form.jerseyDetails}
                                onChange={handleChange}
                            />

                            <textarea
                                rows="5"
                                name="message"
                                placeholder="Anything Else We Should Know"
                                value={form.message}
                                onChange={handleChange}
                            />

                            <button disabled={loading}>
                                <FaPaperPlane />
                                {loading ? "Sending..." : "Send Inquiry"}
                            </button>

                        </form>

                    </div>

                    <div className="contact-side">

                        <div className="whatsapp-card">

                            <FaUsers />

                            <h3>Why Order In Bulk?</h3>

                            <p>
                                Team orders unlock discounted per-jersey
                                pricing, custom name/number printing options,
                                and a single coordinated delivery.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default BulkOrderInquiry;
