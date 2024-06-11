import React, { useState } from "react";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import CategoryForm from "../components/forms/CategoryForm";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";

export default function NewCategoryView() {

    // Local state
    const [formData, setFormData] = useState({
        name: '',
        type: 'Fixed',
        amount: 0,
        isIncome: false
    })

    // Provided state
    const { createCategory } = useCategoriesViewModelContext();
    const { authState } = useAuthViewModelContext();

    // Handlers
    function handleCreateCategory(e) {
        e.preventDefault();

        if (authState.user) {
            createCategory(authState.user.uid, formData.name, formData.type, formData.amount, formData.isIncome)
        }
    }

    function handleChange(e) {
        populateFormWithEvent(e, setFormData)
    }

    return (
        <>

            {/* App bar */}
            <AppBarTitleAndExit title={`New ${formData.isIncome ? 'Income' : 'Expense'} Category`} />

            <CategoryForm
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                onSubmit={handleCreateCategory} />
        </>
    );
}