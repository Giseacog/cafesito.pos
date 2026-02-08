import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, //Ruta principal,
  { path: 'register', component: RegisterComponent }, //Registro
  { path: 'login', component: LoginComponent }, //Login
];
