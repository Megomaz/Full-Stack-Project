from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # prevents frontend from being blocked by CORS policy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to save memory

db = SQLAlchemy(app) # Initialize the SQLAlchemy object