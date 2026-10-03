import { Routes } from '@angular/router';
import { MainComponent } from './components/main-component/main-component';
import { SubAnimalGroupList } from './components/subAnimalGroup/sub-animal-group-list/sub-animal-group-list';
import { HomeContentComponent } from './components/home-content-component/home-content-component';
import { AnimalGroupComponent } from './components/animalGroups/animal-group-component/animal-group-component';
import { FourageComponent } from './components/fourage/fourage-component/fourage-component';
import { FourageList } from './components/fourage/fourage-list/fourage-list';
import { SupplierComponent } from './components/supplier/supplier-component/supplier-component';
import { FeddingRecordComponent } from './components/feedingRecord/fedding-record-component/fedding-record-component';
import { FourageStockComponent } from './components/fourageStock/fourage-stock-component/fourage-stock-component';
import { AnimalGroupEditComponent } from './components/animalGroups/animal-group-edit-component/animal-group-edit-component';
import { SubGroupEditComponent } from './components/subAnimalGroup/sub-group-edit-component/sub-group-edit-component';
import { FourageEditComponent } from './components/fourage/fourage-edit-component/fourage-edit-component';
import { SupplierEditComponent } from './components/supplier/supplier-edit-component/supplier-edit-component';
import { FourageStockEditComponent } from './components/fourageStock/fourage-stock-edit-component/fourage-stock-edit-component';
import { FeedingRecordEditComponent } from './components/feedingRecord/feeding-record-edit-component/feeding-record-edit-component';
import { TestComonent } from './components/test-comonent/test-comonent';
import { LoginComponent } from './components/login-component/login-component';
import { UserComponent } from './components/user-component/user-component';
import { authGuard } from './guards/auth/auth-guard-guard';
import { roleGuard } from './guards/role/role-guard-guard';
import { AlertComponent } from './components/alert-component/alert-component';
import { PredictionDashboardComponent } from './components/predictions/prediction-dashboard/prediction-dashboard.component';


export const routes: Routes = [
    // Public route

    { path: 'login', component: LoginComponent},
    // Protected routes
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: HomeContentComponent, canActivate: [authGuard] },
            { path: 'subAnimalGroups', component: SubAnimalGroupList, canActivate: [authGuard] },
            { path: 'animalGroups', component: AnimalGroupComponent, canActivate: [authGuard] },
            { path: 'addFourage', component: FourageComponent, canActivate: [authGuard] },
            { path: 'fourageList', component: FourageList, canActivate: [authGuard] },
            { path: 'suppliers', component: SupplierComponent, canActivate: [authGuard] },
            { path: 'feedingRecord', component: FeddingRecordComponent, canActivate: [authGuard] },
            { path: 'fourageStock', component: FourageStockComponent, canActivate: [authGuard] },
            { path: 'animalGroup/edit/:id', component: AnimalGroupEditComponent, canActivate: [authGuard] },
            { path: 'subGroup/edit/:id', component: SubGroupEditComponent, canActivate: [authGuard] },
            { path: 'fourage/edit/:id', component: FourageEditComponent, canActivate: [authGuard] },
            { path: 'supplier/edit/:id', component: SupplierEditComponent, canActivate: [authGuard] },
            { path: 'fourageStock/edit/:id', component: FourageStockEditComponent, canActivate: [authGuard] },
            { path: 'feedingRecord/edit/:id', component: FeedingRecordEditComponent, canActivate: [authGuard] },
            { path: 'alerts', component: AlertComponent, canActivate: [authGuard]},
            { path: 'predictions', component: PredictionDashboardComponent, canActivate: [authGuard]},
            { path: 'users', component: UserComponent, canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } }
        ]
    }
];
