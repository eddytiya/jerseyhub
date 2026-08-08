import React, {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import axios from "axios";

import API_URL from "../../utils/api";
import { showSuccess, showError } from "../../utils/toastUtils";
export const WishlistContext = createContext();

export const WishlistProvider = ({

    children

}) => {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        const savedWishlist = JSON.parse(

            localStorage.getItem(

                "wishlist"

            )

        ) || [];

        setWishlist(savedWishlist);

    }, []);

    useEffect(() => {

        localStorage.setItem(

            "wishlist",

            JSON.stringify(

                wishlist

            )

        );

    }, [wishlist]);

    const addToWishlist = (product) => {

        const exists = wishlist.some(

            (item) =>

                item._id === product._id

        );

        if (exists) {

            return;

        }

        setWishlist((prev) => [

            ...prev,

            product

        ]);

        showSuccess(

            "Added to Wishlist ❤️"

        );

    };

    const removeFromWishlist = (id) => {

        setWishlist(

            wishlist.filter(

                (item) =>

                    item._id !== id

            )

        );

        showSuccess(

            "Removed from Wishlist"

        );

    };

    const moveToCart = async (product) => {

        // The real cart lives on the backend (Cart.jsx reads from
        // `${API_URL}/cart/me`) — this used to write to a `localStorage`
        // "cart" key that nothing ever read, so items silently vanished.
        try {

            await axios.post(

                `${API_URL}/cart/add`,

                {

                    jerseyId: product._id,

                    quantity: 1

                },

                {

                    withCredentials: true

                }

            );

            setWishlist((prev) =>

                prev.filter((item) => item._id !== product._id)

            );

            showSuccess(

                "Moved To Cart 🛒"

            );

        }

        catch (err) {

            showError(

                err.response?.data?.message ||

                "Couldn't move this to your cart — try again"

            );

        }

    };

    return (

        <WishlistContext.Provider

            value={{

                wishlist,

                addToWishlist,

                removeFromWishlist,

                moveToCart

            }}

        >

            {children}

        </WishlistContext.Provider>

    );

};

export const useWishlist = () =>

    useContext(

        WishlistContext

    );