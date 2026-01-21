import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, type LoginCredentials } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected credentials: LoginCredentials = {
    email: '',
    password: '',
  };

  onSubmit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService
      .login(this.credentials)
      .then((result) => {
        if (result.data?.token) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage.set(result.message || 'Error desconocido');
        }
      })
      .catch((err) => {
        this.errorMessage.set(err?.message ?? 'Error');
      })
      .finally(() => this.loading.set(false));
  }
}
