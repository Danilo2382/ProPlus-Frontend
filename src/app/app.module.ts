import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NgOptimizedImage } from "@angular/common";
import { HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectComponent } from './views/project/project.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './views/login/login.component';
import { authInterceptor } from "./interceptors/auth.interceptor";
import { RegisterComponent } from './views/register/register.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { MembersComponent } from './views/members/members.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent,
    MembersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor()]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
