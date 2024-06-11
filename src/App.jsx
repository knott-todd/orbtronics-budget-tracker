import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ErrorModal from 'ErrorModal';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import MainRouter from "./MainRouter";
import './assets/global.css';
import AuthWrapper from "./features/auth/presentation/AuthWrapper";
import { AuthViewModelProvider } from "./features/auth/presentation/contexts/AuthViewModelContext";
import darkTheme from "./theme";

export default function App() {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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