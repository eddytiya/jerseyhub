import { createRoot } from 'react-dom/client'

// Bootstrap must load before the theme so theme colors (which rely on
// element-level selectors like `body`) win the cascade instead of
// Bootstrap's reboot styles.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './components/theme/themes.css'

import App from './App.jsx'

import axios from 'axios'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThemeProvider } from './components/theme'

import {

    WishlistProvider

} from "./components/wishlist/WishlistContext";

import {

    CompareProvider

} from "./components/compare/CompareContext";

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider

        clientId={

            import.meta.env.VITE_GOOGLE_CLIENT_ID

        }

    >

        <WishlistProvider>

            <CompareProvider>

                <ThemeProvider>

                    <App />

                    <ToastContainer

                        position="top-right"

                        autoClose={3000}

                        hideProgressBar={false}

                        newestOnTop={true}

                        closeOnClick

                        pauseOnHover

                        draggable

                        theme="colored"

                    />

                </ThemeProvider>

            </CompareProvider>

        </WishlistProvider>

    </GoogleOAuthProvider>

);