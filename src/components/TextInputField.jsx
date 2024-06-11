import { TextField } from "@mui/material";
import React from "react";

export default function TextInputField({ label, type=undefined, value, handleChange, required=false, name='', error=false, helperText='' }) {
    return (
        <>
            {/* <label htmlFor={label}>{label}</label>
            <br /> */}
            <TextField 
                margin='dense' 
                fullWidth 
                label={label} 
                variant="outlined" 
                id={label} 
                value={value} 
                onChange={handleChange}
                required={required}
                name={name}
                error={error}
                helperText={helperText}
                type={type ? type : ''}
            />
            {/* <br /> */}
        </>
    );
}