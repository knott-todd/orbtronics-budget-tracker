import { createContainer, asClass, asValue, asFunction } from 'awilix';
import * as FirebaseAuthDataSource from '../features/auth/data/datasources/firebaseAuthDataSource';
import * as FirestoreLogsDataSource from '../features/budgeting/data/datasources/firestoreLogsDataSource';
import * as FirestoreCategoryDataSource from '../features/budgeting/data/datasources/firestoreCategoryDataSource';
import AuthViewModel from '../features/auth/presentation/viewmodels/AuthViewModel';
import { FirebaseAuthRepository } from '../features/auth/data/repositories/firebaseAuthRepository';
import { FirestoreLogsRepository } from '../features/budgeting/data/repositories/firestoreLogsRepository';
import { FirestoreCategoryRepository } from '../features/budgeting/data/repositories/firestoreCategoryRepository';
import { LoginWithGoogleUseCase } from '../features/auth/domain/usecases/loginWithGoogleUseCase';
import { LoginWithEmailAndPasswordUseCase } from '../features/auth/domain/usecases/loginWithEmailAndPasswordUseCase';
import { SignUpWithEmailAndPasswordUseCase } from '../features/auth/domain/usecases/signUpWithEmailAndPasswordUseCase';
import { LogoutUseCase } from '../features/auth/domain/usecases/logoutUseCase';
import LogsViewModel from '../features/budgeting/presentation/viewmodels/LogsViewModel';
import { DeleteLogUseCase } from '../features/budgeting/domain/usecases/logs/deleteLogUseCase';
import { UpdateLogUseCase } from '../features/budgeting/domain/usecases/logs/updateLogUseCase';
import { CreateLogUseCase } from '../features/budgeting/domain/usecases/logs/createLogUseCase';
import { GetLogsUseCase } from '../features/budgeting/domain/usecases/logs/getLogsUseCase';
import { GetLogUseCase } from '../features/budgeting/domain/usecases/logs/getLogUseCase';
import CategoriesViewModel from '../features/budgeting/presentation/viewmodels/CategoriesViewModel';
import { GetCategoriesUseCase } from '../features/budgeting/domain/usecases/categories/getCategoriesUseCase';
import { CreateCategoryUseCase } from '../features/budgeting/domain/usecases/categories/createCategoryUseCase';
import { UpdateCategoryUseCase } from '../features/budgeting/domain/usecases/categories/updateCategoryUseCase';
import { DeleteCategoryUseCase } from '../features/budgeting/domain/usecases/categories/deleteCategoryUseCase';
import { GetCategoryUseCase } from '../features/budgeting/domain/usecases/categories/getCategoryUseCase';


const container = createContainer();

container.register({
    // Data sources
    FirebaseAuthDataSource: asValue(FirebaseAuthDataSource),
    FirestoreLogsDataSource: asValue(FirestoreLogsDataSource),
    FirestoreCategoryDataSource: asValue(FirestoreCategoryDataSource),

    // View models
    AuthViewModel: asFunction(AuthViewModel),
    LogsViewModel: asFunction(LogsViewModel),
    CategoriesViewModel: asFunction(CategoriesViewModel),

    // Repositories
    FirebaseAuthRepository: asFunction(FirebaseAuthRepository),
    FirestoreLogsRepository: asFunction(FirestoreLogsRepository),
    FirestoreCategoryRepository: asFunction(FirestoreCategoryRepository),

    // Use cases
    // Auth
    LoginWithGoogleUseCase: asFunction(LoginWithGoogleUseCase),
    LoginWithEmailAndPasswordUseCase: asFunction(LoginWithEmailAndPasswordUseCase),
    SignUpWithEmailAndPasswordUseCase: asFunction(SignUpWithEmailAndPasswordUseCase),
    LogoutUseCase: asFunction(LogoutUseCase),

    // Logs
    GetLogsUseCase: asFunction(GetLogsUseCase),
    GetLogUseCase: asFunction(GetLogUseCase),
    CreateLogUseCase: asFunction(CreateLogUseCase),
    UpdateLogUseCase: asFunction(UpdateLogUseCase),
    DeleteLogUseCase: asFunction(DeleteLogUseCase),

    // Categories
    GetCategoriesUseCase: asFunction(GetCategoriesUseCase),
    CreateCategoryUseCase: asFunction(CreateCategoryUseCase),
    UpdateCategoryUseCase: asFunction(UpdateCategoryUseCase),
    DeleteCategoryUseCase: asFunction(DeleteCategoryUseCase),
    GetCategoryUseCase: asFunction(GetCategoryUseCase)
});

export default container;