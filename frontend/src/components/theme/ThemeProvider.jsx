import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {

    const getInitialTheme = () => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {

            return savedTheme;

        }

        return "dark";

    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {

        document.documentElement.setAttribute(

            "data-theme",

            theme

        );

        localStorage.setItem(

            "theme",

            theme

        );

    }, [theme]);

    const toggleTheme = () => {

        setTheme(

            current =>

                current === "dark"

                    ?

                    "light"

                    :

                    "dark"

        );

    };

    return (

        <ThemeContext.Provider

            value={{

                theme,

                toggleTheme,

                setTheme

            }}

        >

            {children}

        </ThemeContext.Provider>

    );

};

export default ThemeProvider;