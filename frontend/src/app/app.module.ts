import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';          // <-- for ngModel
import { HttpClientModule } from '@angular/common/http'; // <-- for HTTP requests

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'; // <-- correct path


import { ExpenseFormComponent } from './components/employee/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/employee/expense-list/expense-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerDashboardComponent } from './components/manager/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ExpenseFormComponent,
    ExpenseListComponent,
    ManagerDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // <-- needed for [(ngModel)]
    HttpClientModule    // <-- needed for AuthService API calls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
