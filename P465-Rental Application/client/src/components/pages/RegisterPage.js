import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css'
import BackgroundImage from '../../assets/images/cars2.jpeg'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setRegistrationStatus(responseData.message);
      } else {
        setRegistrationStatus('Registration failed.');
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus('Registration failed.');
    }
  };

  return (
    <div className="text-center">
      <header style={ HeaderStyle }>
      <h1>Create your personal account</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </p>
        <div className='inner'>
          <p>
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              required
            />
            <span>
              <p className='registerLink'>I agree to all statements in
              <a className='registerLink'
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms of service.
              </a>
              </p>
            </span>
          </p>
        </div>
        <p>
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      {registrationStatus && <p>{registrationStatus}</p>}
      <footer>
        <p>
          <Link className="link1" to="/">Back to Homepage</Link>.
        </p>
      </footer>
      </header>
    </div>
  );
}


const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}