import * as createPalette from '@mui/system/createTheme/createBreakpoints';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: true;
        md: true;
        lg: true;
        xl: false;
    }
}