import { Link } from "react-router-dom";
import TextInputField from "../../../../components/TextInputField";
import { useState } from "react";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import { Button, Container, MenuItem, TextField } from "@mui/material";
import DollarAmountInput from "../components/forms/DollarAmountInput";
import ThinSpacer from "../../../../components/ThinSpacer";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import CategoryTypesDropdown from "../components/forms/CategoryTypesDropdown";
import React from "react";
import CategoryForm from "../components/forms/CategoryForm";
import { populateFormWithEvent } from "utils/populateFormWithEvent";

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
    function handleCreateCategory (e) {
        e.preventDefault();

        if(authState.user) {
            createCategory(authState.user.uid, formData.name, formData.type, formData.amount, formData.isIncome)
        }
    }

    function handleChange (e) {
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