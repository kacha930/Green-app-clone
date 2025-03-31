from flask_cors import CORS
from flask_restful import Api, Resource, request
from flask import Flask, make_response, jsonify
from flask_migrate import Migrate
from models import db, User, Chat
import os, secrets
from datetime import timedelta
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, join_room, disconnect, emit


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
socketio = SocketIO(app=app, cors_allowed_origins="*")
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = secrets.token_hex(32)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)


api = Api(app=app)
CORS(app=app)
db.init_app(app=app)
jwt = JWTManager(app)
migrate = Migrate(app=app, db=db)


@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('user_id')
    if user_id:
        
        user = User.query.get(user_id)
        if user:
            join_room(user_id)
            print(f"User {user_id} connected and joined their room.")
        else:
            print(f"Invalid user ID: {user_id}")
            disconnect()
    else:
        print("User ID not provided.")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('send_message')
def handle_send_message(data):
    if not all(attr in data for attr in ["message", "sender_id", "recipient_id"]):
        return {'status': 'error', 'message': 'Required data is missing'}
    
    try:
        new_chat = Chat(
            message=data["message"],
            sender_id=data["sender_id"],
            recipient_id=data["recipient_id"]
        )
        db.session.add(new_chat)
        db.session.commit()
        
       
        emit('new_message', new_chat.to_dict(), to=data["recipient_id"])
        
        return {'status': 'success', 'data': new_chat.to_dict()}
    except Exception as e:
        print(e)
        db.session.rollback()
        return {'status': 'error', 'message': str(e)}


class Signup(Resource):
    def post(self):
        data = request.get_json()
        required_fields = ["email", "password"]
        if not all(field in data for field in required_fields):
            return make_response({"message": "Required fields: email, password"}, 400)
        
        try:
            user = User.query.filter_by(email=data["email"]).first()
            if user:
                return make_response({"message": "User already exists"}, 400)
            
            username = data.get("username") or data["email"].split("@")[0]
            new_user = User(
                email=data["email"],
                username=username,
                password=data["password"]
            )
            
            db.session.add(new_user)
            db.session.commit()
            
           
            access_token = create_access_token(identity=new_user.id)
            refresh_token = create_refresh_token(identity=new_user.id)
            
            return make_response({
                "user": new_user.to_dict(),
                "access_token": access_token,
                "refresh_token": refresh_token
            }, 201)
        except Exception as e:
            print(e)
            db.session.rollback()
            return make_response({"message": "Error signing up. Try again later"}, 500)

class Login(Resource):
    def post(self):
        data = request.get_json()
        if not all(field in data for field in ["email", "password"]):
            return make_response({"message": "Email and password are required"}, 400)
        
        try:
            user = User.query.filter_by(email=data["email"]).first()
            if not user or not user.check_password(data["password"]):
                return make_response({"message": "Invalid credentials"}, 401)
            
            # Create tokens
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            return make_response({
                "user": user.to_dict(),
                "access_token": access_token,
                "refresh_token": refresh_token
            }, 200)
        except Exception as e:
            print(e)
            return make_response({"message": "Server error"}, 500)

   
    def get(self):
        try:
            
            user = User.query.filter_by(email="test@example.com").first()
            if not user:
              
                user = User(email="test@example.com", username="testuser", password="password")
                db.session.add(user)
                db.session.commit()
            
          
            sent = user.sent_messages.all()
            received = user.received_messages.all()
            messages = sent + received
            
           
            messages.sort(key=lambda x: x.timestamp)
          
            message_dicts = [message.to_dict() for message in messages]
            
            socketio.emit("login", {"status": "success", "message": "User logged in successfully"})
            
            return make_response({"user": user.to_dict(), "messages": message_dicts}, 200)
        except Exception as e:
            print(e)
            return make_response({"message": "Server error"}, 500)

class GetMessages(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        
        try:
            user = User.query.get(user_id)
            if not user:
                return make_response({"message": "User not found"}, 404)
            
           
            sent = user.sent_messages.all()
            received = user.received_messages.all()
            messages = sent + received
            
           
            messages.sort(key=lambda x: x.timestamp)
            
           
            message_dicts = [message.to_dict() for message in messages]
            
            return make_response({"messages": message_dicts}, 200)
        except Exception as e:
            print(e)
            return make_response({"message": "Server error"}, 500)

class GetUsers(Resource):
    @jwt_required()
    def get(self):
        try:
            users = User.query.all()
            return make_response({"users": [user.to_dict() for user in users]}, 200)
        except Exception as e:
            print(e)
            return make_response({"message": "Server error"}, 500)

class SendMessage(Resource):
    @jwt_required()
    def post(self):
        sender_id = get_jwt_identity()
        data = request.get_json()
        
        if not all(attr in data for attr in ["message", "recipient_id"]):
            return make_response({"message": "Required data is missing"}, 400)
        
        try:
            new_chat = Chat(
                message=data["message"],
                sender_id=sender_id,
                recipient_id=data["recipient_id"]
            )
            db.session.add(new_chat)
            db.session.commit()
            
           
            socketio.emit("new_message", new_chat.to_dict(), to=str(data["recipient_id"]))
            
            return make_response(new_chat.to_dict(), 201)
        except Exception as e:
            print(e)
            db.session.rollback()
            return make_response({"message": "Error sending message"}, 500)


api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(GetMessages, "/messages")
api.add_resource(GetUsers, "/users")
api.add_resource(SendMessage, "/send-message")

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Chat API"})


@app.before_first_request
def create_tables():
    db.create_all()
    
   
    if User.query.count() == 0:
        users = [
            User(email="harry@example.com", username="Harry Kane", password="password"),
            User(email="son@example.com", username="Son Heung-min", password="password"),
            User(email="kulusevski@example.com", username="Kulusevski", password="password")
        ]
        db.session.add_all(users)
        db.session.commit()

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5555)