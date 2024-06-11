import TextInputField from "@components/TextInputField";
import ThinSpacer from "@components/ThinSpacer";
import { Button } from "@mui/material";
import FormContainer from "layout/FormContainer";
import CategoryDropdown from "./CategoryDropdown";
import LogAmountInput from "./LogAmountInput";
import MedSpacer from "@components/MedSpacer";
import React from "react";

export default function LogForm({ formData, handleChange, setFormData, onSubmit }) {

    function toggleIsIncome (e) {
        e.preventDefault()
        setFormData({...formData, isIncome: !formData.isIncome})
    }

    return (
        <FormContainer>

            <ThinSpacer />

            <form>

                {/* Income or Expense */}
                <Button 
                    fullWidth 
                    color={formData.isIncome ? 'success' : 'error'} 
                    onClick={toggleIsIncome}>
                        {formData.isIncome ? 'Income' : 'Expense'}
                </Button>

                {/* Description */}
                <TextInputField 
                    name={'description'} 
                    value={formData.description} 
                    handleChange={handleChange} 
                    label="Description" />

                {/* Type dropdown */}
                <CategoryDropdown 
                    category={formData.category} 
                    handleChange={handleChange}
                    isIncome={formData.isIncome} />

                <ThinSpacer />

                {/* Amount input */}
                <LogAmountInput
                    absoluteAmount={formData.absoluteAmount} 
                    handleChange={handleChange} 
                    isIncome={formData.isIncome} />

            </form>
                    
            <MedSpacer />

            {/* Save */}
            <Button 
                fullWidth 
                size="large" 
                variant="contained" 
                onClick={onSubmit}>Save</Button>
        </FormContainer>
    );
}