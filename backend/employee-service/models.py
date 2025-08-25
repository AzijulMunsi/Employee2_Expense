from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    
    bill_no = db.Column(db.String(50), nullable=False)      # <-- new
    bill_date = db.Column(db.String(20), nullable=False) 
    status = db.Column(db.String(20), nullable=False, default="pending")  # <-- new field

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "amount": self.amount,
            "date": self.date,
            "bill_no": self.bill_no,
            "bill_date": self.bill_date,
            "status": self.status
        }
