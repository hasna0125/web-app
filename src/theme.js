import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";




export const tokens = (mode) => ({
    ...(mode === 'dark' 
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#000000",
                400: "#858585",
                500: "#666666",
                // 600: "#525252",
                600: "#e0e0e0",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#ffffff",
                // 200: "#999999",
                200: "#fcfcfc",
                300: "#666666",
                400: "#333333",
                // 500: "#333333",
                500: "#161616",
                600: "#fcfcfc",
                700: "#000000",
                800: "#0A0A0A",
                900: "#000000"
            },
            red: {
                100: "#ffe1e1",
                200: "#ffc4c4",
                // 300: "#ffa6a6",
                300: "#FB9595",
                400: "#ff8989",
                500: "#ff6b6b",
                600: "#cc5656",
                700: "#994040",
                800: "#020539",
                900: "#331515"
            },
            yellow: {
                100: "#ffefde",
                200: "#ffdebe",
                300: "#ffce9d",
                400: "#ffbd7d",
                500: "#ffad5c",
                600: "#cc8a4a",
                700: "#996837",
                800: "#4E453E",
                // 900: "#646F66"
                900: "#6C6C6C"
            },
            green: {
                100: "#ced7d0",
                200: "#9cb0a1",
                300: "#6b8871",
                400: "#396142",
                // 500: "#083913",
                500: "#d5f6dc",
                600: "#062e0f",
                700: "#d5f6dc",
                800: "#031708",
                900: "#020b04"
            },
        }
        : {
            grey: {
                100: "#000000",
                // 200: "#292929",
                200: "#000000",
                300: "#000000",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                // 900: "#e0e0e0",
                900: "#F5F5F5",
            },
            primary: {
                100: "#000000",
                200: "#000000",
                300: "#000000",
                400: "#000000",
                // 500: "#cccccc",
                // 500: "#E9E4E4",
                500: "#F3EFEF",
                600: "#0E0E0E",
                700: "#666666",
                800: "#999999",
                900: "#fcfcfc",
            },
            red: {
                100: "#331515",
                200: "#662b2b",
                300: "#FB9595",
                400: "#cc5656",
                500: "#ff6b6b",
                600: "#ff8989",
                700: "#ffa6a6",
                800: "#A5DCF6",
                900: "#ffe1e1",
            },
            yellow: {
                100: "#332312",
                200: "#664525",
                300: "#996837",
                400: "#cc8a4a",
                500: "#ffad5c",
                600: "#ffbd7d",
                700: "#ffce9d",
                800: "#ffdebe",
                900: "#ffefde",
            },
            green: {
                100: "#020b04",
                200: "#031708",
                300: "#05220b",
                400: "#062e0f",
                500: "#083913",
                600: "#396142",
                700: "#d5f6dc",
                800: "#9cb0a1",
                900: "#ced7d0",
            },
        }
        )
}); 

export const theemSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' 
                ? {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.green[700],
                        sub_one: colors.red[500],
                        sub_two: colors.green[700],
                        sub_three: colors.yellow[700]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[800],
                    }
                }
                : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.green[500],
                        sub_one: colors.red[500],
                        sub_two: colors.green[500],
                        sub_three: colors.yellow[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    }
                }
                )
        },
        typography: {
            fontFamily: ['Work Sans', 'sans-serif'].join(','),
            fontSize: 15,
            h1: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 40,              
            },
            h2: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 32,              
            },
            h3: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 24,              
            },
            h4: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 20,              
            },
            h5: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 16,              
            },
            h6: {
                fontFamily: ['Work Sans', 'sans-serif'].join(','),
                fontSize: 14,              
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});


export const useMode = () => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo (
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "dark" ? "light" : "dark")),
        }), 
        []
    );
    const theme = useMemo (() =>createTheme(theemSettings(mode)), [mode]);

    return [theme, colorMode];
}


