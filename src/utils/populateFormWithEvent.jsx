export async function populateFormWithEvent (e, setFormData) {
    const { name, value } = e.target;

    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
}