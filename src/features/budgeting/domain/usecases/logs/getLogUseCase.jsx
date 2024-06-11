export function GetLogUseCase({ FirestoreLogsRepository }) {
    return {
        async execute(id) {
            const { error, result } = await FirestoreLogsRepository.getLog(id);
            return { error, result };
        }
    };
}
