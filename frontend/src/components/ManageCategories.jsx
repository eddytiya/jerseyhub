import React from "react";

import "./ManageCategories.css";

import CategoriesHeader from "./managecategories/CategoriesHeader";
import CategoriesStats from "./managecategories/CategoriesStats";
import CategoriesToolbar from "./managecategories/CategoriesToolbar";
import CategoriesGrid from "./managecategories/CategoriesGrid";
import CategoriesSkeleton from "./managecategories/CategoriesSkeleton";
import DeleteCategoryModal from "./managecategories/DeleteCategoryModal";

import useCategories from "../hooks/useCategories";

import {
    getTotalCategories,
    getTotalJerseys,
    getFeaturedJerseys,
    getLowStockJerseys
} from "../utils/categoryHelpers";

const ManageCategories = () => {

    const {

        loading,

        jerseys,

        categories,

        filteredCategories,

        search,

        setSearch,

        sortBy,

        setSortBy,

        filter,

        setFilter,

        toggleFeatured,

        deleteCategory,

        deleteModal,

        openDeleteModal,

        closeDeleteModal,

        selectedCategory

    } = useCategories();

    if (loading) {

        return <CategoriesSkeleton />;

    }

    return (

        <div className="categories-admin-page container">

            {/* =====================================
                    HEADER
            ====================================== */}

            <CategoriesHeader />

            {/* =====================================
                    STATS
            ====================================== */}

            <CategoriesStats

                totalCategories={

                    getTotalCategories(categories)

                }

                totalJerseys={

                    getTotalJerseys(jerseys)

                }

                featuredJerseys={

                    getFeaturedJerseys(jerseys)

                }

                lowStock={

                    getLowStockJerseys(jerseys)

                }

            />

            {/* =====================================
                    TOOLBAR
            ====================================== */}

            <CategoriesToolbar

                search={search}

                setSearch={setSearch}

                sortBy={sortBy}

                setSortBy={setSortBy}

                filter={filter}

                setFilter={setFilter}

                categories={categories}

                totalResults={filteredCategories.length}

            />

            {/* =====================================
                    GRID
            ====================================== */}

            <CategoriesGrid

                categories={filteredCategories}

                jerseys={jerseys}

                onDelete={openDeleteModal}

                onToggleFeatured={toggleFeatured}

            />

            {/* =====================================
                    DELETE MODAL
            ====================================== */}

            <DeleteCategoryModal

                isOpen={deleteModal}

                categoryName={

                    selectedCategory

                        ? selectedCategory.name

                        : ""

                }

                onCancel={closeDeleteModal}

                onConfirm={deleteCategory}

            />

        </div>

    );

};

export default ManageCategories;