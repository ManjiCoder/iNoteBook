import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function Navbar() {
  const { pathname } = useLocation();
  const { showAlert } = useContext(NoteContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert('danger', 'Logout Successfully');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link className="btn btn-primary mx-1" type="submit" to="/login">Login</Link>
                <Link className="btn btn-primary" type="submit" to="/signup">Signup</Link>
              </>
            ) : (
              <Link className="btn btn-primary mx-1" type="submit" to="/login" onClick={handleLogout}>Logout</Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
