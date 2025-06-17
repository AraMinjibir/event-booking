import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../Auth/signup/signup.component';
import { AuthService } from '../Service/auth.service';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'header',
  imports: [RouterLink, SignupComponent, NgIf, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   authService:AuthService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
