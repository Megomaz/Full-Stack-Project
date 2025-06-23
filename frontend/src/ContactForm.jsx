import {useState} from 'react';

const ContactForm = ({ }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault() // Prevents the page from refreshing on form submission

        const data = {
            firstName,
            lastName,
            email
        }
        const url = 'http://127.0.0.1:5000/create_contact' // URL to send the POST request to
        const options = {
            method: 'POST', // Specify the method as POST
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
            //temp
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
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm; // Export the component so it can be used in other files