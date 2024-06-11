import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import MedSpacer from "../../../../components/MedSpacer";
import { formatCurrencyWithMaxFigures } from "../../utils/formatters";

export default function IncomeExpenseBalanceHeader({ incomeTitle, expenseTitle, netIncome, netExpenses, balance }) {

    return (
        <>
            <Stack
                direction={'row'}
                divider={<Divider orientation='vertical' flexItem />}
                spacing={{ xs: 2, sm: 5, lg: 10 }}
                alignItems={'flex-end'}
                justifyContent={'center'}>

                {/* Column */}
                <Stack alignItems={'center'} justifyContent={'center'} >
                    {/* Money in */}
                    <Typography sx={{ textAlign: 'center', width: '100%', lineHeight: 1.8, marginBottom: 0.8 }} variant='overline'>{incomeTitle}</Typography>

                    {/* Amount */}
                    <Typography className='green' variant='body1'>{formatCurrencyWithMaxFigures(netIncome, 5)}</Typography>

                </Stack>

                {/* Column */}
                <Stack alignItems={'center'} justifyContent={'center'} >
                    {/* Money in */}
                    <Typography sx={{ textAlign: 'center', width: '100%', lineHeight: 1.8, marginBottom: 0.8 }} variant='overline'>{expenseTitle}</Typography>

                    {/* Amount */}
                    <Typography className='red' variant='body1'>{formatCurrencyWithMaxFigures(Math.abs(netExpenses), 5)}</Typography>

                </Stack>

                {/* Column */}
                <Stack alignItems={'center'} justifyContent={'center'} >
                    {/* Balance */}
                    <Typography sx={{ textAlign: 'center', width: '100%', lineHeight: 1.8, marginBottom: 0.8 }} variant='overline'>Balance</Typography>

                    {/* Amount */}
                    <Typography className={balance < 0 ? 'red' : 'green'} variant='body1'>{formatCurrencyWithMaxFigures(Math.abs(balance), 5)}</Typography>

                </Stack>

            </Stack>

            <MedSpacer />
        </>
    );
}