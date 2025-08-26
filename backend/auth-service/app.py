from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User

app = Flask(__name__)
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    # Pre-register manager if not exists
    if not User.query.filter_by(username='manager1').first():
        manager = User(username='manager1', role='manager')
        manager.set_password('manager123')
        db.session.add(manager)
        db.session.commit()

# Signup endpoint (allowing employee or manager from client)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'employee')  # allow client to set role; default to employee

    if role not in ['employee', 'manager']:
        return jsonify({'msg': 'Invalid role'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'msg': 'Username already exists'}), 400

    user = User(username=username, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'msg': f'{role.capitalize()} account created successfully'}), 201

# Login endpoint (for both employee and manager)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'msg': 'Invalid credentials'}), 401

    return jsonify({
        'msg': 'Login successful',
        'role': user.role,
        'username': user.username
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
