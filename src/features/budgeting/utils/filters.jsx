export const filterLogsByCategoryId = (logs, categoryId) => {
    return logs.filter(log => log.categoryID === categoryId);
}