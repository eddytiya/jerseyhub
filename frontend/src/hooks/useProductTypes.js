import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
const API = `${API_URL}/product-type`;

const useProductTypes = () => {

    const [loading, setLoading] = useState(true);

    const [productTypes, setProductTypes] = useState([]);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("az");

    const [filter, setFilter] = useState("all");

    const [deleteModal, setDeleteModal] = useState(false);

    const [addModal, setAddModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const [selectedType, setSelectedType] = useState(null);

    /* =====================================
            FETCH TYPES
    ===================================== */

    const fetchProductTypes = async () => {

        try {

            setLoading(true);

            const res = await axios.get(API);

            setProductTypes(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProductTypes();

    }, []);

    /* =====================================
            SEARCH + FILTER + SORT
    ===================================== */

    const filteredTypes = useMemo(() => {

        let data = [...productTypes];

        if (search.trim()) {

            data = data.filter(type =>

                type.typeName
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (filter === "active") {

            data = data.filter(type => type.status);

        }

        if (filter === "inactive") {

            data = data.filter(type => !type.status);

        }

        switch (sortBy) {

            case "az":

                data.sort((a, b) =>

                    a.typeName.localeCompare(b.typeName)

                );

                break;

            case "za":

                data.sort((a, b) =>

                    b.typeName.localeCompare(a.typeName)

                );

                break;

            case "newest":

                data.sort(

                    (a, b) =>

                        new Date(b.createdAt) -

                        new Date(a.createdAt)

                );

                break;

            case "oldest":

                data.sort(

                    (a, b) =>

                        new Date(a.createdAt) -

                        new Date(b.createdAt)

                );

                break;

            default:

                break;

        }

        return data;

    }, [

        productTypes,

        search,

        sortBy,

        filter

    ]);

    /* =====================================
            DELETE MODAL
    ===================================== */

    const openDeleteModal = (type) => {

        setSelectedType(type);

        setDeleteModal(true);

    };

    const closeDeleteModal = () => {

        setDeleteModal(false);

        setSelectedType(null);

    };

    /* =====================================
            DELETE PRODUCT TYPE
    ===================================== */

    const deleteProductType = async () => {

        if (!selectedType) return;

        try {

            await axios.delete(

                `${API}/${selectedType._id}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${localStorage.getItem("adminToken")}`

                    }

                }

            );

            fetchProductTypes();

            closeDeleteModal();

        }

        catch (err) {

            console.log(err);

        }

    };

    /* =====================================
            TOGGLE STATUS
    ===================================== */

    const toggleStatus = async (type) => {

        try {

            await axios.put(

                `${API}/toggle-status/${type._id}`,

                {},

                {

                    headers: {

                        Authorization:

                            `Bearer ${localStorage.getItem("adminToken")}`

                    }

                }

            );

            fetchProductTypes();

        }

        catch (err) {

            console.log(err);

        }

    };

    /* =====================================
            ADD MODAL
    ===================================== */

    const openAddModal = () => {

        setAddModal(true);

    };

    const closeAddModal = () => {

        setAddModal(false);

    };

    /* =====================================
            EDIT MODAL
    ===================================== */

    const openEditModal = (type) => {

        setSelectedType(type);

        setEditModal(true);

    };

    const closeEditModal = () => {

        setSelectedType(null);

        setEditModal(false);

    };

    return {

        loading,

        productTypes,

        filteredTypes,

        search,

        setSearch,

        sortBy,

        setSortBy,

        filter,

        setFilter,

        fetchProductTypes,

        deleteModal,

        openDeleteModal,

        closeDeleteModal,

        deleteProductType,

        toggleStatus,

        addModal,

        openAddModal,

        closeAddModal,

        editModal,

        openEditModal,

        closeEditModal,

        selectedType

    };

};

export default useProductTypes;