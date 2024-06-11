export function FirestoreLogsRepository({ FirestoreLogsDataSource }) {
    return {

        async createLog(userID, categoryID, categoryName, amount, description) {
            const { result, error } = await FirestoreLogsDataSource.createLog(userID, categoryID, categoryName, amount, description);
            return { result, error };
        },

        async getLog(id) {
            const { result, error } = await FirestoreLogsDataSource.getLog(id);
            return { result, error };
        },

        async getLogs(userID) {
            const { result, error } = await FirestoreLogsDataSource.getLogs(userID);
            return { result, error };
        },

        async updateLog(id, categoryID, categoryName, amount, description) {
            const { result, error } = await FirestoreLogsDataSource.updateLog(id, categoryID, categoryName, amount, description);
            return { result, error };
        },

        async deleteLog(id) {
            const { result, error } = await FirestoreLogsDataSource.deleteLog(id);
            return { result, error };
        }
    };
}
