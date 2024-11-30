import React from 'react';
import "../styles/Navhead.css";

function Navhead() {
  const user = JSON.parse(localStorage.getItem('currentuser'));

  const logout = function () {
    localStorage.removeItem('currentuser');
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="navbar-cont">
        <div className='navitem'>
          <a className="navbar-brand" href="/">
            KEC GUEST HOUSE
          </a>
          <div className="navbar-links">
            <a className="nav-link" href="/home">Home</a>
            <a className="nav-link" href="/features">Features</a>
            <a className="nav-link" href="/feedback">Feedback</a>
            <a className="nav-link" href="/contact">Contact Us</a>
          </div>
          <div>
            {user ? (
              <div className="dropdown">
                <button className="dropdown-button">
                  {user.name}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/profile">Profile</a>
                  <a
                    className="dropdown-item"
                    href="https://arcanemirage.com/project/2301?token=5bLNP2Q4GZTz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VR
                  </a>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a className="nav-link" href="/register">Register</a>
                <a className="nav-link" href="/login">Login</a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navhead;
