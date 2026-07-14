import React from "react";
import CategoryAdminCard from "./CategoryAdminCard";
import CategoriesEmpty from "./CategoriesEmpty";
import "./CategoriesGrid.css";

const CategoriesGrid = ({
    categories,
    jerseys,
    onDelete,
    onToggleFeatured
}) => {

    if (categories.length === 0) {
        return <CategoriesEmpty />;
    }

    return (

        <section className="categories-admin-grid">

            {

                categories.map((category) => (

                    <CategoryAdminCard
                        key={category._id}
                        category={category}
                        jerseyCount={
                            jerseys.filter(
                                jersey =>
                                    jersey.category === category.name
                            ).length
                        }
                        onDelete={onDelete}
                        onToggleFeatured={onToggleFeatured}
                    />

                ))

            }

        </section>

    );

};

export default CategoriesGrid;