import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticated = signal<boolean>(false);

  // Simulated users database
  private users: (User & { password: string })[] = [
    { id: 1, email: 'admin@example.com', name: 'Admin User', password: '123456' }
  ];

  readonly user = this.currentUser.asReadonly();
  readonly authenticated = this.isAuthenticated.asReadonly();

  constructor(private router: Router) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: LoginCredentials): { success: boolean; message: string } {
    const user = this.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const { password, ...userData } = user;
      this.currentUser.set(userData);
      this.isAuthenticated.set(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, message: 'Login exitoso' };
    }

    return { success: false, message: 'Credenciales inválidas' };
  }

  register(data: RegisterData): { success: boolean; message: string } {
    const existingUser = this.users.find((u) => u.email === data.email);

    if (existingUser) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser = {
      id: this.users.length + 1,
      email: data.email,
      name: data.name,
      password: data.password
    };

    this.users.push(newUser);

    const { password, ...userData } = newUser;
    this.currentUser.set(userData);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { success: true, message: 'Registro exitoso' };
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }
}
