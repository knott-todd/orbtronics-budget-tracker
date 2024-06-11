import TextInputField from "@components/TextInputField";
import ThinSpacer from "@components/ThinSpacer";
import { Button } from "@mui/material";
import FormContainer from "layout/FormContainer";
import React from "react";
import DollarAmountInput from "./DollarAmountInput";

export default function CategoryForm({formData, setFormData, handleChange, onSubmit}) {

    function toggleIsIncomeCategory (e) {
        e.preventDefault()
        setFormData({...formData, isIncome: !formData.isIncome})
    }
    
    return (
        <FormContainer>
            {/* Form */}
            <form>

                {/* Income or Expense */}
                <Button 
                    fullWidth 
                    color={formData.isIncome ? 'success' : 'error'} 
                    onClick={toggleIsIncomeCategory}
                >
                        {formData.isIncome ? 'Income' : 'Expense'}
                </Button>

                {/* Name */}
                <TextInputField 
                    value={formData.name} 
                    handleChange={handleChange} 
                    label="Name"
                    name={'name'} />

                {/* Type dropdown */}
                {/* Removed support for percentage type, all are fixed */}
                {/* <CategoryTypesDropdown type={type} setType={setType} /> */}

                {/* Fixed amount input (show if type=fixed) */}
                {
                    formData.type === "Fixed" && (
                        <DollarAmountInput name={'amount'} absoluteAmount={formData.amount} handleChange={handleChange} />
                    )
                }

                {/* Percentage amount input (show if type=percent). (Not in use) */}
                {/* {type === "Percent" && (
                    <>
                        <label htmlFor="amount-fixed">Amount</label>
                        <div>
                            <input type="number" min={0} max={100} id="amount-fixed" value={formData.amount} onChange={e => setAmount(e.target.value)} />
                            <span>%</span>
                        </div>
                    </>
                )} */}

            </form>

            <ThinSpacer />

            {/* Save */}
            <Button fullWidth size="large" variant="contained" onClick={onSubmit}>Save</Button>
        </FormContainer>
    );
}