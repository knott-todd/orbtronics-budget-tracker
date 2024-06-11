import { useEffect } from "react";
import { useCategories } from "../hooks/useCategories";

export function prefillFormWithCategory(setFormData, categoryID) {

    const categories = useCategories();

    useEffect(() => {
        const category = categories.find(currCategory => currCategory.id === categoryID)
        if (category) {
            setFormData({ ...category, amount: category.value })
        } else {
            // TODO: HANDLE THIS
        }
    }, [categories])
}