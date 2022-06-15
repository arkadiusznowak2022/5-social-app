import React from 'react';
import './InfoBox.css';

function InfoBox(props) {
  return (
    <div className='info-cont'>
      <p className='info-text'>{props.msg}</p>
    </div>
  );
}

export default InfoBox;
