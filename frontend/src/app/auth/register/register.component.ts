import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   
  registrationData={
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: ''
  };
  
  successMessage: string | null = null; 



   constructor(private authService:AuthService ,private router:Router){}


   register(){
    this.authService.register(this.registrationData).subscribe(
      (response)=>{
        console.log('Registration successful',response)
        this.successMessage = 'Thank you for registering!';
        this.router.navigate(['/login'])

      },
      (error)=>{
        console.log(error,"rrrrrrrrrrrrrrrrrrrr")
      }
    )
   }

   
}
