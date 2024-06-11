import { ListItemButton, Stack, Typography, LinearProgress, Divider } from "@mui/material";
import { formatCurrencyWithMaxFigures } from "features/budgeting/utils/formatters";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CategorySummaryListItem({ category }) {
    useEffect(() => {
        console.log(category)
    }, [category])
    return (
        <>
            <ListItemButton component={Link} to={`/categories/${category.id}`}>
                
                <Stack gap={"5px"} sx={{width: 1}} direction="row">
                    {/* Column */}
                    <Stack justifyContent='space-between' sx={{flexGrow: 1}}>

                        {/* Category name */}
                        <Typography variant="body1">{category.name}</Typography>

                        {category.isIncome ? (
                            <>
                                {/* Actual/expected income progress bar */}
                                <LinearProgress 
                                    sx={{height: 10}} 
                                    variant="determinate" 
                                    value={Math.min(Math.abs(category.netIncome), category.budget) / category.budget * 100}  />
                            </>

                        ) : (
                            <>
                                {/* Category balance progress bar */}
                                <LinearProgress 
                                sx={{height: 10}} 
                                variant="determinate" 
                                value={Math.min(Math.abs(category.netExpenses), category.budget) / category.budget * 100} />
                            </>
                        )}

                    </Stack>

                    {/* Column */}
                    <Stack sx={{width: "95px"}} divider={<Divider  sx={{width: 0.55}} aria-hidden="true" />} alignItems='flex-end'>

                        {
                            category.isIncome
                            ? (
                                <>
                                    {/* Actual income */}
                                    {category.budget && <Typography className={(category.netIncome > category.budget ? 'green' : '')} variant="body1">{formatCurrencyWithMaxFigures(category.netIncome, 4)}</Typography>}

                                    {/* Expected income */}
                                    {category.budget && <Typography sx={{color: "grey"}} variant="body2">{formatCurrencyWithMaxFigures(category.budget, 4)}</Typography>}
            
                                </>
                            ) : (
                                <>
                                    {/* Remaining balance */}
                                    {category.balance && <Typography className={(category.balance < 0 ? 'red' : '')} variant="body1">{formatCurrencyWithMaxFigures(category.balance, 4)} left</Typography>}

                                    {/* Category budget */}
                                    {category.budget && <Typography sx={{color: "grey"}} variant="body2">{formatCurrencyWithMaxFigures(category.budget, 4)}</Typography>}
        
                                </>
                            )
                        }
                    </Stack>
                </Stack>

            </ListItemButton>

            {/* Divider */}
            <Divider aria-hidden="true" component="li" variant="middle" flexItem/>
        </>
    );
}