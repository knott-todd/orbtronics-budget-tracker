import React, { createContext, useContext } from 'react';
import container from '../../../../DI/ioc';

const defaultLogsViewModel = {
    logs: [],
    log: null,
    netIncome: 0,
    netExpenses: 0,
    balance: 0,
    error: null,
    getLogs: () => Promise.resolve(),
    getLog: () => Promise.resolve(),
    createLog: () => Promise.resolve(),
    updateLog: () => Promise.resolve(),
    deleteLog: () => Promise.resolve()
};

const LogsViewModelContext = createContext(defaultLogsViewModel);

export const LogsViewModelProvider = ({ children }) => {
    const {
        logs,
        log,
        netIncome,
        netExpenses,
        balance,
        error,
        getLogs,
        getLog,
        createLog,
        updateLog,
        deleteLog
    } = container.resolve('LogsViewModel');

    return (
        <LogsViewModelContext.Provider value={{
            logs,
            log,
            netIncome,
            netExpenses,
            balance,
            error,
            getLogs,
            getLog,
            createLog,
            updateLog,
            deleteLog
        }}>
            {children}
        </LogsViewModelContext.Provider>
    );
};

export const useLogsViewModelContext = () => {
    return useContext(LogsViewModelContext);
};
