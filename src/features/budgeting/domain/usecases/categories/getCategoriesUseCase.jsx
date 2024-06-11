export function GetCategoriesUseCase({ FirestoreCategoryRepository }) {
    return {
        async execute(userID) {
            const { error, result } = await FirestoreCategoryRepository.getCategories(userID);
            return { error, result };
        }
    };
}
