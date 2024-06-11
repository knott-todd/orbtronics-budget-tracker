import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function AuthViewModel({ LoginWithGoogleUseCase, LoginWithEmailAndPasswordUseCase, SignUpWithEmailAndPasswordUseCase, LogoutUseCase }) {

    // State
    const [error, setError] = useState({});
    const [authState, setAuthState] = useState({});

    const navigate = useNavigate()

    const { showBoundary } = useErrorBoundary();

    // Expose use cases
    async function loginWithGoogle() {
        const { result, error } = await LoginWithGoogleUseCase.execute()

        setError(error)
        if (result) {
            setAuthState(result)
            navigate("/categories")
        }
    }

    async function loginWithEmailAndPassword(email, password) {
        const { result, error } = await LoginWithEmailAndPasswordUseCase.execute(email, password);

        if (error) {
            // Handle specific error codes
            switch (error.code) {
                case 'auth/invalid-credential':
                    setError({ password: 'Incorrect email or password' })
                    break;
                case 'auth/too-many-requests':
                    setError({ password: 'Too many unsuccesful attempts. Please try again later.' })
                default:
                    setError({ unexpected: 'An unexpected error has occured' })
                    showBoundary(error)
            }
        }
        if (result) {
            setAuthState(result);
            navigate("/categories")
        }
    }

    async function signUpWithEmailAndPassword(email, password) {
        const { result, error } = await SignUpWithEmailAndPasswordUseCase.execute(email, password);

        if (error) {
            // Handle specific error codes
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError({ email: 'Email already in use' })
                    break;
                case 'auth/weak-password':
                    setError({ password: 'Password is not strong enough' })
                default:
                    setError({ unexpected: 'An unexpected error has occured' })
            }
        }
        if (result) {
            setAuthState(result);
            navigate("/categories")
        }
    }

    async function logout() {
        const { result, error } = await LogoutUseCase.execute();

        setError(error);
        if (result) {
            setAuthState({});
        }
    }

    return {
        error,
        authState,
        loginWithGoogle,
        loginWithEmailAndPassword,
        signUpWithEmailAndPassword,
        logout
    }

}