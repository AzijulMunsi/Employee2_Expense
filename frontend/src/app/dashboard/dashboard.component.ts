import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',   // <-- FIXED
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Get user info from localStorage
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';

    // If no user info, redirect to login
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}



