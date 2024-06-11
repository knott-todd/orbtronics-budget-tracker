import React, { createContext, useContext } from 'react';
import container from '../../../../DI/ioc';

const defaultCategoriesViewModel = {
    categories: [],
    category: null,
    error: null,
    month: new Date(),
    setMonth: () => {},
    getCategories: () => Promise.resolve(),
    getCategory: () => Promise.resolve(),
    createCategory: () => Promise.resolve(),
    updateCategory: () => Promise.resolve(),
    deleteCategory: () => Promise.resolve()
};

const CategoriesViewModelContext = createContext(defaultCategoriesViewModel);

export const CategoriesViewModelProvider = ({ children }) => {
    const {
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
    } = container.resolve('CategoriesViewModel');

    return (
        <CategoriesViewModelContext.Provider value={{
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
        }}>
            {children}
        </CategoriesViewModelContext.Provider>
    );
};

export const useCategoriesViewModelContext = () => {
    return useContext(CategoriesViewModelContext);
};
