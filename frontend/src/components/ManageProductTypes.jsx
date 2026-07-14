import React from "react";

import "./ManageProductTypes.css";

import useProductTypes from "../hooks/useProductTypes";

import ProductTypesHeader from "./manageproducttypes/ProductTypesHeader";
import ProductTypesStats from "./manageproducttypes/ProductTypesStats";
import ProductTypesToolbar from "./manageproducttypes/ProductTypesToolbar";
import ProductTypesGrid from "./manageproducttypes/ProductTypesGrid";
import ProductTypesSkeleton from "./manageproducttypes/ProductTypesSkeleton";

import AddProductTypeModal from "./manageproducttypes/AddProductTypeModal";
import EditProductTypeModal from "./manageproducttypes/EditProductTypeModal";
import DeleteProductTypeModal from "./manageproducttypes/DeleteProductTypeModal";

const ManageProductTypes = () => {

    const {

        loading,

        productTypes,

        filteredTypes,

        fetchProductTypes,

        search,

        setSearch,

        sortBy,

        setSortBy,

        filter,

        setFilter,

        addModal,

        openAddModal,

        closeAddModal,

        editModal,

        openEditModal,

        closeEditModal,

        deleteModal,

        openDeleteModal,

        closeDeleteModal,

        deleteProductType,

        selectedType,

        toggleStatus

    } = useProductTypes();

    if (loading) {

        return (

            <div className="page-container">

                <ProductTypesSkeleton />

            </div>

        );

    }

    return (

        <div className="page-container fade-in">

            <ProductTypesHeader

                onAdd={openAddModal}

            />

            <ProductTypesStats

                totalTypes={productTypes.length}

                activeTypes={

                    productTypes.filter(

                        type=>type.status

                    ).length

                }

                inactiveTypes={

                    productTypes.filter(

                        type=>!type.status

                    ).length

                }

                totalProducts={0}

            />

            <ProductTypesToolbar

                search={search}

                setSearch={setSearch}

                sortBy={sortBy}

                setSortBy={setSortBy}

                filter={filter}

                setFilter={setFilter}

                totalResults={filteredTypes.length}

            />

            <ProductTypesGrid

                productTypes={filteredTypes}

                onEdit={openEditModal}

                onDelete={openDeleteModal}

                onToggle={toggleStatus}

            />

            <AddProductTypeModal

                isOpen={addModal}

                onClose={closeAddModal}

                onSuccess={fetchProductTypes}

            />

            <EditProductTypeModal

                isOpen={editModal}

                productType={selectedType}

                onClose={closeEditModal}

                onSuccess={fetchProductTypes}

            />

            <DeleteProductTypeModal

                isOpen={deleteModal}

                productTypeName={

                    selectedType?.typeName

                }

                onCancel={closeDeleteModal}

                onConfirm={deleteProductType}

            />

        </div>

    );

};

export default ManageProductTypes;