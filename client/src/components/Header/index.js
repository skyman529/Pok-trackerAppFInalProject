import React from 'react';
import { Link } from 'react-router-dom';
import pokemon from '../Header/pokemon1.png'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-blue text-light mb-4 py-3 flex-row align-center" id='header'>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <h1 className="m-0" id='pokeball'>
            <img src={pokemon} alt="Pokemon Logo" />
          </h1>
          <p className="m-0" id="title">Track Your Collection and Catch Em All!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg  m-2" to="/">
                <div className="navigation">Home</div>
              </Link>
              <Link className="btn btn-lg  m-2" to="/me">
                <div className="navigation">{Auth.getProfile().data.username}'s profile</div>
              </Link>
              <button className="navigation btn btn-lg  m-2" onClick={logout}>
                <div className="navigation">Logout</div>
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg bg-white m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg  m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
