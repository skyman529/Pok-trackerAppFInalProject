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
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center" id='header'>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
            <h1 className="m-0" id='pokeball'>
              <img src={pokemon} alt="Pokemon Logo"/>
            </h1>
          <p className="m-0" id="title">Track Your Collection and Catch Em All!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
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
