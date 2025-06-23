# CRUD - create, read, update, delete

from flask import Flask, request, jsonify
from config import app, db
from models import Contact

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all() # Retrieve all contacts from the database
    json_contacts = list(map(lambda x: x.to_json(), contacts))  # Convert each contact to JSON format
    return jsonify({"contacts": json_contacts}) # Return the list of contacts as JSON as we cant return python objects

@app.route('/create_contact', methods=['POST'])
def create_contact():
    first_name = request.json.get('firstName') # Get the first name from the JSON request body
    last_name = request.json.get('lastName') # Get the last name from the JSON request body
    email = request.json.get('email') # Get the email from the JSON request body

    if not first_name or not last_name or not email:  # Check if first name and last name are provided
        return jsonify({"error": "First name, last name and email are required"}),400, # Return an error if not (400 Bad Request)

    try:
        new_contact = Contact(first_name=first_name, last_name=last_name, email=email)  # Create a new Contact object
        db.session.add(new_contact)  # Add the new contact to the database session
        db.session.commit()  # Commit the session to save the new contact to the database
        return jsonify({"message": "Contact created successfully"}), 201  # Return a success
    except Exception as e:
        return jsonify({"error": str(e)}), 400  # Return an error if there was an issue creating the contact

@app.route('/update-contact/<int:id>', methods=['PATCH'])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:  # Check if the contact exists
        return jsonify({"error": "Contact not found"}), 404  # Return an error
    data = request.json  # Get the JSON data from the request body
    contact.first_name = data.get('firstName', contact.first_name) # Update the first name if provided else keep the existing one
    contact.last_name = data.get('lastName', contact.last_name) # Update the last name if provided else keep the existing one
    contact.email = data.get('email', contact.email) # Update the email if provided else keep the existing one
    db.session.commit() 

    return jsonify({"message": "Contact updated successfully"}), 200  # Return a success message

@app.route('/delete-contact/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)

    if not contact:  # Check if the contact exists
        return jsonify({"error": "Contact not found"}), 404  # Return an error
    db.session.delete(contact)  # Delete the contact from the database session
    db.session.commit()  # Commit the session to save the changes
    return jsonify({"message": "Contact deleted successfully"}), 200  # Return a success

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)  # Run the Flask application in debug mode