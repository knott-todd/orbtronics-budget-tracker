import { Link, useNavigate, useParams } from "react-router-dom";
import TextInputField from "../../../../components/TextInputField";
import NewBudgetlogView from "./NewBudgetLogView";
import NewLogButton from "../components/ui/NewLogButton";
import LogListItem from "../components/LogListItem";
import { useLogsViewModelContext } from "../contexts/LogsViewModelContext";
import { useCategoriesViewModelContext } from "../contexts/CategoriesViewModelContext";
import { useEffect, useState } from "react";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import { Button, Container, Divider, Typography } from "@mui/material";
import IncomeExpenseBalanceHeader from "../components/IncomeExpenseBalanceHeader";
import MonthlyGroupedLogs from "../components/MonthlyGroupedLogs";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import React from "react";
import PageContainer from "../../../../layout/PageContainer";
import MedSpacer from "@components/MedSpacer";
import { filterLogsByCategoryId } from "features/budgeting/utils/filters";
import { useLogs } from "features/budgeting/hooks/useLogs";
import useCategory from "features/budgeting/hooks/useCategory";

export default function CategoryLogsView() {

    const { id } = useParams();
    const logs = useLogs();
    const category = useCategory(id);

    return (
        <PageContainer>
            
            {/* App bar */}
            <AppBarTitleAndExit title={category.name} editPath={`/categories/${id}/edit`}/>
            
            <MedSpacer />

            {/* Category in-out-balance */}
            <IncomeExpenseBalanceHeader 
                incomeTitle={`${category.name} Budget`} 
                expenseTitle={`${category.name} Spending`} 
                netExpenses={category.netExpenses}  
                netIncome={category.budget} 
                balance={category.balance}/>
            
            <Divider />

            {/* Month */}
            <MonthlyGroupedLogs hideCategory logs={filterLogsByCategoryId(logs, category.id)} />

            {/* Floating new entry button */}
            <NewLogButton />
        </PageContainer>
    );
}