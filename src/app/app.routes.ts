import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordListComponent, canActivate: [authGuard] },
    { path: 'add-records', component: RecordFormComponent, canActivate: [authGuard] },
    { path: 'view-record/:id', component: RecordFormComponent, canActivate: [authGuard] },
    { path: 'edit-record/:id', component: RecordFormComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirecting
    { path: '**', redirectTo: '/login' }
];