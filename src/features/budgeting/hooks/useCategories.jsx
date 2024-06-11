import { useAuthViewModelContext } from "features/auth/presentation/contexts/AuthViewModelContext";
import { useEffect } from "react";
import { useCategoriesViewModelContext } from "../presentation/contexts/CategoriesViewModelContext";

export const useCategories = () => {

    const { categories, getCategories } = useCategoriesViewModelContext();
    const { authState } = useAuthViewModelContext();

    useEffect(() => {
        if (authState.user) {
            getCategories(authState.user.uid)
        }
    }, [])

    return categories
}