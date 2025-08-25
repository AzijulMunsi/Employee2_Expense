import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  // Fetch all expenses
  fetchExpenses() {
    this.loading = true;
    this.http.get<Expense[]>('http://127.0.0.1:5002/expenses')
      .subscribe({
        next: (res) => {
          this.expenses = res;
          this.loading = false;
        },
        error: () => {
          alert('Failed to load expenses');
          this.loading = false;
        }
      });
  }

  // Update status (Manager use-case)
  updateStatus(expenseId: number, status: 'pending' | 'approved' | 'rejected') {
    this.http.patch(`http://127.0.0.1:5002/expenses/${expenseId}/status`, { status })
      .subscribe({
        next: (res: any) => {
          alert(res.msg);
          this.fetchExpenses(); // refresh list
        },
        error: (err) => alert(err.error.msg || 'Failed to update status')
      });
  }


goBack() {
  window.history.back();  // or this.router.navigate(['/employee/dashboard']);
}




  // ✅ Delete expense (Employee use-case)
  deleteExpense(expenseId: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.http.delete(`http://127.0.0.1:5002/expenses/${expenseId}`)
        .subscribe({
          next: (res: any) => {
            alert(res.msg);
            this.fetchExpenses(); // refresh after delete
          },
          error: (err) => alert(err.error.msg || 'Failed to delete expense')
        });
    }
  }
}
