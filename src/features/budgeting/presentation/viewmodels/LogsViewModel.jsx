import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateNetExpensesOnLogs, calculateNetIncomeOnLogs } from '../../utils/calculateIncomeExpense';
import { useErrorBoundary } from 'react-error-boundary';

export default function LogsViewModel({
    GetLogsUseCase,
    GetLogUseCase,
    CreateLogUseCase,
    UpdateLogUseCase,
    DeleteLogUseCase
}) {
    // State
    const [logs, setLogs] = useState([]);
    const [log, setLog] = useState(null);
    const [error, setError] = useState("");
    const [stream, setStream] = useState();
    const [netIncome, setNetIncome] = useState(0);
    const [netExpenses, setNetExpenses] = useState(0);
    const [balance, setBalance] = useState(0);

    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        // Cleanup function to unsubscribe from the stream
        return () => {
            if(stream) {
                stream.unsubscribe();
            }
        };
    }, [])

    // Calculate net income, expense, and balance
    useEffect(() => {
        if(logs.length > 0) {
            const _netIncome = calculateNetIncomeOnLogs(logs)
            const _netExpenses = calculateNetExpensesOnLogs(logs)
            setNetIncome(_netIncome)
            setNetExpenses(_netExpenses)
            setBalance(_netIncome + _netExpenses)

        }
    }, [logs])


    const navigate = useNavigate();

    // Fetch all logs
    async function getLogs(userID) {

        if (stream) {

            console.log("Stream already running")

        } else {
            const { result, error } = await GetLogsUseCase.execute(userID);
            setError(error);

            if(error) {
                showBoundary(error)
            }

            if (result) {
                // Unsubscribe from the previous stream if it exists
                // if (stream) {
                //     // stream.unsubscribe();
                // } {
    
                // Subscribe to the logs stream
                const subscription = result.subscribe(newLogs => {
                    setLogs(newLogs);
                });
    
                setStream(subscription);

                // }
                // setLogs(result.map(_log => ({..._log, date: new Date(_log.timestamp.toMillis())})));
            }

        }
    }

    // Fetch a single log
    async function getLog(logID) {
        const { result, error } = await GetLogUseCase.execute(logID);
        setError(error);
        if(error) {
            showBoundary(error)
        }
        if (result) {
            setLog(result);
        }
    }

    // Create a new log
    async function createLog(userID, categoryID, categoryName, amount, description) {
        const { result, error } = await CreateLogUseCase.execute(userID, categoryID, categoryName, amount, description);
        setError(error);
        if(error) {
            showBoundary(error)
        }
        if (result) {
            // setLogs([...logs, result]);
            navigate(-1)
        }
    }

    // Update a log
    async function updateLog(id, categoryID, categoryName, amount, description) {
        const { result, error } = await UpdateLogUseCase.execute(id, categoryID, categoryName, amount, description);
        setError(error);
        if(error) {
            showBoundary(error)
        }
        if (result) {
            // setLogs(logs.map(log => log.id === id ? result : log));
            navigate(-1)
        }
    }

    // Delete a log
    async function deleteLog(logID) {
        const { result, error } = await DeleteLogUseCase.execute(logID);
        setError(error);
        if(error) {
            showBoundary(error)
        }
        if (result) {
            // setLogs(logs.filter(log => log.id !== logID));
            navigate(-1)
        }
    }

    return {
        logs,
        log,
        netExpenses,
        netIncome,
        balance,
        error,
        getLogs,
        getLog,
        createLog,
        updateLog,
        deleteLog
    };
}
