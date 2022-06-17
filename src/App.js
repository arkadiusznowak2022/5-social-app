import './App.css';
import { useState } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Main from './pages/Main';
import LoggedOut from './pages/LoggedOut';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

import Nav from './components/Nav';
import { checkLoginTime } from './data/tools';
import { useEffect } from 'react';
import { TIME_TO_LOGOUT } from './data/config';

function App() {
  const storage = localStorage.getItem('chatterfield');
  const [loginGate, setLoginGate] = useState(
    checkLoginTime(storage, TIME_TO_LOGOUT)
  );

  return (
    <HashRouter basename='/'>
      <Nav loginGate={loginGate} setLoginGate={setLoginGate} />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route
          path='/loggedout'
          element={<LoggedOut setLoginGate={setLoginGate} />}
        />
        <Route path='/login' element={<Login setLoginGate={setLoginGate} />} />
        <Route path='/signup' element={<SignUp />} />
        {loginGate && <Route path='/home' element={<Home />} />}
        {!loginGate && (
          <Route path='/home' element={<Navigate replace to='/' />} />
        )}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
