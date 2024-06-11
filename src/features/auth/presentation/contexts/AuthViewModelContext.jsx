import React, { createContext, useContext } from 'react';
import container from '../../../../DI/ioc.jsx';

// Define the default values for the context
const defaultAuthViewModel = {
    error: null,
    authState: { user: null },
    loginWithGoogle: () => Promise.resolve(),
    loginWithEmailAndPassword: () => Promise.resolve(),
    signUpWithEmailAndPassword: () => Promise.resolve(),
    logout: () => Promise.resolve()
};

// Create the context with the default values
const AuthViewModelContext = createContext(defaultAuthViewModel);

export const AuthViewModelProvider = ({ children }) => {
    const { 
        error, 
        authState, 
        loginWithGoogle, 
        loginWithEmailAndPassword, 
        signUpWithEmailAndPassword, 
        logout
    } = container.resolve("AuthViewModel");

    return (
        <AuthViewModelContext.Provider value={{ 
            error, 
            authState, 
            loginWithGoogle, 
            loginWithEmailAndPassword, 
            signUpWithEmailAndPassword, 
            logout
        }}>
            {children}
        </AuthViewModelContext.Provider>
    );
};

export const useAuthViewModelContext = () => {
    return useContext(AuthViewModelContext);
};
