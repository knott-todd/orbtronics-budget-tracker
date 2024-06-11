export function DeleteCategoryUseCase({ FirestoreCategoryRepository }) {
    return {
        async execute(id) {
            const { error, result } = await FirestoreCategoryRepository.deleteCategory(id);
            return { error, result };
        }
    };
}
