import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onLogin() {
    if (this.loginForm.invalid) return;
  
    const credentials = this.loginForm.getRawValue(); 
    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        const role = res.role.replace('ROLE_', '');
        localStorage.setItem('role', role);
  
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/admin-layout']);
        } else if (role === 'USER') {
          this.router.navigate(['/user']);
        } else {
          console.warn('Unknown role:', res.role);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Invalid credentials');
        console.error(err);
      }
    });
  }
  
  
  
  

}
