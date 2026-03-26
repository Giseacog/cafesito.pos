import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginFormValues, RegisterFormValues } from '../types/FormValues';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { supabase } from '../lib/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.BACK_URL}/auth`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  // REGISTER BACK
  // register(data: RegisterFormValues) {
  //   this.httpClient.post(`${this.baseURL}/register`, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.router.navigate(['/login']);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  //Register managed by Supabase
  async register(data: RegisterFormValues) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: 'collaborator',
        },
      },
    });
    if (error) {
      console.error(error.message);
      return;
    }

    this.router.navigate(['/login']);
  }

  // LOGIN BACKEND
  // login(data: LoginFormValues) {
  //   this.httpClient.post(`${this.baseURL}/login`, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  //Login
  async login(formValues: LoginFormValues) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    console.log(error);
    if (error) {
      console.error(error.message);
      return;
    }

    const { error: profilesError, data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profilesError) {
      console.log(profilesError.message);
      return;
    }
    localStorage.setItem('user', JSON.stringify(profilesData));
    //YA LO HACE SUPABASE THANKS!!

    if (profilesData.role === 'collaborator') {
      this.router.navigate(['/sales']);
      return;
    }
    this.router.navigate(['/products']);
  }

  async logout() {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
}
