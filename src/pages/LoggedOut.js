import React, { Component } from 'react';
import './LoggedOut.css';
import { API } from '../data/API';
import { TIME_TO_LOGIN_POPUP } from '../data/config';

import Posts from '../components/Posts';
import Hello from '../components/Hello';
import LoginPopup from '../components/LoginPopup';

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      bombingPopup: '',
    };
  }

  apiHandler = (res) => {
    this.setState({
      apiData: res,
    });
  };

  componentDidMount() {
    const globalAPI = new API('global');
    globalAPI.getData(this.apiHandler);
    setTimeout(() => {
      this.setState({
        bombingPopup: <LoginPopup setLoginGate={this.props.setLoginGate} />,
      });
    }, TIME_TO_LOGIN_POPUP);
  }

  componentWillUnmount() {
    this.setState({
      bombingPopup: '',
    });
  }

  render() {
    return (
      <div className='main-cont'>
        <Posts posts={this.state.apiData.data} />
        <Hello />
        {this.state.bombingPopup}
      </div>
    );
  }
}

export default LoggedOut;
