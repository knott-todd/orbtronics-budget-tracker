import { useEffect } from "react";
import { useLogsViewModelContext } from "../presentation/contexts/LogsViewModelContext";
import { useAuthViewModelContext } from "features/auth/presentation/contexts/AuthViewModelContext";

export const useLogs = () => {
    const { logs, getLogs } = useLogsViewModelContext();
    const { authState } = useAuthViewModelContext();

    useEffect(() => {
        if (authState.user) {
            getLogs(authState.user.uid);
        }
    }, []);

    useEffect(() => {
        console.log(logs)
    }, [logs])

    return logs;
};
