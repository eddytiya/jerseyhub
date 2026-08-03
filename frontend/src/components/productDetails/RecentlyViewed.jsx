import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";
import { getRecentlyViewedIds } from "../../utils/recentlyViewed";
import ProductGrid from "../products/ProductGrid";

const RecentlyViewed = ({ excludeId }) => {

    const [jerseys, setJerseys] = useState([]);

    useEffect(() => {

        const ids = getRecentlyViewedIds(excludeId);

        if (!ids.length) {
            setJerseys([]);
            return;
        }

        axios.get(`${API_URL}/jersey/batch?ids=${ids.join(",")}`)
        .then((resp) => {

            const order = ids;

            const sorted = [...resp.data].sort(
                (a, b) => order.indexOf(a._id) - order.indexOf(b._id)
            );

            setJerseys(sorted);

        })
        .catch((err) => console.log(err));

    }, [excludeId]);

    if (!jerseys.length) return null;

    return (

        <section className="related-products">

            <h2>Recently Viewed</h2>

            <ProductGrid products={jerseys.slice(0, 4)} />

        </section>

    );

};

export default RecentlyViewed;
