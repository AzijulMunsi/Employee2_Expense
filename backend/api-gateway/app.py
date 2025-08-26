from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Service URLs (adjust if running in Docker Compose later)
AUTH_SERVICE = "http://localhost:5001"
EMPLOYEE_SERVICE = "http://localhost:5002"

# ---------------- AUTH ROUTES ----------------
@app.route("/signup", methods=["POST"])
def signup():
    resp = requests.post(f"{AUTH_SERVICE}/signup", json=request.get_json())
    return jsonify(resp.json()), resp.status_code


@app.route("/login", methods=["POST"])
def login():
    resp = requests.post(f"{AUTH_SERVICE}/login", json=request.get_json())
    return jsonify(resp.json()), resp.status_code


# ---------------- EXPENSE ROUTES ----------------
@app.route("/expenses", methods=["POST"])
def add_expense():
    resp = requests.post(f"{EMPLOYEE_SERVICE}/expenses", json=request.get_json())
    return jsonify(resp.json()), resp.status_code


@app.route("/expenses", methods=["GET"])
def get_expenses():
    resp = requests.get(f"{EMPLOYEE_SERVICE}/expenses")
    return jsonify(resp.json()), resp.status_code


@app.route("/expenses/<int:expense_id>/status", methods=["PATCH"])
def update_expense_status(expense_id):
    resp = requests.patch(
        f"{EMPLOYEE_SERVICE}/expenses/{expense_id}/status", json=request.get_json()
    )
    return jsonify(resp.json()), resp.status_code


@app.route("/expenses/<int:expense_id>", methods=["DELETE"])
def delete_expense(expense_id):
    resp = requests.delete(f"{EMPLOYEE_SERVICE}/expenses/{expense_id}")
    return jsonify(resp.json()), resp.status_code


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
