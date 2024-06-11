export function CreateCategoryUseCase({ FirestoreCategoryRepository }) {
    return {
        async execute(userID, name, type, value, isIncome) {
            const { error, result } = await FirestoreCategoryRepository.createCategory(userID, name, type, value, isIncome);
            return { error, result };
        }
    };
}
