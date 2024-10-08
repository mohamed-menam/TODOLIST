import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl='http://127.0.0.1:8000'
  private todos: Todo[] = [];
  private nextId = 1;




  constructor(private http: HttpClient ,private router:Router) {}


private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
}
  refreshTokens(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error('No refresh token found');
        return throwError('No refresh token found');
    }

    return this.http.post('http://127.0.0.1:8000/user/api/token/refresh/', { refresh: refreshToken }).pipe(
        tap((response: any) => {
            if (response.access) {
                localStorage.setItem('authToken', response.access);
            }
        }),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('refreshToken')
            this.router.navigate(['/login']);

          }
            console.error('Token refresh failed', error);
            return throwError(error);
        })
    );
}

  

  getAll() :Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.apiUrl}/todo/list/`,{
       headers: this.getAuthHeaders() 
      }).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.refreshTokens().pipe(
              switchMap(() => {
                return this.http.get<any>(`${this.apiUrl}/todo/list/`, {
                  headers: this.getAuthHeaders(),
                });
              })
            );
          }
          return of(error);
        })
      );
    }

  getById(id:number):Observable<Todo>{
    return this.http.get<Todo>(`${this.apiUrl}/todo/${id}/`,{ headers: this.getAuthHeaders() })

  }
  create(todo: Todo):Observable<Todo>{

    return this.http.post<Todo>(`${this.apiUrl}/todo/list/`,todo,{ headers: this.getAuthHeaders() })
  }
  
  searchTodo(title:string):Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.apiUrl}/todo/search/?title=${title}`,{ headers: this.getAuthHeaders() })
  }

  deleteTodos(id:number):Observable<Todo>{
    return this.http.delete<Todo>(`${this.apiUrl}/todo/${id}/`,{ headers: this.getAuthHeaders() })

  }

  updateTodo(id: number, updatedTodo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todo/${id}/`, updatedTodo,{ headers: this.getAuthHeaders() });
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    this.todos.push({ id: this.nextId++, title, completed: false });
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
