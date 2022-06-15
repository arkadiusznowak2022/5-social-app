import React from 'react';
import './LoginPopup.css';
import Login from '../pages/Login';

function LoginPopup({ setLoginGate }) {
  return (
    <div className='popup-cont'>
      <Login setLoginGate={setLoginGate} />
    </div>
  );
}

export default LoginPopup;
