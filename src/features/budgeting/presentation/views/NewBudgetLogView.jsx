import { useLogsViewModelContext } from "../contexts/LogsViewModelContext";
import { useState } from "react";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import { useAuthViewModelContext } from "features/auth/presentation/contexts/AuthViewModelContext";
import LogForm from "../components/forms/LogForm";
import React from "react";
import { populateFormWithEvent } from "utils/populateFormWithEvent";

export default function NewBudgetlogView() {

    // Local state
    const [formData, setFormData] = useState({
        description: '',
        category: {id: '', name: ''},
        absoluteAmount: 0,
        isIncome: false
    })

    // Provided state
    const { createLog } = useLogsViewModelContext();
    const { authState } = useAuthViewModelContext();
     
    // Handlers
    function handleSave (e) {
        e.preventDefault();

        if (authState.user) {
            createLog(authState.user.uid, 
                formData.category.id, 
                formData.category.name, 
                (formData.absoluteAmount * (formData.isIncome ? 1 : -1)), 
                formData.description)
        }

    }

    function handleChange(e) {
        populateFormWithEvent(e, setFormData)
    }

    return (
        <>
            {/* App bar */}
            <AppBarTitleAndExit title={`New ${formData.isIncome ? 'Income' : 'Expense'} log`} />
            
            {/* Form */}
            <LogForm 
                formData={formData} 
                handleChange={handleChange} 
                setFormData={setFormData}
                onSubmit={handleSave} />
        </>
    );
}