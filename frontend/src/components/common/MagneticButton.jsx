import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const PULL_SPRING = { stiffness: 150, damping: 15, mass: 0.6 };

/**
 * Wraps any button/link-like element with a subtle magnetic pull toward the
 * cursor and a click ripple. Reserve for high-intent CTAs (add to cart,
 * checkout, hero CTA) — everything else keeps its plain hover.
 *
 * `as` lets it render as a NavLink/Link when the target is a route.
 */
const MagneticButton = ({
    as: Component = "button",
    className = "",
    children,
    pullStrength = 0.25,
    ...props
}) => {

    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState([]);

    const x = useSpring(useMotionValue(0), PULL_SPRING);
    const y = useSpring(useMotionValue(0), PULL_SPRING);

    const MotionComponent = motion(Component);

    const handleMouseMove = (e) => {

        if (reduceMotion || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        x.set((e.clientX - rect.left - rect.width / 2) * pullStrength);
        y.set((e.clientY - rect.top - rect.height / 2) * pullStrength);

    };

    const handleMouseLeave = () => {

        x.set(0);
        y.set(0);

    };

    const handlePointerDown = (e) => {

        const rect = ref.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const id = Date.now();

        setRipples((prev) => [
            ...prev,
            {
                id,
                size,
                left: e.clientX - rect.left - size / 2,
                top: e.clientY - rect.top - size / 2
            }
        ]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 650);

    };

    return (

        <MotionComponent
            ref={ref}
            className={`magnetic-btn ${className}`}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onPointerDown={handlePointerDown}
            {...props}
        >

            {children}

            {
                ripples.map((r) => (
                    <span
                        key={r.id}
                        className="magnetic-btn-ripple"
                        style={{ width: r.size, height: r.size, left: r.left, top: r.top }}
                    />
                ))
            }

        </MotionComponent>

    );

};

export default MagneticButton;
