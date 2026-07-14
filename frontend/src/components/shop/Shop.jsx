import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Shop.css";

import ShopHero from "./ShopHero";
import ShopToolbar from "./ShopToolbar";
import ShopGrid from "./ShopGrid";

const Shop = () => {

    const [jerseys, setJerseys] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        axios

            .get("http://localhost:2987/jersey")

            .then((resp)=>setJerseys(resp.data))

            .catch(console.log);

    }, []);

   const filtered = jerseys.filter((jersey) => {

    return (

        jersey.jerseyName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        jersey.teamName
            .toLowerCase()
            .includes(search.toLowerCase())

    );

});

    return (

        <section className="shop-page">

            <div className="shop-container">

                <ShopHero

                    total={jerseys.length}

                />

                <ShopToolbar

                    search={search}

                    setSearch={setSearch}

                    total={filtered.length}

                />

                <ShopGrid

                    jerseys={filtered}

                />

            </div>

        </section>

    );

};

export default Shop;