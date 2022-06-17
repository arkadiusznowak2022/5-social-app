import React, { useEffect, useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import { checkLoginTime } from '../data/tools';
import { TIME_TO_LOGOUT } from '../data/config';

function Main({ setLoginGate }) {
  const navi = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('chatterfield'));

    if (userData && checkLoginTime(TIME_TO_LOGOUT)) {
      const { jwtToken } = userData;
      navi('/home', { state: { jwtToken: jwtToken } });
    } else {
      setLoginGate(false);
      navi('/loggedout');
    }
  });

  return <div></div>;
}

export default Main;
