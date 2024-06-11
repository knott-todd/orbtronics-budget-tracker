import { useAuthViewModelContext } from "features/auth/presentation/contexts/AuthViewModelContext";
import { useCategoriesViewModelContext } from "../presentation/contexts/CategoriesViewModelContext";
import { useEffect } from "react";

export const useCategories = () => {

    const { categories, getCategories } = useCategoriesViewModelContext();
    const { authState } = useAuthViewModelContext();

    useEffect(() => {
        if(authState.user) {
            getCategories(authState.user.uid)
        }
    }, [])

    return categories
}