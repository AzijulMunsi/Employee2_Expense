import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['/login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  // purely for UI (which "Login as" button the user clicked)
  selectedLoginRole: 'employee' | 'manager' = 'employee';

  constructor(private authService: AuthService, private router: Router) {}

  // keep original login logic (server decides the role)
  login() {
    // client-side guard: require non-empty username & password
    if (!this.username || !this.username.trim() || !this.password) {
      alert('Please enter both username and password');
      return;
    }

    // call login with trimmed username
    this.authService.login(this.username.trim(), this.password).subscribe({
      next: (res) => {
        alert(res.msg);

        // Save logged-in user info in localStorage
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);

        // Redirect automatically based on role
        if (res.role === 'manager') {
          this.router.navigate(['manager/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => alert(err.error?.msg || 'Login failed')
    });
  }

  // called by the two "Login as ..." buttons. keeps UX but doesn't override server-side role check.
  loginAs(role: 'employee' | 'manager') {
    this.selectedLoginRole = role;
    // simply call the same login method (server returns actual role)
    this.login();
  }
}
