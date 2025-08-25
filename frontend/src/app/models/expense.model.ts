export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  bill_no: string;      // <-- new
  bill_date: string;    // <-- new
  status: 'pending' | 'approved' | 'rejected'; // <-- add this
}
