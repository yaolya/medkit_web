from backend.database import db

# class MedicamentsUsers(db.Model):
#     'medicaments_users',
#     id = db.Column(db.Integer, primary_key=True)
#     medicament_id = db.Column(db.Integer, db.ForeignKey('medicament.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     category_id = db.Column(db.Integer(), nullable=True)
#     medicament = db.relationship('Medicament', backref=db.backref('medicaments_users'))
#     user = db.relationship('User', backref=db.backref('medicaments_users'))


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    products = db.relationship('Product', backref='products')
    categories = db.relationship('Category', backref=db.backref('categories'))
    # usersmedicaments = db.relationship('Medicament', secondary='medicaments_users', backref='usersmedicaments')
    
    def get_id(self):
        return self.id

medicaments_categories = db.Table(
    'medicaments_categories',
    db.Column('medicament_id', db.Integer(), db.ForeignKey('medicament.id')),
    db.Column('category_id', db.Integer(), db.ForeignKey('category.id'))
)

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(400), nullable=True)
    # is_default = db.Column(db.Boolean)

    medicaments = db.relationship('Medicament', secondary=medicaments_categories, backref=db.backref('medicament', lazy='dynamic'))
    user_id = db.Column(db.ForeignKey('user.id'))

class Manufacturer(db.Model):
    __tablename__ = 'manufacturer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    # medicament = db.relationship('Medicament', backref=db.backref('medicament', cascade="all,delete"))

# class Disease(db.Model):
#     __tablename__ = 'disease'
#     id = db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(255), nullable=False)

# medicaments_diseases = db.Table(
#     'medicaments_diseases',
#     db.Column('medicament_id', db.Integer(), db.ForeignKey('medicament.id')),
#     db.Column('disease_id', db.Integer(), db.ForeignKey('disease.id'))
# )

class Medicament(db.Model):
    __tablename__ = 'medicament'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    pharm_properties = db.Column(db.Text, nullable=True)
    contraindications = db.Column(db.Text, nullable=True)
    side_effects = db.Column(db.Text, nullable=True)
    mode_of_application = db.Column(db.Text, nullable=True)
    driving = db.Column(db.Boolean, nullable=True)
    storage_temperature = db.Column(db.Integer, nullable=True)
    prescription_required = db.Column(db.Boolean, nullable=True)
    manufacturer_id = db.Column(db.Integer(), db.ForeignKey('manufacturer.id'))
    image_data = db.Column(db.LargeBinary)
    image_name = db.Column(db.String(100))

    # diseases = db.relationship('Disease', secondary=medicaments_diseases, backref=db.backref('medicament', lazy='dynamic'))
    # users = db.relationship("MedicamentsUsers", back_populates="medicament")


class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('user.id'), nullable=False)
    expiration_date = db.Column(db.Date, nullable=True)
    medicament_id = db.Column(db.ForeignKey('medicament.id'), nullable=False)


    
