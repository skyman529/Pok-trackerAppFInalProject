import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gif from '../Footer/pikachu-kantocap.gif';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer id="foot" className="w-100 mt-auto bg-blue p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            id="pokeCard"
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <br></br>
        <br></br>
        <br></br>

        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Ryan, Faith, Cassidy, Eugene, Skylar, and Tim.
        </h4>
        <img src={gif} alt="pikachu" />
      </div>
    </footer>
  );
};

export default Footer;
