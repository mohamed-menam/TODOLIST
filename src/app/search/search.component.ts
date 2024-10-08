import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery:string='';
  @Output() search=new EventEmitter<string>();

  onSearch():void{
    this.search.emit(this.searchQuery)
  }

}
