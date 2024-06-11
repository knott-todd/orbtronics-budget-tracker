import { Typography } from "@mui/material";
import React from "react";
import CategorySummaryList from "./CategorySummaryList";

const CategorySummary = ({ categories, isIncome }) => {
    return (
        <>
            <Typography variant="body2">{isIncome ? 'Income' : 'Expense'} Categories</Typography>
            <CategorySummaryList categories={categories} isIncome={isIncome} />
        </>
    );
};

export default CategorySummary;
