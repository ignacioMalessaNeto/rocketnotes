import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import  GlobalStyles from './styles/global';

import { Routes } from './Routes';

import theme from './styles/theme'

import { AuthProvider } from "./hooks/auth"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <GlobalStyles/>
    <AuthProvider>
    <Routes />
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
