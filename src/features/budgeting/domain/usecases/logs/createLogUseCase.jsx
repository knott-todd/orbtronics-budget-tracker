export function CreateLogUseCase({ FirestoreLogsRepository }) {
    return {
        async execute(userID, categoryID, categoryName, amount, description) {
            const { error, result } = await FirestoreLogsRepository.createLog(userID, categoryID, categoryName, amount, description);
            return { error, result };
        }
    };
}
