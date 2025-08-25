import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  title = '';
  description = '';
  amount: number | null = null;
  date = '';

  constructor(private http: HttpClient, private router: Router) {}

  addExpense() {
    if (!this.title || !this.amount || !this.date) {
      alert('Title, Amount, and Date are required');
      return;
    }

    const expense = {
      title: this.title,
      description: this.description,
      amount: this.amount,
      date: this.date
    };

    this.http.post('http://127.0.0.1:5002/expenses', expense)
      .subscribe({
        next: (res: any) => {
          alert(res.msg);
          // clear form
          this.title = '';
          this.description = '';
          this.amount = null;
          this.date = '';
          // optionally redirect to expense list
          // this.router.navigate(['/employee/expense-list']);
        },
        error: (err) => {
          alert(err.error.msg || 'Something went wrong');
        }
      });
  }
}
