import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack } from "@mui/material";
import React from "react";
import DollarAmountInput from "./DollarAmountInput";

export default function LogAmountInput({ absoluteAmount, isIncome, handleChange }) {

    function togglePlusMinus(e) {
        e.preventDefault()
        handleChange({ ...e, target: { ...e.target, value: !isIncome, name: 'isIncome' } })
    }

    return (
        <Stack alignItems={'center'} direction={'row'}>
            {/* +/- toggle */}
            <Button
                sx={{ height: "50px", width: "50px" }}
                size='small'
                color={isIncome ? "success" : "error"}
                onClick={togglePlusMinus}>
                {isIncome
                    ? <FontAwesomeIcon size="lg" icon={faPlus} />
                    : <FontAwesomeIcon size="lg" icon={faMinus} />}
            </Button>

            {/* Input */}
            <DollarAmountInput absoluteAmount={absoluteAmount} handleChange={handleChange} />
        </Stack>
    );
}