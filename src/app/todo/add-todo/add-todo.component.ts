import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  newTodoTitle: string = '';

  @Output() addTodo = new EventEmitter<string>();

  onAddTodo(): void {
    const trimmedTitle = this.newTodoTitle.trim();
    if (trimmedTitle) {
      this.addTodo.emit(trimmedTitle);
      this.newTodoTitle = '';
    }
  }
}
