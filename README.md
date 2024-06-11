# The Orbtronic Budget Tracker

## User Manual

### Overview

Welcome to the Orbtronics Budget Tracker! This web application allows you to manage your finances by tracking your income and expenses, categorizing them, and providing detailed budget summaries.

### Features

- User authentication and authorization
- Add, edit, and delete income and expense entries
- Categorize income and expenses
- View budget summary and detailed breakdown
- Responsive and user-friendly interface

## Installation Guide for Developers

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

### Installation Steps

1. **Clone the Repository**
    
    ```
    git clone https://github.com/knott-todd/orbtronics-budget-tracker
    cd budget-tracker
    ```
    
2. **Install Dependencies**
    
    ```
    npm install
    ```
    
3. **Run the Application**
    
    ```
    npm run dev
    ```
    
    A local development server would be started, and the link will be in the terminal.
    
4. **Build for Production**
    
    ```
    npm run build
    ```
    
5. **Deploy (triggers GitHub Pages update)**
    
    ```
    npm run deploy
    ```
   

### Getting Started (user)

1. **Accessing the Application**
    - Visit the web application at https://knott-todd.github.io/orbtronics-budget-tracker/.
    - Register an account by clicking the "Sign Up" button and filling in the required details.
    - If you already have an account, click "Log In" and enter your credentials.
2. **Dashboard Overview**
    - Once logged in, you will be directed to the dashboard which provides an overview of your budget.

### Core Features

1. **Adding Income and Expense Entries**
    - Navigate to the "Add Entry" section.
    - Choose "Income" or "Expense" from the dropdown menu.
    - Enter the amount, date, and category.
    - Click "Save" to add the entry.
2. **Editing and Deleting Entries**
    - Go to the "View Entries" section.
    - Click the entry you wish to edit or delete.
    - Click the pencil icon to modify the entry details, then save.
    - Click the trash can icon to remove the entry.
3. **Viewing Budget Summary and Breakdown**
    - The dashboard provides a summary of your income, expenses, and balance.
    - Detailed breakdowns by category and month are available under the "Home" section.
4. **Categorizing Income and Expenses**
    - Navigate to the "Categories" section from the main menu.
    - **Adding a Category:**
        - Click the "Add Category" button.
        - Enter the category name and choose the type (Income or Expense).
        - Enter the budget amount.
        - Click "Save" to add the new category.
    - **Editing a Category:**
        - Click the category you wish to edit in the list.
        - Click the pencil icon in the top right.
        - Modify the category name, amount or type as needed.
        - Click "Save" to update the category.
    - **Deleting a Category:**
        - Click the category you wish to delete in the list.
        - Click the pencil icon in the top right.
        - Click the trash can icon in the top right.
    - **Assigning Entries to Categories:**
        - When adding or editing an entry in the "Add Entry" or "Edit Entry" section, select the appropriate category from the dropdown menu.
        - This ensures that the entry is categorized correctly for accurate budget tracking and reporting.


# Design Documentation

## System Architecture

### Overview

The Orbtronic Budget Tracker is a web-based application built using React for the frontend and a Firebase backend with a Firestore database. The application follows the MVVM (Model-View-ViewModel) architecture pattern to ensure separation of concerns and maintainability.

### Architecture Layers

1. **Presentation Layer (React)**
    - **Views**: UI components that render the application's user interface.
    - **ViewModels**: Manage the application's state and handle user interactions. They communicate with the use cases to perform business logic.
2. **Domain Layer**
    - **Use Cases**: Encapsulate the application's business logic and interact with the repositories to perform CRUD operations.
3. **Data Layer**
    - **Repositories**: Abstract the data access layer and provide a clean API for the use cases.
    - **Data Sources**: Interact with the Firebase APIs (Firestore and Fireauth) to perform actual data retrieval and persistence.

### Folder Structure

```css
./src
├── assets/
├── components/
├── DI/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── datasources/
│   │   │   └── repositories/
│   │   ├── domain/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── contexts/
│   │       ├── viewmodels/
│   │       └── views/
│   └── budgeting/
│       ├── assets/
│       ├── data/
│       │   ├── datasources/
│       │   └── repositories/
│       ├── domain/
│       │   └── usecases/
│       │       ├── categories/
│       │       └── logs/
│       ├── hooks/
│       ├── presentation/
│       │   ├── components/
│       │   │   ├── forms/
│       │   │   └── ui/
│       │   ├── contexts/
│       │   ├── viewmodels/
│       │   └── views/
│       └── utils/
├── layout/
├── services/
├── utils/
├── App.jsx
└── main.jsx

```

## Data Models

### User

```json
{
		// Managed by fireauth (not in firestore)
    "uid": "string",
    "email": "string",
    "password": "string",
    "displayName": "string"
}

```

### Category

```json
{
    "id": "string",
    "name": "string",
    "type": "string",  // "Fixed" or "Percent"
    "userID": "string",
    "value": "number",
    "isIncome": "bool",

    // Calculated client-side
    "balance": "number",
    "budget": "number",
    "netIncome": "number",
    "netExpenses": "number"
}

```

### Log Entry

```json
{
    "id": "string",
    "userID": "string",
    "categoryID": "string",
    "categoryName": "string",
    "amount": "number",
    "timestamp": "Timestamp",
    "description": "string"
}

```

