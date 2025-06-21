import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../Model/auth';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth/register`;
  private baseUrl2 = `${environment.apiUrl}/auth/login`;
  

  constructor(private http: HttpClient, private router: Router) { }

  createUser(auth: Auth):Observable<Auth>{
    return this.http.post<Auth>(this.baseUrl, auth);
  }

  login(data: {email:string; password:string}):Observable<Auth>{
    return this.http.post<Auth>(this.baseUrl2, data);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
