import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../Model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/register';
  private baseUrl2 = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  createUser(auth: Auth):Observable<Auth>{
    return this.http.post<Auth>(this.baseUrl, auth);
  }

  login(data: {email:string; password:string}):Observable<Auth>{
    return this.http.post<Auth>(this.baseUrl2, data);
  }
}
