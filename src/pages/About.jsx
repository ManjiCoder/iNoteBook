/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const Navigate = useNavigate();

  // For protected routes
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate('/login');
    }
  }, []);
  return (
    <div className="">
      About page
    </div>
  );
}

export default About;
