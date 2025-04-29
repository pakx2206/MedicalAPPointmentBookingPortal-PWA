// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] 
})
export class RegisterComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async onRegister() {
    this.error = null;
    try {
      await this.auth.register(this.email, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
