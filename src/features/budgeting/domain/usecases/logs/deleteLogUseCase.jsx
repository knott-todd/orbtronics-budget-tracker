export function DeleteLogUseCase({ FirestoreLogsRepository }) {
    return {
        async execute(id) {
            const { error, result } = await FirestoreLogsRepository.deleteLog(id);
            return { error, result };
        }
    };
}
