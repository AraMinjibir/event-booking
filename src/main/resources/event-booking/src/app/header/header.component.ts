import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'header',
  imports: [RouterLink, NgIf, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   authService:AuthService = inject(AuthService);
   isLoading = false;

  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.authService.logout();
    },3000)
  }
}
