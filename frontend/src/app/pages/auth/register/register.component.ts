import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, type RegisterData } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected registerData: RegisterData = {
    name: '',
    email: '',
    password: ''
  };

  protected confirmPassword = '';

  onSubmit(): void {
    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    // Simular delay de red
    setTimeout(() => {
      const result = this.authService.register(this.registerData);
      
      if (result.success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set(result.message);
      }
      
      this.loading.set(false);
    }, 500);
  }
}
