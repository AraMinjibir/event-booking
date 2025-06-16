import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../Auth/signup/signup.component';

@Component({
  selector: 'header',
  imports: [RouterLink, SignupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
