import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { showSuccess, showError } from "../utils/toastUtils";

const API = `${API_URL}/coupon`;

const useCoupons = () => {

    const [loading, setLoading] = useState(true);

    const [coupons, setCoupons] = useState([]);

    const fetchCoupons = async () => {

        try {

            setLoading(true);

            const res = await axios.get(API, { withCredentials: true });

            setCoupons(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCoupons();

    }, []);

    const createCoupon = async (data) => {

        try {

            await axios.post(API, data, { withCredentials: true });

            showSuccess("Coupon Created");

            fetchCoupons();

            return true;

        }

        catch (err) {

            showError(err.response?.data?.message || "Failed To Create Coupon");

            return false;

        }

    };

    const toggleCoupon = async (coupon) => {

        try {

            await axios.put(

                `${API}/${coupon._id}`,

                { active: !coupon.active },

                { withCredentials: true }

            );

            fetchCoupons();

        }

        catch (err) {

            showError(err.response?.data?.message || "Failed To Update Coupon");

        }

    };

    const deleteCoupon = async (id) => {

        try {

            await axios.delete(`${API}/${id}`, { withCredentials: true });

            showSuccess("Coupon Deleted");

            fetchCoupons();

        }

        catch (err) {

            showError(err.response?.data?.message || "Failed To Delete Coupon");

        }

    };

    return {

        loading,

        coupons,

        fetchCoupons,

        createCoupon,

        toggleCoupon,

        deleteCoupon

    };

};

export default useCoupons;
