/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function Login() {
  const Navigate = useNavigate();
  const context = useContext(NoteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // API Call
    // DON'T USE LIKE THIS IN PRODUCTION ==> Use .config-file or .env - file to save the http://localhost:5000/api/login
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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
    <div className="container mt-5">
      <form onSubmit={handleLogin}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleOnChange} value={credentials.email} />
          <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handleOnChange} value={credentials.password} />
        </div>
        <button type="submit" disabled={password.length < 5} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
