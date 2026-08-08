import React from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Sits as the element of a pathless parent <Route> wrapping every route —
 * lets each page fade/slide in on navigation without touching the ~40
 * individual <Route> entries in App.jsx. See useOutlet(): it returns the
 * currently-matched child route element, which AnimatePresence then keeps
 * mounted (with its captured props) until the exit animation finishes.
 */
const AnimatedOutlet = () => {

    const location = useLocation()
    const outlet = useOutlet()
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return outlet
    }

    return (

        <AnimatePresence mode="wait" initial={false}>

            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >

                {outlet}

            </motion.div>

        </AnimatePresence>

    )

}

export default AnimatedOutlet
