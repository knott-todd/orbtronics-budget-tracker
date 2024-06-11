import { Button, Divider } from "@mui/material";
import { useCategories } from "features/budgeting/hooks/useCategories";
import React from "react";
import { Link } from "react-router-dom";
import LargeSpacer from "../../../../components/LargeSpacer";
import MedSpacer from "../../../../components/MedSpacer";
import ThinSpacer from "../../../../components/ThinSpacer";
import PageContainer from "../../../../layout/PageContainer";
import CategorySummary from "../components/CategorySummary";
import MonthSelector from "../components/MonthSelector";
import NetIncomeExpenseBalanceHeader from "../components/NetIncomeExpenseBalanceHeader";
import NewLogButton from "../components/ui/NewLogButton";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";

export default function CategorySummaryListView() {

    const { month, setMonth } = useCategoriesViewModelContext();
    const categories = useCategories();

    return (
        <PageContainer>

            <LargeSpacer />

            {/* Total balance */}
            <NetIncomeExpenseBalanceHeader />

            <Divider />

            <MedSpacer />

            {/* Month selector */}
            <MonthSelector month={month} setMonth={setMonth} />

            {/* Categories Lists */}
            <MedSpacer />
            <CategorySummary categories={categories} isIncome={false} />

            <MedSpacer />
            <CategorySummary categories={categories} isIncome={true} />

            <ThinSpacer />

            {/* Add category */}
            <Button
                fullWidth
                size="large"
                component={Link}
                to="/categories/new"
                role="link">+ Add category</Button>

            {/* Floating new entry button */}
            <NewLogButton />
        </PageContainer>
    );
}