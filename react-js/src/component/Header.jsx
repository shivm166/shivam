import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import './Home.css';

function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link to="/" className='links'>Home</Link>

        <input
          type="text"
          placeholder="Search Products"
          className="search"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />

        <button className="button" onClick={() => props.handleClick && props.handleClick()}>
          SEARCH
        </button>
      </div>

      <div>

            {!!localStorage.getItem('token') && 
             <Link to="/add-product" >
               <button className="logout-btn">ADD PRODUCT
               </button>
              </Link>}

        {!localStorage.getItem('token') ? (
          <Link to="/login" className="logout-btn">Login</Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
