import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './components/employee/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/employee/expense-list/expense-list.component';
import { ManagerDashboardComponent } from './components/manager/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' } ,// default redirect
  { path: 'employee/expense-form', component: ExpenseFormComponent },
  { path: 'employee/expense-list', component: ExpenseListComponent },
  { path: 'manager/dashboard', component: ManagerDashboardComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
