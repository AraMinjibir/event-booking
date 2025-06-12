import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
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

    this.authService.login(this.loginForm.value as { email: string; password: string }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Invalid credentials');
      }
    });
    
  }

}
