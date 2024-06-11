import '../../assets/styles.css'
import NewLogButton from '../components/ui/NewLogButton';
import { Divider } from '@mui/material';
import LargeSpacer from '../../../../components/LargeSpacer';
import MedSpacer from '../../../../components/MedSpacer';
import NetIncomeExpenseBalanceHeader from '../components/NetIncomeExpenseBalanceHeader';
import MonthlyGroupedLogs from '../components/MonthlyGroupedLogs';
import React from 'react';
import PageContainer from '../../../../layout/PageContainer';
import { useLogs } from 'features/budgeting/hooks/useLogs';

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