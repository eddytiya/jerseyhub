export const getTotalOrders = (orders) => {

    return orders.length;

};

export const getPendingOrders = (orders) => {

    return orders.filter(

        order =>

            order.status === "Pending" ||

            order.status === "Processing"

    ).length;

};

export const getDeliveredOrders = (orders) => {

    return orders.filter(

        order =>

            order.status === "Delivered"

    ).length;

};

export const getRevenue = (orders) => {

    return orders.reduce(

        (total,order)=>

            total + Number(order.totalAmount || 0),

        0

    );

};