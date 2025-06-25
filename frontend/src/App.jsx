import React, { useState, useEffect } from 'react';
import ContactList from './ContactList'; // Import the ContactList component
import './App.css';
import ContactForm from './ContactForm'; // Import the ContactForm component

function App() {
  const [contacts, setContacts] = useState([]); // Initialize state to hold contacts
  const [ismodalOpen, setIsModalOpen] = useState(false); // A modal is a dialog box/popup that is displayed on top of the current page, often used for forms or alerts.
  const [currentContact, setCurrentContact] = useState({}); // State to hold the contact being edited

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('http://127.0.0.1:5000/contacts') // This the URL as defined in the Flask app
    const data = await response.json(); // Parse the JSON response
    setContacts(data.contacts); 
    console.log(data.contacts); 
  }

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal when the user clicks outside the modal or on the close button
    setCurrentContact({}); // Reset the current contact when closing the modal
  }

  const openModal = () => {
    if (!ismodalOpen) setIsModalOpen(true); // Function to open the modal when creating a new contact
  }

  const openEditModal = (contact) => {
    if (ismodalOpen) return
    setCurrentContact(contact); // Set the current contact to the one being edited
    setIsModalOpen(true); // Open the modal for editing
  }

  const onUpdate = () => {
    closeModal(); // Close the modal after updating
    fetchContacts(); // Fetch contacts again after updating to refresh the list
  }

  return (
  <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/> 
    <button onClick={openModal}>Create New Contact</button> {/* Button to open the modal for creating a new contact */}
    {ismodalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
    )}
  </>
  ) // Render the ContactList component with the fetched contacts
}

export default App;
