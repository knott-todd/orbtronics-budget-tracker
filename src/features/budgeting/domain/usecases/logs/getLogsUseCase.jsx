export function GetLogsUseCase({ FirestoreLogsRepository }) {
    return {
        async execute(userID) {
            const { error, result } = await FirestoreLogsRepository.getLogs(userID);
            return { error, result };
        }
    };
}
