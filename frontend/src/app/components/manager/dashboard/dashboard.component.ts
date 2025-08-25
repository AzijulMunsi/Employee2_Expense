import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  bill_no: string;     // <-- new
  bill_date: string;   // <-- new
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  expenses: Expense[] = [];
  loading = true;
  username = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (!this.username) {
      this.router.navigate(['/login']);
    }
    this.fetchPendingExpenses();
  }

  fetchPendingExpenses() {
    this.loading = true;
    this.http.get<Expense[]>('http://127.0.0.1:5002/expenses')
      .subscribe({
        next: (res) => {
          // Only pending expenses
          this.expenses = res.filter(e => e.status === 'pending');
          this.loading = false;
        },
        error: () => {
          alert('Failed to load expenses');
          this.loading = false;
        }
      });
  }

  updateStatus(expenseId: number, status: 'approved' | 'rejected') {
    this.http.patch(`http://127.0.0.1:5002/expenses/${expenseId}/status`, { status })
      .subscribe({
        next: (res: any) => {
          alert(res.msg);
          this.fetchPendingExpenses(); // refresh list
        },
        error: (err) => alert(err.error.msg || 'Failed to update status')
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
