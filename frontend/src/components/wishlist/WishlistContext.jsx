import React, {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import { showSuccess } from "../../utils/toastUtils";
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

    const moveToCart = (product) => {

        const cart = JSON.parse(

            localStorage.getItem(

                "cart"

            )

        ) || [];

        const exists = cart.some(

            (item) =>

                item._id === product._id

        );

        if (!exists) {

            cart.push(product);

        }

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

        removeFromWishlist(

            product._id

        );

        showSuccess(

            "Moved To Cart 🛒"

        );

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