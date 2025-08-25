import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']
  
})
export class SignupComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.username, this.password).subscribe({
      next: () => {
        alert('Employee account created successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error.msg)
    });
  }
}

