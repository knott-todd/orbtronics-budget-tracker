import Navbar from "@components/Navbar";
import { CategoriesViewModelProvider } from "features/budgeting/presentation/contexts/CategoriesViewModelContext";
import { LogsViewModelProvider } from "features/budgeting/presentation/contexts/LogsViewModelContext";
import React from "react";
import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <>
            <LogsViewModelProvider>
                <CategoriesViewModelProvider>
                    <Outlet />
                </CategoriesViewModelProvider>
            </LogsViewModelProvider>
            <Navbar />
        </>
    );
}