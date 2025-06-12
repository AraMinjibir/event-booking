import { Routes } from '@angular/router';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent},
    {
      path: "login",
      component: LoginComponent},
  {
    redirectTo: 'login',
    path: '',
    pathMatch:'full'
    
  }];
