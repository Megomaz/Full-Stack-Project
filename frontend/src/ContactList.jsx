import React from 'react'

const ContactList = ({ contacts }) => { // Define a functional component that takes contacts as a prop
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
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>
                  <button> Edit</button>
                  <button> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
}

export default ContactList; // Export the component so it can be used in other files