import { Navigate, useLocation } from "react-router-dom";
import HomeView from "../../../MainRouter";
import { useAuthViewModelContext } from "./contexts/AuthViewModelContext";
import LoginView from "./views/LoginView";

export default function AuthWrapper() {
    const { authState } = useAuthViewModelContext();

    const location = useLocation();

    return !authState.user && location.pathname !== "/login" && location.pathname !== "/signup" && <Navigate to="/login" />
}