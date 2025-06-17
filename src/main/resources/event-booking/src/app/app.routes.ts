import { Routes } from '@angular/router';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { PageNotFoundComponent } from './Auth/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Service/auth.guard';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
{
  redirectTo: 'home',
  path: '',
  pathMatch:'full'
  
},
  {
    path: "auth/signup",
    component: SignupComponent},
    {
      path: "auth/login",
      component: LoginComponent},
    
{
  path: "admin",
  loadChildren: () => import("./admin-layout/admin.module").then(a => a.AdminModule),
  canActivate:[authGuard]
},
{
  path: "user",
  loadChildren: () => import("./user-layout/user.module").then(b => b.UserModule),
  canActivate:[authGuard]
},
{ path: '**', component: PageNotFoundComponent }];
