import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginFormValues, RegisterFormValues } from '../types/FormValues';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.BACK_URL}/auth`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(data: RegisterFormValues) {
    this.httpClient.post(`${this.baseURL}/register`, data).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  login(data: LoginFormValues) {
    this.httpClient.post(`${this.baseURL}/login`, data).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
