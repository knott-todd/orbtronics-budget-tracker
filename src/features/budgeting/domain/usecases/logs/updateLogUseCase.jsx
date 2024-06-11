export function UpdateLogUseCase({ FirestoreLogsRepository }) {
    return {
        async execute(id, categoryID, categoryName, amount, description) {
            const { error, result } = await FirestoreLogsRepository.updateLog(id, categoryID, categoryName, amount, description);
            return { error, result };
        }
    };
}
