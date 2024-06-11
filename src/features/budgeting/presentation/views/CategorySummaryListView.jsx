import { Link } from "react-router-dom";
import NewLogButton from "../components/ui/NewLogButton";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";
import { Button, Divider } from "@mui/material";
import MedSpacer from "../../../../components/MedSpacer";
import LargeSpacer from "../../../../components/LargeSpacer";
import ThinSpacer from "../../../../components/ThinSpacer";
import NetIncomeExpenseBalanceHeader from "../components/NetIncomeExpenseBalanceHeader";
import PageContainer from "../../../../layout/PageContainer";
import MonthSelector from "../components/MonthSelector";
import CategorySummary from "../components/CategorySummary";
import { useCategories } from "features/budgeting/hooks/useCategories";
import React from "react";

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