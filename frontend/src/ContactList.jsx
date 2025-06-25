import React from 'react'

const ContactList = ({ contacts, updateContact, updateCallback }) => { // Define a functional component that takes contacts as a prop
  const onDelete = async (id) => {
    try {
      const options = {
        method: 'DELETE' // Specify the method as DELETE
      }
      const response = await fetch(`http://127.0.0.1:5000/delete-contact/${id}`, options)
      if (response.status === 200) {
        updateCallback() // Call the updateCallback function to refresh the contact list
      } else {
        console.error('Failed to delete contact') // Log an error if the deletion fails
      }
    } catch (error) {
        alert(error)
    }
  }
  
  return <div >
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => ( // Map through contacts and create a row for each
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>
                  <button onClick={() => updateContact(contact)}> Edit</button>
                  <button onClick={() => onDelete(contact.id)}> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
}

export default ContactList; // Export the component so it can be used in other files