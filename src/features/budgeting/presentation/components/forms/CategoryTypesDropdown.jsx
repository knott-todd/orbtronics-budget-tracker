import { MenuItem, TextField } from "@mui/material";
import React from "react";

export default function CategoryTypesDropdown({ setType, type }) {
    return (

        <TextField
            margin="dense"
            select
            fullWidth
            label="Type"
            value={type}
            onChange={e => setType(e.target.value)}>
            <MenuItem value="">Select a type</MenuItem>
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Percent">Percent</MenuItem>
        </TextField>
    );
}