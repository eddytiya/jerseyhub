import React from "react";
import { FaUsers } from "../../utils/navbarIcons";
import useBulkInquiries from "../../hooks/useBulkInquiries";
import "./ManageCoupons.css";

const ManageBulkInquiries = () => {

    const { loading, inquiries, updateStatus } = useBulkInquiries();

    return (
        <div className="coupons-admin-page container">

            <div className="coupons-header">
                <FaUsers />
                <h1>Bulk Order Inquiries</h1>
            </div>

            {loading ? (
                <p>Loading Inquiries...</p>
            ) : (
                <div className="coupons-table-wrap">
                    <table className="coupons-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Team</th>
                                <th>Qty</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr key={inq._id}>
                                    <td><strong>{inq.name}</strong></td>
                                    <td>{inq.email}<br />{inq.phone}</td>
                                    <td>{inq.teamName || "—"}</td>
                                    <td>{inq.quantity}</td>
                                    <td style={{ maxWidth: 260 }}>
                                        {inq.jerseyDetails}
                                        {inq.jerseyDetails && inq.message ? " — " : ""}
                                        {inq.message}
                                    </td>
                                    <td>
                                        <select
                                            value={inq.status}
                                            onChange={(e) => updateStatus(inq._id, e.target.value)}
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {!inquiries.length && (
                                <tr>
                                    <td colSpan={6} className="no-coupons">
                                        No Bulk Order Inquiries Yet
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

export default ManageBulkInquiries;
