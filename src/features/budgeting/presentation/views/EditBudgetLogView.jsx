import { prefillFormWithLog } from "features/budgeting/utils/prefillFormWithLog";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import LogForm from "../components/forms/LogForm";
import { useLogsViewModelContext } from "../contexts/LogsViewModelContext";


export default function EditBudgetlogView() {

    // URL params
    const { id } = useParams()

    // Local state
    const [formData, setFormData] = useState({
        description: '',
        category: { id: '', name: '' },
        absoluteAmount: 0,
        isIncome: false
    })

    // Provided state
    const { updateLog, deleteLog } = useLogsViewModelContext();

    // Util
    prefillFormWithLog(setFormData, id);

    // Handlers
    function handleUpdate(e) {

        e.preventDefault();
        updateLog(id, formData.category.id, formData.category.name, (formData.absoluteAmount * (formData.isIncome ? 1 : -1)), formData.description)

    }

    function handleDelete(e) {
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