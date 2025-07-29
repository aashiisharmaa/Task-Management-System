import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', padding: '15px 20px', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}>Task Manager</Link>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '20px' }}>
          {user ? (
            <>
              <li>
                <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1em' }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ color: '#ccc', textDecoration: 'none' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ color: '#ccc', textDecoration: 'none' }}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;