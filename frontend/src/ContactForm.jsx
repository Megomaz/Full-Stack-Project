import {useState} from 'react';

const ContactForm = ({ existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || ''); // Use existingContact.firstName if available, otherwise default to an empty string
    const [lastName, setLastName] = useState(existingContact.lastName || ''); // Use existingContact.lastName if available, otherwise default to an empty string
    const [email, setEmail] = useState(existingContact.email || ''); // Use existingContact.email if available, otherwise default to an empty string 

    const updating = Object.keys(existingContact).length > 0; // Check if existingContact has any keys to determine if we are updating an existing contact

    const onSubmit = async (e) => {
        e.preventDefault() // Prevents the page from refreshing on form submission

        const data = {
            firstName,
            lastName,
            email
        }
        const url = 'http://127.0.0.1:5000/' + (updating ? `update-contact/${existingContact.id}` : 'create_contact') // URL to send the POST request to
        const options = {
            method: updating? 'PATCH' : 'POST', // Specify the method as POST
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        }
        const response = await fetch(url, options) // Send the POST request
        if (response.status !== 201 && response.status !== 200) { // Check if the response status is not 201 or 200
            const data = await response.json() // Parse the JSON response
            alert(data.message) // Show an alert with the error message
        }else{
            updateCallback() // Call the updateCallback function to update the contact list
        }
    }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type="text"
          id='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type="text"
          id='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type="email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{updating ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default ContactForm; // Export the component so it can be used in other files