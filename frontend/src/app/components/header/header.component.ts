import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="navbar bg-base-200 shadow-md">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl">Mi App</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        @if (authService.authenticated()) {
          <span class="text-base-content/70">Bienvenido, {{ authService.user()?.name }}</span>
        }
      </div>
      <div class="navbar-end">
        @if (authService.authenticated()) {
          <button class="btn btn-ghost btn-sm" (click)="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        }
      </div>
    </div>
  `
})
export class HeaderComponent {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
  }
}
