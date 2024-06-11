import { Divider } from '@mui/material';
import { useLogs } from 'features/budgeting/hooks/useLogs';
import React from 'react';
import LargeSpacer from '../../../../components/LargeSpacer';
import MedSpacer from '../../../../components/MedSpacer';
import PageContainer from '../../../../layout/PageContainer';
import '../../assets/styles.css';
import MonthlyGroupedLogs from '../components/MonthlyGroupedLogs';
import NetIncomeExpenseBalanceHeader from '../components/NetIncomeExpenseBalanceHeader';
import NewLogButton from '../components/ui/NewLogButton';

export default function BudgetLogsView() {

    const logs = useLogs();

    return (
        <PageContainer>
            <LargeSpacer />

            {/* Row */}
            <NetIncomeExpenseBalanceHeader />

            <Divider />

            <MedSpacer />

            {/* Month List */}
            <MonthlyGroupedLogs logs={logs} />

            {/* Floating new entry button */}
            <NewLogButton />
        </PageContainer>
    );
}