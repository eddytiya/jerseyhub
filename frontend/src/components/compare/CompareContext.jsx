import React, { createContext, useContext, useEffect, useState } from "react";
import { showSuccess, showWarning } from "../../utils/toastUtils";

export const CompareContext = createContext();

const MAX_COMPARE = 3;

export const CompareProvider = ({ children }) => {

    const [compareList, setCompareList] = useState([]);

    useEffect(() => {

        const saved = JSON.parse(localStorage.getItem("compareList")) || [];

        setCompareList(saved);

    }, []);

    useEffect(() => {

        localStorage.setItem("compareList", JSON.stringify(compareList));

    }, [compareList]);

    const addToCompare = (product) => {

        const exists = compareList.some((item) => item._id === product._id);

        if (exists) return;

        if (compareList.length >= MAX_COMPARE) {

            showWarning(`You Can Only Compare Up To ${MAX_COMPARE} Jerseys`);

            return;

        }

        setCompareList((prev) => [...prev, product]);

        showSuccess("Added To Compare");

    };

    const removeFromCompare = (id) => {

        setCompareList((prev) => prev.filter((item) => item._id !== id));

    };

    const clearCompare = () => {

        setCompareList([]);

    };

    return (

        <CompareContext.Provider

            value={{

                compareList,

                addToCompare,

                removeFromCompare,

                clearCompare,

                maxCompare: MAX_COMPARE

            }}

        >

            {children}

        </CompareContext.Provider>

    );

};

export const useCompare = () => useContext(CompareContext);
