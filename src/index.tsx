import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { App } from './App';
import { store } from 'store/store';
import { theme } from './theme/theme';
// import { SnackbarProvider } from 'components';
import { SnackbarProvider } from 'notistack'

import './index.scss';

const container = document.getElementById("root");

if (!container) throw new Error("Failed to find the root element")

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    maxSnack={Infinity}
                >
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
