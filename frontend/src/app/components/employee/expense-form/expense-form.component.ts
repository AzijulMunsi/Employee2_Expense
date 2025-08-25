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
  bill_no = '';       // <-- new
  bill_date = '';     // <-- new

  constructor(private http: HttpClient, private router: Router) {}

  addExpense() {
    if (!this.title || !this.amount || !this.date || !this.bill_no || !this.bill_date) {
      alert('Title, Amount, Date, Bill No, and Bill Date are required');
      return;
    }

    const expense = {
      title: this.title,
      description: this.description,
      amount: this.amount,
      date: this.date,
      bill_no: this.bill_no,       // <-- send
      bill_date: this.bill_date
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
          this.bill_no = '';
          this.bill_date = '';
          // optionally redirect to expense list
          this.router.navigate(['/employee/expense-list']);
        },
        error: (err) => {
          alert(err.error.msg || 'Something went wrong');
        }
      });
  }
}
