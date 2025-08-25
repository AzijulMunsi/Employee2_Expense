from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Expense

app = Flask(__name__)
CORS(app)

# SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create tables if not exist
with app.app_context():
    db.create_all()

# -------------------- Routes --------------------

# Add expense
@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    amount = data.get('amount')
    date = data.get('date')
    bill_no = data.get('bill_no')
    bill_date = data.get('bill_date')

    if not title or not amount or not date:
        return jsonify({"msg": "Title, amount, date, bill no, and bill date are required"}), 400

    expense = Expense(
        title=title,
        description=description,
        amount=amount,
        date=date,
        bill_no=bill_no,
        bill_date=bill_date,
        status="pending"  # default status
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({"msg": "Expense added successfully", "expense": expense.to_dict()}), 201

# Get all expenses
@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([e.to_dict() for e in expenses])

# Update status
@app.route('/expenses/<int:id>/status', methods=['PATCH'])
def update_status(id):
    data = request.get_json()
    status = data.get('status')

    if status not in ['pending', 'approved', 'rejected']:
        return jsonify({"msg": "Invalid status"}), 400

    expense = Expense.query.get_or_404(id)
    expense.status = status
    db.session.commit()
    return jsonify({"msg": f"Expense status updated to {status}", "expense": expense.to_dict()})





# Delete expense
@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get_or_404(id)
    db.session.delete(expense)
    db.session.commit()
    return jsonify({"msg": "Expense deleted successfully"})


# -------------------- Run Server --------------------
if __name__ == '__main__':
    app.run(debug=True, port=5002)

