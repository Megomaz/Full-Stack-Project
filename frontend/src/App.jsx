import React, { useState, useEffect } from 'react';
import ContactList from './ContactList'; // Import the ContactList component
import './App.css';
import ContactForm from './ContactForm'; // Import the ContactForm component

function App() {
  const [contacts, setContacts] = useState([]); // Initialize state to hold contacts

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('http://127.0.0.1:5000/contacts') // This the URL as defined in the Flask app
    const data = await response.json(); // Parse the JSON response
    setContacts(data.contacts); 
    console.log(data.contacts); 
  }

  return (
  <>
    <ContactList contacts={contacts} /> 
    <ContactForm />
  </>
  ) // Render the ContactList component with the fetched contacts
}

export default App;
