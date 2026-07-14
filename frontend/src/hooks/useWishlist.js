import { useContext } from "react";
import { WishlistContext } from "../components/wishlist/WishlistContext";

const useWishlist = () => {

    return useContext(

        WishlistContext

    );

};

export default useWishlist;