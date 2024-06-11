import React, { useEffect } from "react";
import { useAuthViewModelContext } from "../../../auth/presentation/contexts/AuthViewModelContext";
import { useLogsViewModelContext } from "../contexts/LogsViewModelContext";
import IncomeExpenseBalanceHeader from "./IncomeExpenseBalanceHeader";

export default function NetIncomeExpenseBalanceHeader() {

    const { netIncome, netExpenses, getLogs, balance } = useLogsViewModelContext();
    const { authState } = useAuthViewModelContext();

    useEffect(() => {
        if (authState.user) {
            getLogs(authState.user.uid);
        }
    }, []);

    return (
        <IncomeExpenseBalanceHeader
            incomeTitle={'Money In'}
            expenseTitle={'Money Out'}
            netExpenses={netExpenses}
            netIncome={netIncome}
            balance={balance} />
    );
}