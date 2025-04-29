// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async onEmailLogin() {
    this.error = null;
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error = e.message;
    }
  }

  async onGoogleLogin() {
    this.error = null;
    try {
      await this.auth.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
