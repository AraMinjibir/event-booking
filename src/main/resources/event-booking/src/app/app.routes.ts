import { Routes } from '@angular/router';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { PageNotFoundComponent } from './Auth/page-not-found/page-not-found.component';

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
    
  },
{
  path: "admin",
  loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
},
{ path: '**', component: PageNotFoundComponent }];
