import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService:AuthService ,private router:Router){}
   

  logout(){
    this.authService.logout()
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('authToken');
 }
}
