import { useLogs } from 'features/budgeting/hooks/useLogs';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { calculateNetExpensesOnLogs, calculateNetIncomeOnLogs } from '../../utils/calculateIncomeExpense';

// Role: Maintain communication (data binding) between domain and views, i.e. state management + use cases
export default function CategoriesViewModel({
    GetCategoriesUseCase,
    GetCategoryUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase
}) {
    // State
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState("");
    const [stream, setStream] = useState();
    const [month, setMonth] = useState(new Date())

    const navigate = useNavigate();

    const logs = useLogs();
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        // Cleanup function to unsubscribe from the stream
        return () => {
            if (stream) {
                stream.unsubscribe();
            }
        };
    }, [stream])

    // Calculate net incomes, expenses, and balances
    useEffect(() => {
        setCategoriesWithClientSideAggregation();
    }, [logs, month]);

    // Calculate income, expense, and balance on client side
    function setCategoriesWithClientSideAggregation(newCategories) {
        // If there are no logs and newCategories are provided, just set the newCategories
        if (logs.length === 0) {
            if (newCategories) {
                setCategories(newCategories);
            }
            return;
        }

        // Determine which categories to aggregate: either newCategories or existing categories
        const categoriesToAggregate = newCategories ? newCategories : categories;

        // If there are no categories to aggregate, return early
        if (!categoriesToAggregate.length) {
            return;
        }

        // Map through each category and calculate the net income, net expenses, and balance
        const updatedCategories = categoriesToAggregate.map(_category => {

            // Filter logs to get only those that belong to the current category and are in the current month
            const categoryLogs = logs.filter(log => {
                const logDate = log.timestamp.toDate();
                return log.categoryID === _category.id && logDate.getMonth() === month.getMonth() && logDate.getFullYear() === month.getFullYear();
            });

            // Calculate net income and net expenses for the current category
            const netIncome = calculateNetIncomeOnLogs(categoryLogs);
            const netExpenses = calculateNetExpensesOnLogs(categoryLogs);

            // Calculate the balance as the sum of net expenses and the category's value
            const balance = netExpenses + _category.value;
            const budget = _category.value;

            // Return the updated category with calculated fields
            return { ..._category, balance, netExpenses, budget, netIncome };
        });

        // Set the updated categories state
        setCategories(updatedCategories);
    }


    // get all categories
    async function getCategories(userID) {
        if (!stream) {
            const { result, error } = await GetCategoriesUseCase.execute(userID);
            setError(error);
            if (error) {
                showBoundary(error)
            }
            if (result) {

                // Subscribe to the categories stream
                const subscription = result.subscribe(newCategories => {
                    setCategoriesWithClientSideAggregation(newCategories);
                });

                setStream(subscription);
            }
        }
    }

    // get a single category
    async function getCategory(categoryID) {
        const { result, error } = await GetCategoryUseCase.execute(categoryID);
        setError(error);
        if (error) {
            showBoundary(error)
        }
        if (result) {
            setCategory(result);
        }
    }

    // Create a new category
    async function createCategory(userID, name, type, value, isIncome) {
        const { result, error } = await CreateCategoryUseCase.execute(userID, name, type, parseInt(value), isIncome);
        setError(error);
        if (error) {
            showBoundary(error)
        }
        if (result) {
            console.log(result)
            navigate(-1)
            // setCategories(categories => [...categories, result]);
        }
    }

    // Update a category
    async function updateCategory(categoryID, name, type, value, isIncome) {
        const { result, error } = await UpdateCategoryUseCase.execute(categoryID, name, type, parseInt(value), isIncome);
        setError(error);
        if (error) {
            showBoundary(error)
        }
        if (result) {
            navigate(-1)
            // setCategories(categories => categories.map(category => category.id === categoryID ? result : category));
        }
    }

    // Delete a category
    async function deleteCategory(categoryID) {
        const { result, error } = await DeleteCategoryUseCase.execute(categoryID);
        setError(error);
        if (error) {
            showBoundary(error)
        }
        if (result) {
            navigate("/categories")
            // setCategories(categories => categories.filter(category => category.id !== categoryID));
        }
    }

    return {
        categories,
        category,
        error,
        month,
        setMonth,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory
    };
}
