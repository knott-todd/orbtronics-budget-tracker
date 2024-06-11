import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from "@mui/material";
import LogListItem from "./LogListItem";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

export default function MonthlyGroupedLogs({ logs, hideCategory=undefined }) {

    const [groupedLogs, setGroupedLogs] = useState({});
    const [sortedMonthYears, setSortedMonthYears] = useState([]);

    useEffect(() => {
        const grouped = groupLogsByMonthYear(logs);

        // Sort the month years in descending order
        const sortedMonths = Object.keys(grouped).sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime(); // Reverse order for descending
        });

        setGroupedLogs(grouped);
        setSortedMonthYears(sortedMonths);
    }, [logs]);

    function groupLogsByMonthYear(logs) {
        const groupedLogs = {};
    
        logs.forEach(log => {
            const date = new Date(log.timestamp.toMillis());
            const monthYear = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`; // YYYY-MM format
    
            if (!groupedLogs[monthYear]) {
                groupedLogs[monthYear] = [];
            }
    
            groupedLogs[monthYear].push(log);
        });
    
        return groupedLogs;
    }

    function formatMonthYear(monthYear) {
        const [year, month] = monthYear.split('-').map(Number);
        const date = new Date(year, month - 1);
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const formattedMonth = formatter.format(date);
        const formattedYear = `'${year.toString().slice(-2)}`;
        return `${formattedMonth} ${formattedYear}`;
    }

    return (
        
        <div className="expanded scrollable">
            <List>
                {sortedMonthYears.map((monthYear, i) => (
                    <Accordion disableGutters defaultExpanded={i === 0} elevation={0} sx={{margin: 0, root: {height: '15px'}}} key={monthYear}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${monthYear}-content`}
                            id={`${monthYear}-header`}
                            
                        >
                            <Typography>{formatMonthYear(monthYear)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            {/* Logs list */}
                            <List>
                                {groupedLogs[monthYear].map(log => (
                                    <LogListItem hideCategory={hideCategory} key={log.id} log={log} />
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </div>
    );
}