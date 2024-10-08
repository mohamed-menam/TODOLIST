import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { TodoService } from "../todo/todo.service";


@Injectable({
    providedIn:'root'
})
export class AuthService{
    private apiUrl='http://127.0.0.1:8000/user/'

   

    constructor (private http:HttpClient ,private router:Router,private todoservice:TodoService){}

    login(username:string,password:string) : Observable <any>{
        const body ={username,password}
        return this.http.post(`${this.apiUrl}api/token/`,body).pipe(
            tap(
                (response:any)=>{
                    if(response.access){
                        
                        localStorage.setItem('authToken',response.access)
                        localStorage.setItem('refreshToken', response.refresh);
                        this.router.navigate(['/todos'])
                    }

                }
            )
        )

    }

    logout() :void{
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        this.router.navigate(['/login']);

    }

    register(userData:any):Observable<any>{
       return this.http.post(`${this.apiUrl}register/`,userData)

    }
    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
      }


}