import axios from "axios";

const API = "http://localhost:2987";

/* ==========================================
            PRODUCT SEARCH
========================================== */
export const searchProducts = async (

    query,

    entities = {}

) => {

    console.log("🔍 Query:", query);

    console.log("🧠 Entities:", entities);

    const { data } = await axios.get(

        `${API}/jersey/search`,

        {

            params: {

                name: query

            }

        }

    );

    return data;

};

/* ==========================================
            FEATURED PRODUCTS
========================================== */

export const getFeaturedProducts = async () => {

    const { data } = await axios.get(

        `${API}/jersey/featured`

    );

    return data;

};

/* ==========================================
            CATEGORY PRODUCTS
========================================== */

export const getCategoryProducts = async (category) => {

    const { data } = await axios.get(

        `${API}/jersey/category/${category}`

    );

    return data;

};

/* ==========================================
            AI METADATA
========================================== */

export const getAIMetadata = async () => {

    const { data } = await axios.get(

        `${API}/jersey/ai/metadata`

    );

    return data;

};


/* ==========================================
            AI SEARCH
========================================== */

export const aiSearchProducts = async (

    query,

    entities

) => {

    const { data } = await axios.post(

        `${API}/jersey/ai/search`,

        {

            query,

            entities

        }

    );

    return data;

};