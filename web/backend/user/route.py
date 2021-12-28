from backend.models import User
from flask import request, Blueprint, session
from flask.json import jsonify
from backend.database import db
import backend.config
from os import environ
from flask import abort
from backend.login import login_is_required
from google.oauth2 import id_token
from google.auth.transport import requests as google_auth_request


users = Blueprint('users', __name__)

def format_user(user):
    return {
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }

@users.route('/login', methods=['POST'])
def login():
    # token = request.json['id_token']
    # idinfo = id_token.verify_oauth2_token(token, google_auth_request.Request(), environ.get('GOOGLE_CLIENT_ID'))
    # print("idinfo ", idinfo)
    # userid = idinfo['sub']
    name = request.json['name']
    email = request.json['email']
    u = db.session.query(User).filter_by(email=email).first()
    if u is None:
        user = User(name=name, email=email)
        db.session.add(user)
        session["user_id"] = user.id
        db.session.commit()
        return format_user(user) 
    else: 
        session["user_id"] = u.id
        db.session.commit()
        return format_user(u)

@users.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"response": "logout completed"})

@users.route('/<id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).one()
    formated_user = format_user(user)
    return formated_user