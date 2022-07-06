import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
    palette: {
        common: {
            white: "#FFFFFF",
        },
        primary: {
            main: "#F4E041",
            
        },
        secondary: {
            main: "#00BDD3",
        },
        action: {
            hover: "#FFE302",
            disabled: "#B4B4B4",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "#7E7E7E",
        },
        background: {
            default: "#F8F8F8",
            paper: "#FFFFFF",
        },

    },
    breakpoints: {
        values: {
            xs: 375,
            sm: 576,
            md: 768,
            lg: 1024,
            xl: 1199,
        },
    },
    typography: {    
        fontFamily: "inherit",    
        h1: {
            fontSize: "2.5rem",
            fontWeight: 400,
            lineHeight: "2.5rem",
            letterSpacing: "initial",
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "1.625rem",
            letterSpacing: "initial",
        }
    },
});