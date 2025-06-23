from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False) 
    last_name = db.Column(db.String(100), nullable=False) 
    email = db.Column(db.String(200), unique=True,nullable=True)
    

    def to_json(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email
        }