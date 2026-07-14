import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../theme/ThemeContext";

import "./ThemeToggle.css";

const ThemeToggle = () => {

    const { theme, toggleTheme } = useTheme();

    return (

        <button

            className={`theme-toggle ${theme}`}

            onClick={toggleTheme}

        >

            <span className="theme-icon sun">

                <FaSun />

            </span>

            <span className="theme-icon moon">

                <FaMoon />

            </span>

            <span className="theme-slider"></span>

        </button>

    );

};

export default ThemeToggle;