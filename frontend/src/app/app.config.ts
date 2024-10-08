import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter , RouterModule, Routes } from '@angular/router';

// import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { authGuard } from './auth.guard';


const routes:Routes=[
  {path:'todos',component:TodoListComponent,canActivate: [authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/todos',pathMatch:'full'},
  {path:'**',redirectTo:'/todos'}
]



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient()]
};
