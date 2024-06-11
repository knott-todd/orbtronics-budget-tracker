export function GetCategoryUseCase({ FirestoreCategoryRepository }) {
    return {
        async execute(id) {
            const { error, result } = await FirestoreCategoryRepository.getCategory(id);
            return { error, result };
        }
    };
}
