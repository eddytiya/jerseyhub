import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { showSuccess, showError } from "../utils/toastUtils";

const API = `${API_URL}/bulk-inquiry`;

const useBulkInquiries = () => {

    const [loading, setLoading] = useState(true);

    const [inquiries, setInquiries] = useState([]);

    const fetchInquiries = async () => {

        try {

            setLoading(true);

            const res = await axios.get(API, { withCredentials: true });

            setInquiries(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInquiries();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            await axios.put(

                `${API}/${id}`,

                { status },

                { withCredentials: true }

            );

            showSuccess("Status Updated");

            fetchInquiries();

        }

        catch (err) {

            showError(err.response?.data?.message || "Failed To Update");

        }

    };

    return {

        loading,

        inquiries,

        fetchInquiries,

        updateStatus

    };

};

export default useBulkInquiries;
