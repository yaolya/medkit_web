from jinja2.utils import is_undefined
from backend import medicament
from backend.medicament.route import format_medicament
from backend.models import Category, User, Medicament
from flask import request, Blueprint, session
from flask.json import jsonify
from backend.database import db


categories = Blueprint('categories', __name__)

def format_category(category):
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description
    }

@categories.route('/<userid>', methods=['POST'])
def create_category(userid):
    name = request.json['name']
    description = request.json['description']
    category = Category(name=name, description=description, user_id=userid)
    db.session.add(category)
    db.session.commit()
    return format_category(category) 

@categories.route('/<medicament_id>/<category_id>', methods=['POST'])
def add_medicament_to_category(medicament_id, category_id):
    category = Category.query.filter_by(id=category_id).first()
    medicament = Medicament.query.filter_by(id=medicament_id).first()
    if medicament not in category.medicaments:
        category.medicaments.append(medicament)
    db.session.add(category)
    db.session.commit()
    return format_category(category)

@categories.route('/all/<userid>', methods=['GET'])
def get_categories(userid):
    categories = Category.query.filter_by(user_id=userid).all()
    categories_list = []
    for category in categories:
        categories_list.append(format_category(category))
    categories_list_json = jsonify(categories_list)
    return categories_list_json

@categories.route('/users/<userid>', methods=['GET'])
def get_users_categories(userid):
    categories = Category.query.filter_by(user_id=userid).all()
    categories_list = []
    for category in categories:
        categories_list.append(format_category(category))
    categories_list_json = jsonify(categories_list)
    return categories_list_json

@categories.route('/<id>', methods=['GET'])
def get_category_by_id(id):
    category = Category.query.filter_by(id=id).one()
    return format_category(category)

@categories.route('/<id>/medicaments', methods=['GET'])
def get_medicaments_by_category_id(id):
    medicaments_list = []
    categorymedicaments = db.session.query(Category).filter_by(id=id).first().medicaments
    for medicament in categorymedicaments:
        medicaments_list.append(format_medicament(medicament))
    return jsonify(medicaments_list)

@categories.route('/<id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.filter_by(id=id).one()
    db.session.delete(category)
    db.session.commit()
    return f'category {id} deleted'

@categories.route('/<medicament_id>/<category_id>', methods=['DELETE'])
def remove_medicament_from_category(medicament_id, category_id):
    category = Category.query.filter_by(id=category_id).first()
    medicament = Medicament.query.filter_by(id=medicament_id).first()
    category.medicaments.remove(medicament)
    db.session.commit()
    return f'medicament {medicament_id} deleted from category {category_id}'
