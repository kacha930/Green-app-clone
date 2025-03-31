from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True)
    password_hash = db.Column(db.String(128))
    profile_pic = db.Column(db.String(255), default="/profile/default.png")
    created_at = db.Column(db.DateTime, server_default=func.now())
    
   
    sent_messages = db.relationship('Chat', foreign_keys='Chat.sender_id', backref='sender', lazy='dynamic')
    received_messages = db.relationship('Chat', foreign_keys='Chat.recipient_id', backref='recipient', lazy='dynamic')
    
    def __init__(self, email, username=None, password=None):
        self.email = email
        self.username = username or email.split('@')[0]
        if password:
            self.set_password(password)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'profile_pic': self.profile_pic,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Chat(db.Model):
    __tablename__ = 'chats'
    
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now())
    read = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'read': self.read
        }