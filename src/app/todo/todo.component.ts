import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



import { Todo } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  @Input() todo!: Todo;
  @Output() toggle=new EventEmitter<void>();
  @Output() delete=new EventEmitter<void>();
  @Output() edit=new EventEmitter<string>()

  editTitle=''
  isEditing=false

  onToggle():void{
    this.toggle.emit()
  }

  onDelete():void{
    this.delete.emit()
  }

  startEditing(){
    this.isEditing=true
    this.editTitle=this.todo.title
  }

  saveEditing(){
    if(this.editTitle.trim()){
      this.edit.emit(this.editTitle.trim())
      this.isEditing=false

    }
  }
  cancelEdit(){
    this.isEditing=false
  }

}
