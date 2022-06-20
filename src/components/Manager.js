import React, { useState } from 'react';
import './Manager.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Manager({ type, managerHandler, manageManager }) {
  const [textVal, setTextVal] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [tillDate, setTillDate] = useState(new Date());

  const data = {
    add: textVal,
    from: fromDate,
    till: tillDate,
  };

  return (
    <div className='manager-cont'>
      {type === 'add' && (
        <textarea
          className='textIn'
          onChange={(e) => setTextVal(e.target.value)}
          maxLength={200}
          value={textVal}
        ></textarea>
      )}
      {type === 'from' && (
        <DatePicker
          className='date-picker'
          dateFormat={'dd-MM-yyyy'}
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
        />
      )}
      {type === 'till' && (
        <DatePicker
          className='date-picker'
          dateFormat={'dd-MM-yyyy'}
          selected={tillDate}
          onChange={(date) => setTillDate(date)}
        />
      )}
      {type && type !== 'newest' && (
        <button
          onClick={() => {
            setTextVal('');
            manageManager('');
            managerHandler(type, data);
          }}
        >
          {type}
        </button>
      )}
    </div>
  );
}

export default Manager;
