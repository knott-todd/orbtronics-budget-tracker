import { useEffect } from "react";
import { useLogs } from "../hooks/useLogs"

export function prefillFormWithLog(setFormData, logID) {

    const logs = useLogs();

    useEffect(() => {
        const log = logs.find(currLog => currLog.id === logID)
        if(log) {
            setFormData({
                description: log.description,
                category: {id: log.categoryID, name: log.categoryName},
                absoluteAmount: log.amount,
                isIncome: log.amount >= 0
            })
        }
    }, [])

}