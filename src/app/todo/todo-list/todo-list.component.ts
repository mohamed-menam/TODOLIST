import { Component, Input ,OnInit} from '@angular/core';
import { TodoComponent } from '../todo.component';
import { Todo, TodoService } from '../todo.service';
import { tick } from '@angular/core/testing';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../search/search.component';
import { error } from 'console';
import { title } from 'process';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoComponent,AddTodoComponent,SearchComponent,CommonModule,RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos:Todo[]=[];
  todo:any;
  
  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  ngOnInit() {
    this.todoService.getAll().subscribe(
      (response)=>{
        this.todos=response
        console.log('all todo',this.todos)
      },

    );
    
  }

  getTodoById(id:number){
    this.todoService.getById(id).subscribe(
      (response)=>{
         this.todo=response
      },
      (error)=>{
        console.log(`Error fetching item with ID ${id}`,error)
      }
    )
  }

  createNewTodo(title:string){
    const newTodo:Todo={ id:0, title: title, completed: false };
    this.todoService.create(newTodo).subscribe(
      (response)=>{
        console.log('Item created successfully:', response);
        this.todos.push(response);
      },
    (error) => {
      console.error('Error creating todo:', error);
      // Optionally, you could show an error message to the user here
    }

    )
  }

  searchTodo(title:string){
    this.todoService.searchTodo(title).subscribe(
      data=>{
        this.todos=data
      }
    )
  }
  deleteTodos(id:number){
    this.todoService.deleteTodos(id).subscribe(
      data=>{
        console.log('Todo deleted:', data);
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error => {
        console.error('Error deleting todo:', error);
      }
    )
  }

  editTodoTitle(todo:Todo,newTitle:string){
    const updatedTodo={title:newTitle,completed:todo.completed}
    this.todoService.updateTodo(todo.id,updatedTodo).subscribe(
      (updatedTodo)=>{
        const index=this.todos.findIndex(t=>t.id==todo.id)
        if(index!==-1){
          this.todos[index]=updatedTodo
        }
      }
    )
  }

  // addNewTodo(title: string): void {
  //   this.todoService.addTodo(title);
  //   this.todos = this.todoService.getTodos(); 
  //   console.log(this.todos)
  // }

  toggleTodoCompletion(todo: Todo): void {
    this.todoService.toggleTodoCompletion(todo.id);
    this.todos = this.todoService.getTodos(); 
  }

  // deleteTodo(todo: Todo): void {
  //   this.todoService.deleteTodo(todo.id);
  //   this.todos = this.todoService.getTodos(); 
  // }
  // filterTodos(query:string){
  //   this.filteredTodos=this.todos.filter(todo=>todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  // }

}
