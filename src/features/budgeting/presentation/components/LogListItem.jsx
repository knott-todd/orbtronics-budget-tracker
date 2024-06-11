import { faCaretDown, faCaretUp, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, ListItemButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormatter, formatCurrencyWithMaxFigures } from "../../utils/formatters";
import React from "react";

export default function LogListItem({ log, hideCategory }) {
    return (
        <ListItemButton component={Link} to={`/budget-logs/${log.id}`}>
            <Stack gap='3px' sx={{width: 1, paddingBottom: "10px"}}>
                {/* Date */}
                <Typography variant="overline">{(new Date(log.timestamp.toMillis())).toLocaleString('default', { weekday: 'short' })} {(new Date(log.timestamp.toMillis())).toLocaleString('default', { day: 'numeric' })}</Typography>

                {/* Row */}
                <Stack alignItems='center' justifyContent='space-between' direction="row">

                    <Stack alignItems='center' direction='row' gap='10px'>

                        {/* Category */}
                        {!hideCategory && <Chip size="small" variant="filled" label={log.categoryName} />}

                        {/* Description */}
                        <Typography variant="body1">{log.description}</Typography>

                    </Stack>

                    {/* Amount */}
                    <Typography variant="body1" className={log.amount < 0 ? "red" : "green"}>
                        {log.amount < 0 
                        ? <FontAwesomeIcon size="xs" icon={faCaretDown} /> 
                        : <FontAwesomeIcon size="xs" icon={faCaretUp} />}
                        {" " + formatCurrencyWithMaxFigures(Math.abs(log.amount), 5)} 
                    </Typography>

                    
                </Stack>

            </Stack>

        </ListItemButton>
    );
}

LogListItem.defaultProps = {
    hideCategory: false,
};