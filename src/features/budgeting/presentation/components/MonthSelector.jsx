import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft, ArrowRightSharp } from "@mui/icons-material";
import { formatMonthYear } from "../../utils/formatters";

const MonthSelector = ({ month, setMonth }) => {

    const incrementMonth = () => {
        const newDate = new Date(month);
        newDate.setMonth(newDate.getMonth() + 1);
        setMonth(newDate);
    };

    const decrementMonth = () => {
        const newDate = new Date(month);
        newDate.setMonth(newDate.getMonth() - 1);
        setMonth(newDate);
    };

    return (
        <Stack alignItems={'center'} direction={'row'}>
            <IconButton onClick={decrementMonth}><ArrowLeft /></IconButton>
            <Typography variant="body1">{month && formatMonthYear(month)}</Typography>
            <IconButton onClick={incrementMonth}><ArrowRightSharp /></IconButton>
        </Stack>
    );
};

export default MonthSelector;
