import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddJersey from './components/AddJersey'
import EditJersey from './components/EditJersey'
import ShowJersey from './components/ShowJersey'
import Register from './components/Register'
import Login from './components/Login'
import CategoryPage from './components/CategoryPage'
import Categories from './components/Categories'
import SearchResults from './components/SearchResults'
import AdminDashboard from './components/AdminDashboard'
import ManageJerseys from './components/ManageJerseys'
import Cart from './components/Cart'
import Orders from './components/orders/Orders'
import ManageOrders from './components/ManageOrders'
import AdminRoute from './components/AdminRoute'
import OrderDetailsPage from "./components/orders/OrderDetailsPage";
import Wishlist from "./components/Wishlist";
import ManageReviews from "./components/reviews/ManageReviews";
import Checkout from "./components/checkout/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import ManageProductTypes from "./components/ManageProductTypes";
import AIAssistant from "./components/AIAssistant/AIAssistant";
import ReviewsSection from "./components/Home/Reviews/ReviewsSection";
import Footer from "./components/Footer/Footer";
import ManageSubscribers from "./components/Newsletter/ManageSubscribers";
import ReturnPolicy from "./components/Pages/ReturnPolicy";
import ShippingPolicy from "./components/Pages/ShippingPolicy";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import TermsConditions from "./components/Pages/TermsConditions";
import FAQ from "./components/Pages/FAQ";
import ContactUs from "./components/Pages/ContactUs";

import OrderDetails from './components/OrderDetails'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddCategory from './components/AddCategory'
import ManageCategories from './components/ManageCategories'
import EditCategory from './components/EditCategory'
import Profile from './components/Profile'
import './components/AdminEffects.css'
import Shop from './components/shop'
import Products from "./components/products/Products";

const App = () => {

    return (

        <BrowserRouter>

            {/* Global Navigation Bar */}

            <Navbar />

            <Routes>

                {/* =====================================
                        ADMIN ROUTES
                ===================================== */}

                <Route
    path="/"
    element={<Home />}
/>

<Route
    path="/admin"
    element={
        <AdminRoute>
            <AdminDashboard />
        </AdminRoute>
    }
/>
                <Route
                    path="/orders/:id"
                    element={<OrderDetailsPage />}
                />
                <Route
                    path="/manage-jerseys"
                    element={
                        <AdminRoute>
                            <ManageJerseys />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/add-jersey"
                    element={
                        <AdminRoute>
                            <AddJersey />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/edit-jersey/:id"
                    element={
                        <AdminRoute>
                            <EditJersey />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/manage-categories"
                    element={
                        <AdminRoute>
                            <ManageCategories />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/product-types"
                    element={<ManageProductTypes />}
                />

                <Route
                    path="/add-category"
                    element={
                        <AdminRoute>
                            <AddCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/edit-category/:id"
                    element={
                        <AdminRoute>
                            <EditCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/manage-orders"
                    element={
                        <AdminRoute>
                            <ManageOrders />
                        </AdminRoute>
                    }
                />
                <Route

                    path="/manage-reviews"

                    element={

                        <AdminRoute>

                            <ManageReviews />

                        </AdminRoute>

                    }

                />

                

                <Route
                    path="/manage-orders/:id"
                    element={
                        <AdminRoute>
                            <OrderDetails />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
    path="/manage-subscribers"
    element={
        <AdminRoute>
            <ManageSubscribers />
        </AdminRoute>
    }
/>
                {/* =====================================
                        CUSTOMER ROUTES
                ===================================== */}

                <Route
                    path="/jerseys"
                    element={<Home />}
                />

                <Route
                    path="/shop"
                    element={<Shop />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/categories"
                    element={<Categories />}
                />

                <Route
                    path="/jersey/:id"
                    element={<ShowJersey />}
                />

                <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                />

                <Route
                    path="/search"
                    element={<SearchResults />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />
                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />
                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                <Route

                    path="/wishlist"

                    element={<Wishlist />}

                />

                <Route

                    path="/return-policy"

                    element={<ReturnPolicy />}

                />

                <Route

                    path="/shipping-policy"

                    element={<ShippingPolicy />}

                />

                <Route

                    path="/privacy-policy"

                    element={<PrivacyPolicy />}

                />

                <Route

                    path="/terms"

                    element={<TermsConditions />}

                />

                <Route

                    path="/faq"

                    element={<FAQ />}

                />

                <Route

                    path="/contact"

                    element={<ContactUs />}

                />

                {/* =====================================
                        AUTH ROUTES
                ===================================== */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* =====================================
                        404 PAGE
                ===================================== */}

                <Route
                    path="*"
                    element={
                        <div className="container mt-5 text-center">
                            <h1>404</h1>
                            <h3>Page Not Found</h3>
                        </div>
                    }
                />

                        </Routes>


                        {/* =====================================
            GLOBAL FOOTER
===================================== */}

<Footer />

<ToastContainer

    position="top-right"

    autoClose={3000}

    hideProgressBar={false}

    newestOnTop

    closeOnClick

    pauseOnHover

    draggable

    theme="dark"

/>

            {/* =====================================
                    GLOBAL AI ASSISTANT
            ===================================== */}

            <AIAssistant />
            

        </BrowserRouter>

    )

}

export default App
