import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../utils/response.util';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticated = signal<boolean>(false);
  private readonly roleIdSignal = signal<number | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly authenticated = this.isAuthenticated.asReadonly();
  readonly roleId = this.roleIdSignal.asReadonly();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');
    if (token && storedUser) {
      const user = JSON.parse(storedUser) as User;
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch (e) {
      return null;
    }
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token?: string }>> {
    try {
      const url = `${environment.apiBaseUrl}/auth/login`;
      const obs = this.http.post<ApiResponse<{ token: string }>>(url, {
        identifier: credentials.email,
        password: credentials.password,
      });
      const data = await lastValueFrom(obs);
      const token = data?.data?.token;
      if (token == null) {
        return { message: 'Token no recibido' };
      }
      localStorage.setItem('token', token);
      const payload = this.decodeToken(token) ?? {};
      const roleId = payload.roleId ?? null;
      if (roleId != null) {
        localStorage.setItem('roleId', String(roleId));
        this.roleIdSignal.set(roleId);
      }
      const user: User = {
        id: payload.id ?? 0,
        email: payload.username ?? '',
        name: payload.username ?? '',
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      return { data: { token }, message: ' Login exitoso' };
    } catch (error: any) {
      const msg = error?.error?.message ?? error?.message ?? 'Error de red';
      return { message: msg };
    }
  }

  register(data: RegisterData): { success: boolean; message: string } {
    // keep local/register simulation for now
    return { success: false, message: 'Registro no implementado en frontend' };
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
