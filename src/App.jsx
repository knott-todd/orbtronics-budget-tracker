import './assets/global.css'
import AuthWrapper from "./features/auth/presentation/AuthWrapper";
import { AuthViewModelProvider } from "./features/auth/presentation/contexts/AuthViewModelContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MainRouter from "./MainRouter";
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorModal from 'ErrorModal';

export default function App() {
  return (
    <Box>
      <LocalizationProvider dateAdapter={ AdapterDayjs }>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ErrorBoundary FallbackComponent={ErrorModal}>
            <AuthViewModelProvider>
              <MainRouter />
              <AuthWrapper />
            </AuthViewModelProvider>
          </ErrorBoundary>
        </ThemeProvider>

      </LocalizationProvider>
    </Box> 
  )
}