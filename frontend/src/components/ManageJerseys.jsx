import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ManageJerseys.css";
import API_URL from "../utils/api";
import ManageHeader from "./managejerseys/ManageHeader";
import JerseyStats from "./managejerseys/JerseyStats";
import SearchToolbar from "./managejerseys/SearchToolbar";
import BulkActions from "./managejerseys/BulkActions";
import InventoryHeader from "./managejerseys/InventoryHeader";
import EmptyState from "./managejerseys/EmptyState";
import JerseyList from "./managejerseys/JerseyList";

const ManageJerseys = () => {

    const [jerseys, setJerseys] = useState([]);

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("All");

    const [sortBy, setSortBy] = useState("default");

    const [selectedJerseys, setSelectedJerseys] = useState([]);

    useEffect(() => {

        fetchJerseys();

    }, []);

    const fetchJerseys = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/jersey`
            );

            setJerseys(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this jersey?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${API_URL}/jersey/${id}`
            );

            fetchJerseys();

        } catch (err) {

            console.log(err);

        }

    };

    const toggleFeatured = async (id) => {

        try {

            await axios.put(
                `${API_URL}/jersey/featured/${id}`
            );

            fetchJerseys();

        } catch (err) {

            console.log(err);

        }

    };

    const handleSelect = (id) => {

        if (selectedJerseys.includes(id)) {

            setSelectedJerseys(

                selectedJerseys.filter(item => item !== id)

            );

        }

        else {

            setSelectedJerseys(

                [...selectedJerseys, id]

            );

        }

    };

    const filteredJerseys = useMemo(() => {

        return jerseys.filter(jersey => {

            const matchesSearch =

                jersey.teamName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                jersey.jerseyName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                jersey.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =

                categoryFilter === "All"

                    ? true

                    : jersey.category === categoryFilter;

            return matchesSearch && matchesCategory;

        });

    }, [jerseys, search, categoryFilter]);

    const sortedJerseys = useMemo(() => {

        const list = [...filteredJerseys];

        switch (sortBy) {

            case "priceLow":

                list.sort((a, b) => a.price - b.price);

                break;

            case "priceHigh":

                list.sort((a, b) => b.price - a.price);

                break;

            case "stock":

                list.sort((a, b) => b.stock - a.stock);

                break;

            case "team":

                list.sort((a, b) =>
                    a.teamName.localeCompare(b.teamName)
                );

                break;

            case "newest":

                list.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );

                break;

            case "oldest":

                list.sort(
                    (a, b) =>
                        new Date(a.createdAt) -
                        new Date(b.createdAt)
                );

                break;

            default:

                break;

        }

        return list;

    }, [filteredJerseys, sortBy]);

    const handleSelectAll = () => {

        if (

            selectedJerseys.length === sortedJerseys.length

        ) {

            setSelectedJerseys([]);

        }

        else {

            setSelectedJerseys(

                sortedJerseys.map(item => item._id)

            );

        }

    };

    const deleteSelected = async () => {

        if (

            !window.confirm(

                `Delete ${selectedJerseys.length} jerseys?`

            )

        ) return;

        try {

            await Promise.all(

                selectedJerseys.map(id =>

                    axios.delete(
                        `${API_URL}/jersey/${id}`
                    )

                )

            );

            setSelectedJerseys([]);

            fetchJerseys();

        }

        catch (err) {

            console.log(err);

        }

    };

    const featureSelected = async () => {

        try {

            await Promise.all(

                selectedJerseys.map(id =>

                    axios.put(
                        `${API_URL}/jersey/featured/${id}`
                    )

                )

            );

            setSelectedJerseys([]);

            fetchJerseys();

        }

        catch (err) {

            console.log(err);

        }

    };

    const unfeatureSelected = async () => {

        try {

            const featured = jerseys.filter(

                jersey =>

                    jersey.featured &&

                    selectedJerseys.includes(jersey._id)

            );

            await Promise.all(

                featured.map(jersey =>

                    axios.put(
                        `${API_URL}/jersey/featured/${jersey._id}`
                    )

                )

            );

            setSelectedJerseys([]);

            fetchJerseys();

        }

        catch (err) {

            console.log(err);

        }

    };

    const stats = {

        total: jerseys.length,

        featured: jerseys.filter(j => j.featured).length,

        lowStock: jerseys.filter(
            j => j.stock > 0 && j.stock <= 5
        ).length,

        outOfStock: jerseys.filter(
            j => j.stock === 0
        ).length

    };

        return (

     <div className="adminjersey-page">

            <ManageHeader />

            <JerseyStats

                totalJerseys={stats.total}

                featuredCount={stats.featured}

                lowStockCount={stats.lowStock}

                outOfStockCount={stats.outOfStock}

            />

            <SearchToolbar
    search={search}
    setSearch={setSearch}
    categoryFilter={categoryFilter}
    setCategoryFilter={setCategoryFilter}
    sortBy={sortBy}
    setSortBy={setSortBy}
    total={sortedJerseys.length}
/>

            {

                selectedJerseys.length > 0 && (

                    <BulkActions

                        selectedCount={selectedJerseys.length}

                        onDelete={deleteSelected}

                        onFeature={featureSelected}

                        onUnfeature={unfeatureSelected}

                    />

                )

            }

            <InventoryHeader

                total={sortedJerseys.length}

                selected={selectedJerseys.length}

                allSelected={

                    sortedJerseys.length > 0 &&

                    selectedJerseys.length === sortedJerseys.length

                }

                onSelectAll={handleSelectAll}

            />

            {

                sortedJerseys.length === 0

                    ?

                    (

                        <EmptyState />

                    )

                    :

                    (

                        <JerseyList

                            jerseys={sortedJerseys}

                            selectedJerseys={selectedJerseys}

                            onSelect={handleSelect}

                            onDelete={handleDelete}

                            onToggleFeatured={toggleFeatured}

                        />

                    )

            }

        </div>

    );

};

export default ManageJerseys;