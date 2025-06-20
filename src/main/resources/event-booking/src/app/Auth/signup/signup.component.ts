import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../Service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';




@Component({
  selector: 'signup',
  imports: [ReactiveFormsModule, InputTextModule, FormsModule, AutoComplete, ButtonModule,RouterLink,NgIf, ToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService],
})
export class SignupComponent {
  private router:Router = inject(Router);
  selectedRoles: string[] = ["ADMIN", "USER"];
items: string[] | undefined;
value: string;
  signupForm: FormGroup;
  isLoading = false;
  authService:AuthService = inject(AuthService);
  constructor( private messageService: MessageService){}
      ngOnInit() {
          this.signupForm = new FormGroup({
              email: new FormControl("", Validators.required),
             password: new FormControl("", Validators.required),
              role: new FormControl("Select Role", Validators.required),
          });
      }

      search(event: AutoCompleteCompleteEvent) {
        const query = event.query?.toLowerCase() || '';
      
        this.items = this.selectedRoles.filter(role =>
          role.toLowerCase().includes(query)
        );
      }

      onSUbmit() {
        if (this.signupForm.invalid) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Invalid Input',
            detail: 'Please fill out all required fields.'
          });
          return;
        }
      
        this.isLoading = true;
      
        this.authService.createUser(this.signupForm.value).subscribe({
          next: () => {
            const { email, password } = this.signupForm.value;
      
            this.authService.login({ email, password }).subscribe({
              next: (res) => {
                
                localStorage.setItem('token', res.token);
                const role = res.role.replace('ROLE_', '');
                localStorage.setItem('role', role);
      
                this.messageService.add({
                  severity: 'success',
                  summary: 'Account Created',
                  detail: `Welcome ${role}, you are now logged in.`
                });
                
                setTimeout(() =>{
                  this.isLoading = false;
                  if (role === 'ADMIN') {
                    this.router.navigate(['/admin/admin-layout']);
                  } else if (role === 'USER') {
                    this.router.navigate(['/user']);
                  } else {
                    console.warn('Unknown role after signup:', res.role);
                    this.router.navigate(['/']);
                  }
                },3000)
                
              },
              error: (err) => {
                this.isLoading = false;
                console.error('Auto-login failed', err);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Login Failed',
                  detail: 'Try logging in manually.'
                });
              }
            });
      
            this.signupForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            console.log("Error occurred", err);
            this.messageService.add({
              severity: 'error',
              summary: 'Signup Failed',
              detail: 'Something went wrong. Please try again.'
            });
          }
        });
      }
      
      
      

}
