import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, type LoginCredentials } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    // Simular delay de red
    setTimeout(() => {
      const result = this.authService.login(this.credentials);
      
      if (result.success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set(result.message);
      }
      
      this.loading.set(false);
    }, 500);
  }
}
