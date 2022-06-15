import React, { useEffect, useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navi = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('chatterfield'));

    if (userData) {
      const { jwtToken } = userData;
      navi('/home', { state: { jwtToken: jwtToken } });
    } else {
      navi('/loggedout');
    }
  });

  return <div></div>;
}

export default Main;
