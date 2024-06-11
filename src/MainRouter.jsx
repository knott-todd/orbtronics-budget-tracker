import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategorySummaryListView from "./features/budgeting/presentation/views/CategorySummaryListView";
import BudgetLogsView from "./features/budgeting/presentation/views/BudgetLogsView";
import CategoryLogsView from "./features/budgeting/presentation/views/CategoryLogsView";
import EditCategoryView from "./features/budgeting/presentation/views/EditCategoryView";
import NewCategoryView from "./features/budgeting/presentation/views/NewCategoryView";
import EditBudgetlogView from "./features/budgeting/presentation/views/EditBudgetLogView";
import NewBudgetlogView from "./features/budgeting/presentation/views/NewBudgetLogView";
import LoginView from "./features/auth/presentation/views/LoginView";
import SignupView from "./features/auth/presentation/views/SignupView";
import ProfileView from "./features/auth/presentation/views/ProfileView";
import { LogsViewModelProvider } from "./features/budgeting/presentation/contexts/LogsViewModelContext";
import { CategoriesViewModelProvider } from "./features/budgeting/presentation/contexts/CategoriesViewModelContext";
import { MainLayout } from "layout/MainLayout";
import React from "react";

export default function MainRouter() {

    return (
        <>
            {/* Router view */}
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<CategorySummaryListView />} />
                    <Route path="/profile" element={<ProfileView />} />
                    <Route path="/budget-logs" element={<BudgetLogsView />} />
                    <Route path="/budget-logs/new" element={<NewBudgetlogView />} />
                    <Route path="/budget-logs/:id" element={<EditBudgetlogView />} />
                    <Route path="/categories" element={<CategorySummaryListView />} />
                    <Route path="/categories/new" element={<NewCategoryView />} />
                    <Route path="/categories/:id" element={<CategoryLogsView />} />
                    <Route path="/categories/:id/edit" element={<EditCategoryView />} />
                </Route>

                <Route path="/login" element={<LoginView />} />
                <Route path="/signup" element={<SignupView />} />
            </Routes>
        </>
    );
}