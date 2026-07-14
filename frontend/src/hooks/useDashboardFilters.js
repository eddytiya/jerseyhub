const useDashboardFilters = ({
    jerseys,
    lowStock,
    recentOrders,
    topSelling,
    bestCustomers,
    search,
    filter
}) => {

    // ===========================================
    // Search Mode
    // ===========================================

    const isSearching = search.trim() !== ''

    // ===========================================
    // Filtered Jerseys
    // ===========================================

    const filteredJerseys = jerseys.filter((jersey) => {

        const matchesSearch =

            jersey.teamName?.toLowerCase().includes(search.toLowerCase()) ||

            jersey.jerseyName?.toLowerCase().includes(search.toLowerCase()) ||

            jersey.category?.toLowerCase().includes(search.toLowerCase())

        if (filter === "All") return matchesSearch

        if (filter === "Featured")
            return matchesSearch && jersey.featured

        if (filter === "Low Stock")
            return matchesSearch && jersey.stock <= 5

        return matchesSearch && jersey.category === filter

    })



    // ===========================================
    // Filtered Low Stock
    // ===========================================

    const filteredLowStock = lowStock.filter((jersey) => {

        const matchesSearch =

            jersey.teamName?.toLowerCase().includes(search.toLowerCase()) ||

            jersey.jerseyName?.toLowerCase().includes(search.toLowerCase())

        if (filter === "All") return matchesSearch

        if (filter === "Low Stock") return matchesSearch

        return matchesSearch && jersey.category === filter

    })



    // ===========================================
    // Filtered Orders
    // ===========================================

    const filteredOrders = recentOrders.filter((order) => {

        const keyword = search.toLowerCase()

        const matchesSearch =

            order.customerName?.toLowerCase().includes(keyword) ||

            order.status?.toLowerCase().includes(keyword) ||

            order._id?.toLowerCase().includes(keyword) ||

          order.jerseys?.some((jersey) => {

    if (!jersey) return false;

    return (

        jersey.teamName?.toLowerCase().includes(keyword) ||

        jersey.jerseyName?.toLowerCase().includes(keyword) ||

        jersey.category?.toLowerCase().includes(keyword)

    );

})

        if (filter === "All") return matchesSearch

        if (filter === "Featured") return matchesSearch

        if (filter === "Low Stock") return matchesSearch

        return (

            matchesSearch &&

            order.jerseys?.some((jersey) =>

                jersey && jersey.category === filter

            )

        )

    })



    // ===========================================
    // Filtered Customers
    // ===========================================

    const filteredCustomers = bestCustomers.filter((customer) =>

        customer.name?.toLowerCase().includes(search.toLowerCase()) ||

        customer.email?.toLowerCase().includes(search.toLowerCase())

    )



    // ===========================================
    // Filtered Top Selling
    // ===========================================

    const filteredTopSelling = topSelling.filter((item) => {

        const keyword = search.toLowerCase()

        const matchesSearch =

            item.jersey?.teamName?.toLowerCase().includes(keyword) ||

            item.jersey?.jerseyName?.toLowerCase().includes(keyword) ||

            item.jersey?.category?.toLowerCase().includes(keyword)

        if (filter === "All") return matchesSearch

        if (filter === "Featured") return matchesSearch

        if (filter === "Low Stock") return matchesSearch

        return matchesSearch && item.jersey?.category === filter

    })



    return {

        isSearching,

        filteredJerseys,

        filteredLowStock,

        filteredOrders,

        filteredCustomers,

        filteredTopSelling

    }

}

export default useDashboardFilters