## Workflow Diagrams

### User Authentication and Authorization

1. **User Registration**
    - User provides email, password, and name.
    - Data is sent to the backend.
    - Backend validates and stores user data in the database.
    - If the data is valid:
        - User is automatically logged in.
        - User is redirected to the home page.
    - If there are errors:
        - Error codes, such as "email-already-in-use", are recognized.
            - The UI is updated to show the error at the respective field.
        - Unexpected errors are caught and rendered in the fallback error component.
    
    ```mermaid
    graph TD;
        A[User] -->|Provides email, password, and name| B((User Sign Up));
        B -->|Data transmission| C[Backend];
        C -->|Validates and stores user data| D{Success?};
        D -- Yes --> E[User Logged In];
        E -->|Redirect| F(Home Page);
        D -- No --> G[Error Handling];
        G -->|Error code recognized| H[UI Update];
        G -->|Unexpected errors| I[Fallback Error Component];
    
    ```
    
2. **User Login**
    - The user submits their email and password.
    - The submitted data is transmitted to the backend server.
    - The backend server validates the provided credentials.
    - If the credentials are valid:
        - The user is successfully authenticated.
        - A session token is generated and sent back to the user.
    - If an error occurs:
        - The backend server returns an error code (e.g., "invalid-credentials").
        - The user interface (UI) updates to display the specific error message at the relevant input field.
        - Any unexpected errors are caught and displayed using a fallback error component.
    
    ```mermaid
    graph TD;
        A[User] -->|Provides email and password| B((User Login));
        B -->|Data transmission| C[Backend];
        C -->|Validates credentials| D{Success?};
        D -- Yes --> E[Authentication Successful];
        E -->|Session token| A;
        D -- No --> F{Error};
        F -->|Error code recognized| G[UI Update];
        F -->|Unexpected errors| H[Fallback Error Component];
    
    ```
    

### Getting, Adding, Editing, and Deleting Entries

1. **Getting Entries**
    - User navigates to the “Logs” page.
    - UI fetches log stream from the backend.
    - Backend establishes a stream connection to the database for log updates.
    - Whenever a log is added, edited, or deleted in the database, the backend emits an update through the stream.
    - UI receives the update from the stream and re-renders the log list.
    
    ```mermaid
    graph TD;
        A[User navigates to dashboard] -->|Fetches log stream| B[UI fetches log stream];
        B -->|Establishes stream connection| C[Backend establishes stream connection];
        C -->|Log added, edited, or deleted| D[Backend emits update through stream];
        D -->|UI receives update| E[UI re-renders]
    ```
    
2. **Add Entry**
    - User navigates to "Add Entry" page.
    - User selects type (Income or Expense), category, enters amount, date, and description.
    - Data is sent to the backend.
    - Backend stores the entry in the database.
    - Database stream listener detects change, and triggers re-render.
    
    ```mermaid
    graph TD;
        A[User] --> B["Navigate to 'Add Entry' Page"];
        B --> C[Select Type, Category, Enter Amount, Date, and Description];
        C --> D[Send Data to Backend];
        D --> E[Store Entry in Database];
    
    ```
    
3. **Edit Entry**
    - User navigates to "Logs" page.
    - User selects an entry to edit.
    - User modifies the entry details.
    - Data is sent to the backend.
    - Backend updates the entry in the database.
    - Database stream listener detects change, and triggers re-render.
    
    ```mermaid
    graph TD;
        A[User] --> B["Navigate to 'Logs' Page"];
        B --> C[Select Entry to Edit];
        C --> D[Modify Entry Details];
        D --> E[Send Data to Backend];
        E --> F[Update Entry in Database];
    
    ```
    
4. **Delete Entry**
    - User navigates to "Logs" page.
    - User selects an entry to delete.
    - Deletion is confirmed by the user.
    - Data is sent to the backend.
    - Backend deletes the entry from the database.
    - Database stream listener detects change, and triggers re-render.
    
    ```mermaid
    graph TD;
        A[User] --> B["Navigate to 'Logs' Page"];
        B --> C[Select Entry to Delete];
        C --> D[Confirm Deletion];
        D --> E[Send Data to Backend];
        E --> F[Delete Entry from Database];
    
    ```
    

### Budget Summary and Categorization

1. **Get Categories**
    - User navigates to the dashboard.
    - UI fetches category stream from the backend.
    - Backend establishes a stream connection to the database for category updates.
    - Whenever a category is added, edited, or deleted in the database, the backend emits an update through the stream.
    - UI receives the update from the stream and re-renders the category list.
    
    ```mermaid
    graph TD;
        A[User navigates to Home] -->|Fetches category stream| B[UI fetches category stream];
        B -->|Establishes stream connection| C[Backend establishes stream connection];
        C -->|Category added, edited, or deleted| D[Backend emits update through stream];
        D -->|UI receives update| E[UI re-renders category list];
    
    ```
    
2. **Categorize Entries**
    - User navigates to "Categories" page.
    - User adds, edits, or deletes categories.
    - Data is sent to the backend.
    - Backend updates categories in the database.
    
    ```mermaid
    graph TD;
        A[User navigates to Home] -->|Adds, edits, or deletes categories| B[Data sent to backend];
        B -->C[Backend updates categories];
    
    ```
