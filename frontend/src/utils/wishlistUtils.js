export const isWishlisted = (

    wishlist,

    id

) => {

    return wishlist.some(

        (item) => item._id === id

    );

};

export const wishlistCount = (

    wishlist

) => {

    return wishlist.length;

};