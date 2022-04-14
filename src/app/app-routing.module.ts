import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ProfileComponent } from './main/profile/profile.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
  path: '',
  canActivate: [AuthGuardService],
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }],
},
  // {
  // path: '',
  // redirectTo: '/login',
  // pathMatch: 'full'
  // },
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
// otherwise redirect to home
{ path: '**', redirectTo: '/login' }
];

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   redirectTo: '/dashboard',
//   //   pathMatch: 'full'
//   // }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
