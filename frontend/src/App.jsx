import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import AnimatedOutlet from './components/AnimatedOutlet'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AdminRoute from './components/AdminRoute'
import Footer from './components/Footer/Footer'
import CompareBar from './components/compare/CompareBar'

import './components/AdminEffects.css'

/* =====================================
        LAZY-LOADED ROUTES
        (split out of the main bundle —
        admin panel, checkout, and the
        static pages aren't needed on
        first paint)
===================================== */

const AddJersey = lazy(() => import('./components/AddJersey'))
const EditJersey = lazy(() => import('./components/EditJersey'))
const ShowJersey = lazy(() => import('./components/ShowJersey'))
const CategoryPage = lazy(() => import('./components/CategoryPage'))
const Categories = lazy(() => import('./components/Categories'))
const SearchResults = lazy(() => import('./components/SearchResults'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const ManageJerseys = lazy(() => import('./components/ManageJerseys'))
const Cart = lazy(() => import('./components/Cart'))
const Orders = lazy(() => import('./components/orders/Orders'))
const ManageOrders = lazy(() => import('./components/ManageOrders'))
const OrderDetailsPage = lazy(() => import('./components/orders/OrderDetailsPage'))
const Wishlist = lazy(() => import('./components/Wishlist'))
const ManageReviews = lazy(() => import('./components/reviews/ManageReviews'))
const Checkout = lazy(() => import('./components/checkout/Checkout'))
const OrderSuccess = lazy(() => import('./components/OrderSuccess'))
const ManageProductTypes = lazy(() => import('./components/ManageProductTypes'))
const AIAssistant = lazy(() => import('./components/AIAssistant/AIAssistant'))
const ManageSubscribers = lazy(() => import('./components/Newsletter/ManageSubscribers'))
const ReturnPolicy = lazy(() => import('./components/Pages/ReturnPolicy'))
const ShippingPolicy = lazy(() => import('./components/Pages/ShippingPolicy'))
const PrivacyPolicy = lazy(() => import('./components/Pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./components/Pages/TermsConditions'))
const FAQ = lazy(() => import('./components/Pages/FAQ'))
const ContactUs = lazy(() => import('./components/Pages/ContactUs'))
const OrderDetails = lazy(() => import('./components/OrderDetails'))
const AddCategory = lazy(() => import('./components/AddCategory'))
const ManageCategories = lazy(() => import('./components/ManageCategories'))
const EditCategory = lazy(() => import('./components/EditCategory'))
const Profile = lazy(() => import('./components/Profile'))
const Shop = lazy(() => import('./components/shop'))
const Products = lazy(() => import('./components/products/Products'))
const ManageCoupons = lazy(() => import('./components/managecoupons/ManageCoupons'))
const ManageBulkInquiries = lazy(() => import('./components/managecoupons/ManageBulkInquiries'))
const BulkOrderInquiry = lazy(() => import('./components/Pages/BulkOrderInquiry'))
const ComparePage = lazy(() => import('./components/compare/ComparePage'))

const RouteLoader = () => (
    <div style={{ padding: '120px 0', textAlign: 'center' }}>
        Loading...
    </div>
)

const App = () => {

    return (

        <BrowserRouter>

            {/* Global Navigation Bar */}

            <Navbar />

            <Suspense fallback={<RouteLoader />}>

            <Routes>

                {/* Pathless layout route — animates every page transition
                    in one place instead of wrapping each Route below */}
                <Route element={<AnimatedOutlet />}>

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
                <Route
    path="/manage-coupons"
    element={
        <AdminRoute>
            <ManageCoupons />
        </AdminRoute>
    }
/>
                <Route
    path="/manage-bulk-inquiries"
    element={
        <AdminRoute>
            <ManageBulkInquiries />
        </AdminRoute>
    }
/>
                <Route
                    path="/bulk-order"
                    element={<BulkOrderInquiry />}
                />
                <Route
                    path="/compare"
                    element={<ComparePage />}
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

                </Route>

                        </Routes>

            </Suspense>

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

            <Suspense fallback={null}>
                <AIAssistant />
            </Suspense>

            <CompareBar />


        </BrowserRouter>

    )

}

export default App
