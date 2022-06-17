import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { LOGIN_DEMO_MSG } from '../data/config';
import InfoBox from '../components/InfoBox';
import { API } from '../data/API';
import { SHOW_MSG_TIME } from '../data/config';

function Login(props) {
  const [inputData, setInputData] = useState({
    login: '',
    pass: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const controlData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const loginAPI = new API('login');
    loginAPI.setData({
      username: inputData.login,
      password: inputData.pass,
      ttl: 3600,
    });
    loginAPI.getData(handleAPIAnswer);
  };

  const handleAPIAnswer = (res) => {
    if (res.data.error || res.status !== 200) {
      setMsg('Wrong login or password');
      setTimeout(() => setMsg(''), SHOW_MSG_TIME);
    } else {
      const { username, jwt_token: jwtToken } = res.data;
      localStorage.setItem(
        'chatterfield',
        JSON.stringify({ username, jwtToken, loginTime: Date.now() })
      );
      props.setLoginGate(true);
      navigate('/');
    }
  };

  return (
    <div>
      <form className='login-form' onSubmit={submitLogin}>
        {msg && <InfoBox msg={msg} />}
        <input readOnly type='text' value={LOGIN_DEMO_MSG} />
        <input name='login' type='text' onChange={controlData} />
        <input name='pass' type='password' onChange={controlData} />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default Login;
