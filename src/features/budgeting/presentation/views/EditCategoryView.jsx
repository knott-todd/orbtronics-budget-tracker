import { prefillFormWithCategory } from "features/budgeting/utils/prefillFormWithCategory";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import CategoryForm from "../components/forms/CategoryForm";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";

export default function EditCategoryView() {

    // URL Params
    const { id } = useParams();

    // Local state
    const [formData, setFormData] = useState({
        name: '',
        type: 'Fixed',
        amount: 0,
        isIncome: false
    })

    // Provided state
    const { updateCategory, deleteCategory } = useCategoriesViewModelContext();

    // Util
    prefillFormWithCategory(setFormData, id)

    // Handlers
    function handleUpdateCategory(e) {
        e.preventDefault()
        updateCategory(id, formData.name, formData.type, formData.amount, formData.isIncome)
    }

    function handleDelete(e) {
        e.preventDefault()
        deleteCategory(id)
    }

    function handleChange(e) {
        populateFormWithEvent(e, setFormData)
    }

    return (
        <>

            {/* App bar */}
            <AppBarTitleAndExit title={`Edit ${formData.name}`} handleDelete={handleDelete} />

            <CategoryForm
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                onSubmit={handleUpdateCategory} />

        </>
    );
}