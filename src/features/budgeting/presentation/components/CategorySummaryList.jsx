import { List } from "@mui/material";
import React from "react";
import CategorySummaryListItem from "./CategorySummaryListItem";

export default function CategorySummaryList({ categories, isIncome }) {


    return (
        <List>
            {categories
                .filter(category => isIncome === null ? true : category.isIncome === isIncome)
                .map(category => <CategorySummaryListItem key={category.id} category={category} />)}
        </List>
    );
}