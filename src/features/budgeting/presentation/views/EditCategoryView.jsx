import { Link, useNavigate, useParams } from "react-router-dom";
import TextInputField from "../../../../components/TextInputField";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import CategoryTypesDropdown from "../components/forms/CategoryTypesDropdown";
import DollarAmountInput from "../components/forms/DollarAmountInput";
import ThinSpacer from "../../../../components/ThinSpacer";
import FormContainer from "layout/FormContainer";
import { prefillFormWithCategory } from "features/budgeting/utils/prefillFormWithCategory";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import React from "react";
import CategoryForm from "../components/forms/CategoryForm";

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
    function handleUpdateCategory (e) {
        e.preventDefault()
        updateCategory(id, formData.name, formData.type, formData.amount, formData.isIncome)
    }

    function handleDelete (e) {
        e.preventDefault()
        deleteCategory(id)
    }

    function handleChange (e) {
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