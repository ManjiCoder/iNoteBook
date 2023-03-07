/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function Signup() {
  const Navigate = useNavigate();
  const context = useContext(NoteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({
    name: '', email: '', password: '', cpassword: '',
  });
  const {
    name, email, password, cpassword,
  } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSingup = async (e) => {
    e.preventDefault();
    // API Call
    // DON'T USE LIKE THIS IN PRODUCTION ==> Use .config-file or .env - file to save the http://localhost:5000/api/createuser
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the token and redirect
      Navigate('/');
      localStorage.setItem('token', json.authToken);
    } else {
      showAlert('danger', json.error);
    }
    console.log(json);
  };

  return (
    <div className="container">
      <form onSubmit={handleSingup}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="name" onChange={handleOnChange} value={name} />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleOnChange} value={email} />
          <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={handleOnChange} value={password} minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confrim Password</label>
          <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={handleOnChange} value={cpassword} minLength={5} />
        </div>
        <button type="submit" disabled={(password.length || cpassword.length) < 5} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
