import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./views/profile/profile.component";
import {ProjectsComponent} from "./views/projects/projects.component";
import {LoginComponent} from "./views/login/login.component";
import {authGard, registrationGuard} from "./guards/authGard";
import {RegisterComponent} from "./views/register/register.component";
import {ProjectComponent} from "./views/project/project.component";

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [registrationGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [authGard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGard]},
  {path: 'project/:id', component: ProjectComponent, canActivate: [authGard]},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: '**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
