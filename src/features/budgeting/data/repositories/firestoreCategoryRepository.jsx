export function FirestoreCategoryRepository({ FirestoreCategoryDataSource }) {
    return {

        async createCategory(userID, name, type, value, isIncome) {
            const { result, error } = await FirestoreCategoryDataSource.createCategory(userID, name, type, value, isIncome);
            return { result, error };
        },

        async getCategory(id) {
            const { result, error } = await FirestoreCategoryDataSource.getCategory(id);
            return { result, error };
        },

        async getCategories(userID) {
            const { result, error } = await FirestoreCategoryDataSource.getCategories(userID);
            return { result, error };
        },

        async updateCategory(id, name, type, value, isIncome) {
            const { result, error } = await FirestoreCategoryDataSource.updateCategory(id, name, type, value, isIncome);
            return { result, error };
        },

        async deleteCategory(id) {
            const { result, error } = await FirestoreCategoryDataSource.deleteCategory(id);
            return { result, error };
        }
    };
}
