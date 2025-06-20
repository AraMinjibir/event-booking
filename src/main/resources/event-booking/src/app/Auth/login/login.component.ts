import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, NgIf,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  isLoading = false;

  constructor( private messageService: MessageService){}

  onLogin() {
    if (this.loginForm.invalid) return;
  
    this.isLoading = true;
    const credentials = this.loginForm.getRawValue();
  
    this.authService.login(credentials).subscribe({
      next: (res) => {
          
        localStorage.setItem('token', res.token);
        const role = res.role.replace('ROLE_', '');
        localStorage.setItem('role', role);
  
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Welcome ${role}!`
        });
  
       
        setTimeout(() => {
          this.isLoading = false;
          if (role === 'ADMIN') {
            this.router.navigate(['/admin/admin-layout']);
          } else if (role === 'USER') {
            this.router.navigate(['/user']);
          } else {
            console.warn('Unknown role:', res.role);
            this.router.navigate(['/']);
          }
        }, 3000); 
      },
  
      error: (err) => {
        this.isLoading = false;
  
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid credentials. Please try again.'
        });
  
        console.error(err);
      }
    });
  }
  
  
  
  
  

}
