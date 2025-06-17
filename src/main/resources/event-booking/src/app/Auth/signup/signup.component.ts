import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../Service/auth.service';
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'signup',
  imports: [ReactiveFormsModule, InputTextModule, FormsModule, AutoComplete, ButtonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private router:Router = inject(Router);
  selectedRoles: string[] = ["ADMIN", "USER"];
items: string[] | undefined;
value: string;
  signupForm: FormGroup;

  authService:AuthService = inject(AuthService);
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
        if (this.signupForm.valid) {
          this.authService.createUser(this.signupForm.value).subscribe({
            next: () => {
              console.log("User Created Successfully");
      
              const { email, password } = this.signupForm.value;
      
              this.authService.login({ email, password }).subscribe({
                next: (res) => {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('role', res.role);
      
                  // Normalize role
                  const role = res.role.replace('ROLE_', '');
      
                  if (role === 'ADMIN') {
                    this.router.navigate(['/admin/admin-layout']);
                  } else if (role === 'USER') {
                    this.router.navigate(['/user']);
                  } else {
                    console.warn('Unknown role after signup:', res.role);
                    this.router.navigate(['/']);
                  }
                },
                error: (err) => {
                  console.error('Auto-login failed', err);
                  this.router.navigate(['/login']);
                }
              });
      
              this.signupForm.reset();
            },
            error: (err) => {
              console.log("Error occurred", err);
            }
          });
        } else {
          console.warn("Invalid data");
        }
      }
      
      

}
