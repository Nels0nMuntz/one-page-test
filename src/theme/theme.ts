import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
    typography: {    
        fontFamily: "inherit", 
        fontSize: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                fontWeight: 400,
                lineHeight: '1.625rem',
                letterSpacing: "initial",
            }
        }
    }
});