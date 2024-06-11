export function UpdateCategoryUseCase({ FirestoreCategoryRepository }) {
    return {
        async execute(id, name, type, value, isIncome) {
            const { error, result } = await FirestoreCategoryRepository.updateCategory(id, name, type, value, isIncome);
            return { error, result };
        }
    };
}
