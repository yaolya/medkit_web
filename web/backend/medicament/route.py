from flask.globals import session
from flask.helpers import url_for
from backend.models import Medicament, Manufacturer, Product, User
from flask import request, Blueprint, send_file, render_template
from flask.json import jsonify
from backend.database import db
from flask_restful import reqparse
import io
import base64


medicaments = Blueprint('medicaments', __name__)

def format_medicament(medicament, quantity=0):
    m = db.session.query(Manufacturer).filter_by(id=medicament.manufacturer_id).first()
    return {
        "id": medicament.id,
        "name": medicament.name,
        "pharm_properties": medicament.pharm_properties,
        "driving": medicament.driving,
        "contraindications": medicament.contraindications,
        "side_effects": medicament.side_effects,
        "mode_of_application": medicament.mode_of_application,
        "storage_temperature": medicament.storage_temperature,
        "prescription_required": medicament.prescription_required,
        "manufacturer_name": m.name, 
        "quantity": quantity
    }


@medicaments.route('/', methods=['POST'])
def add_medicament():

    try:
        data = request.get_json()
        med_pharm_properties = data['pharm_properties']
        med_name = data['name']
        med_contraindications = data['contraindications']
        med_side_effects = data['side_effects']
        med_mode_of_application = data['mode_of_application']
        if data['storage_temperature'] != '':
            med_storage_temperature = int(data['storage_temperature'])
        else:
            med_storage_temperature = None
        med_prescription_required = bool(data['prescription_required'])
        med_driving = bool(data['driving'])
        manufacturer_name = data['manufacturer_name']

        m = db.session.query(Manufacturer).filter_by(name=manufacturer_name).first()

        if manufacturer_name != '':
            if m is None:
                m = Manufacturer(name=manufacturer_name)
                db.session.add(m)
                db.session.flush()
            new_medicament = Medicament(name=med_name, image_data=None, image_name=None, pharm_properties=med_pharm_properties, manufacturer_id=m.id, contraindications=med_contraindications, side_effects=med_side_effects, mode_of_application=med_mode_of_application, driving=med_driving, storage_temperature=med_storage_temperature, prescription_required=med_prescription_required)

        db.session.add(new_medicament)
        db.session.commit()

        return {
            "id": new_medicament.id,
            "name": new_medicament.name,
            "manufacturer_name": m.name
        }
    except Exception as e: 
        db.session.rollback()
        print("Error adding to database: ", e)

@medicaments.route('/image/<id>', methods=['POST'])
def add_image(id):
    medicament = db.session.query(Medicament).filter_by(id=int(id)).first()
    files = request.files
    img_name = files['image']
    if len(files) > 0:
        med_img = request.files['image']
        if med_img is not None:
            medicament.image_data = med_img.read()
            medicament.image_name = med_img.filename
            db.session.add(medicament)
            db.session.commit()
            return send_file(io.BytesIO(medicament.image_data), attachment_filename=medicament.image_name, as_attachment=True)
        else: 
            print("no image added")
            return f'no image added to {id} medicament'
    else:
        return ('', 204)

@medicaments.route('/image/<id>', methods=['GET'])
def get_image(id):
    medicament = db.session.query(Medicament).filter_by(id=int(id)).first()
    if medicament.image_data is not None:
        return send_file(io.BytesIO(medicament.image_data), attachment_filename=medicament.image_name, as_attachment=True)
    else:
        return ('', 204)

@medicaments.route('/', methods=['GET'])
def get_medicaments():
    medicaments = Medicament.query.order_by(Medicament.id.asc()).all()
    medicaments_list = []
    for medicament in medicaments:
        medicaments_list.append(format_medicament(medicament))
    medicaments_list_json = jsonify(medicaments_list)
    medicaments_list_json.headers.add("x-total-count", len(medicaments_list))
    return medicaments_list_json

@medicaments.route('/<id>', methods=['GET'])
def get_medicament(id):
    medicament = Medicament.query.filter_by(id=id).one()
    formated_medicament = format_medicament(medicament)
    return formated_medicament

@medicaments.route('/array', methods=['GET'])
def get_medicaments_by_id_array(args):
    medicaments_list = []
    for key in args:
        medicament = Medicament.query.filter_by(id=key).one()
        medicaments_list.append(format_medicament(medicament, args[key]))
    print("products ", medicaments_list )
    return jsonify(medicaments_list)

@medicaments.route('/<id>', methods=['DELETE'])
def delete_medicament(id):
    medicament = Medicament.query.filter_by(id=id).one()
    m = db.session.query(Manufacturer).filter_by(id=medicament.manufacturer_id).first()
    medicaments = Medicament.query.filter_by(manufacturer_id=m.id).all()
    products = Product.query.filter_by(medicament_id=id).all()
    for product in products:
        db.session.delete(product)
        db.session.flush()
    db.session.delete(medicament)
    db.session.flush()
    if len(medicaments) == 1:
        db.session.delete(m)
    db.session.commit()
    return f'medicament {id} deleted'


@medicaments.route('/<id>', methods=['PUT'])
def update_medicament(id):
    medicament = Medicament.query.filter_by(id=int(id))
    med = db.session.query(Medicament).filter_by(id=int(id)).first()
    data = request.get_json()
    med_pharm_properties = data['pharm_properties']
    med_name = data['name']
    med_contraindications = data['contraindications']
    med_side_effects = data['side_effects']
    med_mode_of_application = data['mode_of_application']
    if data['storage_temperature'] != '' and  data['storage_temperature'] != None:
        med_storage_temperature = int(data['storage_temperature'])
    else:
        med_storage_temperature = None
    med_prescription_required = bool(data['prescription_required'])
    med_driving = bool(data['driving'])
    manufacturer_name = data['manufacturer_name']
    m = db.session.query(Manufacturer).filter_by(id=med.manufacturer_id).first()
    if manufacturer_name != '':
            m.name = manufacturer_name
            db.session.add(m)
            db.session.flush()
    if med_name != '':
        medicament.update(dict(name=med_name, pharm_properties=med_pharm_properties, contraindications=med_contraindications, side_effects=med_side_effects, mode_of_application=med_mode_of_application, driving=med_driving, storage_temperature=med_storage_temperature, prescription_required=med_prescription_required))
    db.session.commit()
    return {
            "id": medicament.one().id,
            "name": medicament.one().name,
            "manufacturer_name": m.name
        }



