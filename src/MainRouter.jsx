import { MainLayout } from "layout/MainLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginView from "./features/auth/presentation/views/LoginView";
import ProfileView from "./features/auth/presentation/views/ProfileView";
import SignupView from "./features/auth/presentation/views/SignupView";
import BudgetLogsView from "./features/budgeting/presentation/views/BudgetLogsView";
import CategoryLogsView from "./features/budgeting/presentation/views/CategoryLogsView";
import CategorySummaryListView from "./features/budgeting/presentation/views/CategorySummaryListView";
import EditBudgetlogView from "./features/budgeting/presentation/views/EditBudgetLogView";
import EditCategoryView from "./features/budgeting/presentation/views/EditCategoryView";
import NewBudgetlogView from "./features/budgeting/presentation/views/NewBudgetLogView";
import NewCategoryView from "./features/budgeting/presentation/views/NewCategoryView";

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