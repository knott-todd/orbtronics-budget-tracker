import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function DollarAmountInput({ absoluteAmount, handleChange, name = 'absoluteAmount' }) {
    return (
        <TextField
            margin="dense"
            fullWidth
            sx={{ flexGrow: 1 }}
            type="number"
            label="Amount"
            name={name}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            value={absoluteAmount ? Math.abs(absoluteAmount) : ''}
            onChange={handleChange}
        />
    );
}