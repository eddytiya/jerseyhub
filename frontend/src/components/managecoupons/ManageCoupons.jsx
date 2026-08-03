import React, { useState } from "react";
import { FaGift, FaTrashAlt } from "../../utils/navbarIcons";
import useCoupons from "../../hooks/useCoupons";
import "./ManageCoupons.css";

const emptyForm = {
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expiresAt: ""
};

const ManageCoupons = () => {

    const {
        loading,
        coupons,
        createCoupon,
        toggleCoupon,
        deleteCoupon
    } = useCoupons();

    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.code || !form.discountValue) return;

        const payload = {
            code: form.code,
            discountType: form.discountType,
            discountValue: Number(form.discountValue),
            minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
            maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : null,
            usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
            expiresAt: form.expiresAt || null
        };

        const ok = await createCoupon(payload);

        if (ok) setForm(emptyForm);
    };

    return (
        <div className="coupons-admin-page container">

            <div className="coupons-header">
                <FaGift />
                <h1>Manage Coupons</h1>
            </div>

            <form className="coupon-form" onSubmit={handleSubmit}>

                <input
                    name="code"
                    placeholder="Code (e.g. WELCOME10)"
                    value={form.code}
                    onChange={handleChange}
                    required
                />

                <select name="discountType" value={form.discountType} onChange={handleChange}>
                    <option value="percentage">% Off</option>
                    <option value="flat">₹ Flat Off</option>
                </select>

                <input
                    name="discountValue"
                    type="number"
                    placeholder="Value"
                    value={form.discountValue}
                    onChange={handleChange}
                    required
                />

                <input
                    name="minOrderAmount"
                    type="number"
                    placeholder="Min Order Amount"
                    value={form.minOrderAmount}
                    onChange={handleChange}
                />

                <input
                    name="maxDiscountAmount"
                    type="number"
                    placeholder="Max Discount (Optional)"
                    value={form.maxDiscountAmount}
                    onChange={handleChange}
                />

                <input
                    name="usageLimit"
                    type="number"
                    placeholder="Usage Limit (Optional)"
                    value={form.usageLimit}
                    onChange={handleChange}
                />

                <input
                    name="expiresAt"
                    type="date"
                    value={form.expiresAt}
                    onChange={handleChange}
                />

                <button type="submit" className="coupon-add-btn">
                    Add Coupon
                </button>

            </form>

            {loading ? (
                <p>Loading Coupons...</p>
            ) : (
                <div className="coupons-table-wrap">
                    <table className="coupons-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Min Order</th>
                                <th>Used</th>
                                <th>Expires</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c._id}>
                                    <td><strong>{c.code}</strong></td>
                                    <td>
                                        {c.discountType === "percentage"
                                            ? `${c.discountValue}%`
                                            : `₹${c.discountValue}`}
                                    </td>
                                    <td>₹{c.minOrderAmount}</td>
                                    <td>
                                        {c.usedCount}
                                        {c.usageLimit ? ` / ${c.usageLimit}` : ""}
                                    </td>
                                    <td>
                                        {c.expiresAt
                                            ? new Date(c.expiresAt).toLocaleDateString("en-IN")
                                            : "—"}
                                    </td>
                                    <td>
                                        <button
                                            className={`status-toggle ${c.active ? "active" : "inactive"}`}
                                            onClick={() => toggleCoupon(c)}
                                        >
                                            {c.active ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="coupon-delete-btn"
                                            onClick={() => deleteCoupon(c._id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!coupons.length && (
                                <tr>
                                    <td colSpan={7} className="no-coupons">
                                        No Coupons Yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default ManageCoupons;
