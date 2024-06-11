export function calculateNetIncomeOnLogs(logs) {
    return logs.reduce((sum, currLog) => sum + (currLog.amount < 0 ? 0 : currLog.amount), 0)
}

export function calculateNetExpensesOnLogs(logs) {
    return logs.reduce((sum, currLog) => sum + (currLog.amount < 0 ? currLog.amount : 0), 0)
}