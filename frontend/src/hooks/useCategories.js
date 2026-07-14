import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const CATEGORY_API = "http://localhost:2987/category";
const JERSEY_API = "http://localhost:2987/jersey";

const useCategories = () => {

    const [categories, setCategories] = useState([]);
    const [jerseys, setJerseys] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("A-Z");

    const [filter, setFilter] = useState("All");

    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchData = async () => {

        try{

            setLoading(true);

            const [categoryRes, jerseyRes] = await Promise.all([

                axios.get(CATEGORY_API),

                axios.get(JERSEY_API)

            ]);

            setCategories(categoryRes.data);

            setJerseys(jerseyRes.data);

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        fetchData();

    },[]);

    /* =============================
            DELETE
    ============================== */

    const openDeleteModal=(category)=>{

        setSelectedCategory(category);

        setDeleteModal(true);

    };

    const closeDeleteModal=()=>{

        setDeleteModal(false);

        setSelectedCategory(null);

    };

    const deleteCategory=async()=>{

        if(!selectedCategory) return;

        try{

            await axios.delete(

                `${CATEGORY_API}/${selectedCategory._id}`

            );

            closeDeleteModal();

            fetchData();

        }

        catch(err){

            console.log(err);

        }

    };

    /* =============================
        TOGGLE FEATURED
    ============================== */

    const toggleFeatured=async(id)=>{

        try{

            await axios.put(

                `${CATEGORY_API}/toggle-featured/${id}`

            );

            fetchData();

        }

        catch(err){

            console.log(err);

        }

    };

    /* =============================
            FILTERING
    ============================== */

    const filteredCategories=useMemo(()=>{

        return [...categories]

        .filter(category=>{

            const matchesSearch=

                category.name
                .toLowerCase()
                .includes(search.toLowerCase())

                ||

                category.description
                .toLowerCase()
                .includes(search.toLowerCase());

            if(filter==="All"){

                return matchesSearch;

            }

            return matchesSearch && category.name===filter;

        })

        .sort((a,b)=>{

            if(sortBy==="A-Z"){

                return a.name.localeCompare(b.name);

            }

            if(sortBy==="Z-A"){

                return b.name.localeCompare(a.name);

            }

            return 0;

        });

    },[

        categories,

        search,

        sortBy,

        filter

    ]);

    return{

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

        fetchData,

        toggleFeatured,

        deleteCategory,

        deleteModal,

        openDeleteModal,

        closeDeleteModal,

        selectedCategory

    };

};

export default useCategories;