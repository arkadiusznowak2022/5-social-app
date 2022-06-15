import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { checkPassword, removeWhiteSpaces } from '../data/tools';
import { API } from '../data/API';
import { WRONG_PASS_MSG, DIFF_PASS_MSG, SHOW_MSG_TIME } from '../data/config';
import InfoBox from '../components/InfoBox';

function SignUp() {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    pass: '',
    passControl: '',
  });
  const [msg, setMsg] = useState('');
  const navi = useNavigate();

  const controlData = (e) => {
    const name = e.target.name;
    let val = e.target.value;
    if (name === 'name') val = removeWhiteSpaces(val);

    setInputData({
      ...inputData,
      [name]: val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;

    if (inputData.pass !== inputData.passControl) {
      flag = false;
      setMsg(DIFF_PASS_MSG);
    }
    if (!checkPassword(inputData.pass)) {
      flag = false;
      setMsg(WRONG_PASS_MSG);
    }

    if (flag) {
      const signUpAPI = new API('signup');
      signUpAPI.setData({
        username: inputData.name,
        email: inputData.email,
        password: inputData.pass,
      });
      signUpAPI.getData(handleAPIAnswer);
    }
  };

  const handleAPIAnswer = (res) => {
    setMsg(
      `${
        res.data.signedup
          ? 'You have a new account!'
          : Object.values(res.data.message)[0][0]
      }`
    );

    setTimeout(() => {
      setMsg('');
      if (res.data.signedup) navi('/login');
    }, SHOW_MSG_TIME);
  };

  return (
    <div>
      <form className='signup-form' onSubmit={handleSubmit}>
        {msg && <InfoBox msg={msg} />}
        <input
          className='input'
          name='name'
          type='text'
          minLength={4}
          value={inputData.name}
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='email'
          type='email'
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='pass'
          type='password'
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='passControl'
          type='password'
          onChange={controlData}
          required
        />
        <button type='submit'>Sign Up!</button>
      </form>
    </div>
  );
}

export default SignUp;
