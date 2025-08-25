export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected'; // <-- add this
}
