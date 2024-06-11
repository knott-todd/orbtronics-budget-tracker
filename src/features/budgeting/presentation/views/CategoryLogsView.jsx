import MedSpacer from "@components/MedSpacer";
import { Divider } from "@mui/material";
import useCategory from "features/budgeting/hooks/useCategory";
import { useLogs } from "features/budgeting/hooks/useLogs";
import { filterLogsByCategoryId } from "features/budgeting/utils/filters";
import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../../../layout/PageContainer";
import AppBarTitleAndExit from "../components/AppBarTitleAndExit";
import IncomeExpenseBalanceHeader from "../components/IncomeExpenseBalanceHeader";
import MonthlyGroupedLogs from "../components/MonthlyGroupedLogs";
import NewLogButton from "../components/ui/NewLogButton";

export default function CategoryLogsView() {

    const { id } = useParams();
    const logs = useLogs();
    const category = useCategory(id);

    return (
        <PageContainer>

            {/* App bar */}
            <AppBarTitleAndExit title={category.name} editPath={`/categories/${id}/edit`} />

            <MedSpacer />

            {/* Category in-out-balance */}
            <IncomeExpenseBalanceHeader
                incomeTitle={`${category.name} Budget`}
                expenseTitle={`${category.name} Spending`}
                netExpenses={category.netExpenses}
                netIncome={category.budget}
                balance={category.balance} />

            <Divider />

            {/* Month */}
            <MonthlyGroupedLogs hideCategory logs={filterLogsByCategoryId(logs, category.id)} />

            {/* Floating new entry button */}
            <NewLogButton />
        </PageContainer>
    );
}