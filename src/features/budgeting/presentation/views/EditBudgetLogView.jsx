import { Link, useParams } from "react-router-dom";
import TextInputField from "../../../../components/TextInputField";
import { useEffect, useState } from "react";
import { useLogsViewModelContext } from "../contexts/LogsViewModelContext";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import { AppBar, Button, Container, Divider, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import LargeSpacer from "../../../../components/LargeSpacer";
import MedSpacer from "../../../../components/MedSpacer";
import ThinSpacer from "../../../../components/ThinSpacer";
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowBack } from "@mui/icons-material";
import CategoryDropdown from "../components/forms/CategoryDropdown";
import LogAmountInput from "../components/forms/LogAmountInput";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import { useCategories } from "features/budgeting/hooks/useCategories";
import { prefillFormWithLog } from "features/budgeting/utils/prefillFormWithLog";
import FormContainer from "layout/FormContainer";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import LogForm from "../components/forms/LogForm";


export default function EditBudgetlogView() {

    // URL params
    const { id } = useParams()

    // Local state
    const [formData, setFormData] = useState({
        description: '',
        category: {id: '', name: ''},
        absoluteAmount: 0,
        isIncome: false
    })

    // Provided state
    const { updateLog, deleteLog } = useLogsViewModelContext();

    // Util
    prefillFormWithLog(setFormData, id);

    // Handlers
    function handleUpdate (e) {

        e.preventDefault();
        updateLog(id, formData.category.id, formData.category.name, (formData.absoluteAmount * (formData.isIncome ? 1 : -1)), formData.description)

    }

    function handleDelete (e) {
        e.preventDefault();
        deleteLog(id);
    }

    function handleChange(e) {
        populateFormWithEvent(e, setFormData)
    }

    
    return (
        <>
                
            {/* App bar */}
            <AppBarTitleAndExit title={'Edit Log'} handleDelete={handleDelete} />
            
            {/* Form */}
            <LogForm 
                formData={formData} 
                handleChange={handleChange} 
                setFormData={setFormData}
                onSubmit={handleUpdate} />
        </>
    );
}