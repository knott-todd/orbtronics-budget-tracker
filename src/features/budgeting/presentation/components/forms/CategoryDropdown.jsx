import { MenuItem, TextField } from "@mui/material";
import { useCategories } from "features/budgeting/hooks/useCategories";
import React from "react";

export default function CategoryDropdown({ category, handleChange, isIncome }) {

    const categories = useCategories();

    function handleCategoryDropdown(e) {

        const selectedCategory = categories.find(currCategory => currCategory.id === e.target.value);
        handleChange({ ...e, target: { ...e.target, value: selectedCategory } });

    }

    return (
        <TextField name="category" margin="dense" select fullWidth label="Category" id="categories" value={category ? category.id : ""} onChange={handleCategoryDropdown}>
            {categories.filter(currCategory => currCategory.isIncome === isIncome).map(currCategory => (
                <MenuItem key={currCategory.id} value={currCategory.id}>{currCategory.name}</MenuItem>
            ))}
        </TextField>
    );
}