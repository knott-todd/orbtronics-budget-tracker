import { Navigate, useLocation } from "react-router-dom";
import { useAuthViewModelContext } from "./contexts/AuthViewModelContext";

export default function AuthWrapper() {
    const { authState } = useAuthViewModelContext();

    const location = useLocation();

    return !authState.user && location.pathname !== "/login" && location.pathname !== "/signup" && <Navigate to="/login" />
}