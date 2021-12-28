from flask import Flask, session, abort
from flask.json import jsonify
from flask_cors import CORS
from backend.database import db
import backend.config
import backend.models
from backend.category.route import categories
from backend.medicament.route import medicaments
from backend.product.route import products
from backend.user.route import users
from sqlalchemy_utils import database_exists, create_database, drop_database


def create_app():
    app = Flask(__name__)
    # CORS(app)

    app.config.from_object('backend.config.Config')
    db.init_app(app)

    @app.after_request
    def apply_caching(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,authorization"
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    @app.errorhandler(404)
    def page_not_found(error):
        return jsonify({"error": 404})

    @app.route('/')
    def check_working():
        return 'check working'

    app.register_blueprint(users, url_prefix='/users')
    app.register_blueprint(products, url_prefix='/products')
    app.register_blueprint(categories, url_prefix='/categories')
    app.register_blueprint(medicaments, url_prefix='/medicaments')
    
    with app.app_context():
        db.create_all()
        ssl_context=('cert.pem', 'key.pem')

        return app


