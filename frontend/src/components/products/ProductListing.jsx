import React from "react";

import ProductHero from "./ProductHero";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";

const ProductListing = ({

    title,

    subtitle,

    badge,

    glassTitle,

    glassText,

    products,

    search,

    setSearch,

    selectedCategory,

    setSelectedCategory,

    sort,

    setSort,

    categories

}) => {

    return (

        <section className="products-page">

            <ProductHero

                title={title}

                subtitle={subtitle}

                badge={badge}

                glassTitle={glassTitle}

                glassText={glassText}

                totalProducts={products.length}

            />

            <ProductToolbar

                search={search}

                setSearch={setSearch}

                selectedCategory={selectedCategory}

                setSelectedCategory={setSelectedCategory}

                sort={sort}

                setSort={setSort}

                total={products.length}

                categories={categories}

            />

            <ProductGrid

                products={products}

            />

        </section>

    );

};

export default ProductListing;