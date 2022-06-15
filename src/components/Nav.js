import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../data/API';

function Nav(props) {
  let navigate = useNavigate();

  const logout = () => {
    const { jwtToken } = JSON.parse(localStorage.getItem('chatterfield'));
    const logoutAPI = new API('logout', jwtToken);
    logoutAPI.getData(handleAPIAnswer);
  };

  const handleAPIAnswer = (res) => {
    props.setLoginGate(false);
    localStorage.removeItem('chatterfield');
    navigate('/');
  };

  return (
    <nav className='main-nav'>
      <h2 onClick={() => navigate('/')}>Chatterfield</h2>
      <ul>
        <Link className='nav-item' to={'/'}>
          Home
        </Link>
        {props.loginGate || (
          <Link className='nav-item' to={'/login'}>
            Log In
          </Link>
        )}
        {props.loginGate || (
          <Link className='nav-item' to={'/signup'}>
            Sign Up!
          </Link>
        )}
        {props.loginGate && (
          <button onClick={logout} className='nav-item'>
            Log out
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
