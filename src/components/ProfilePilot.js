import React, { useState } from 'react';
import './ProfilePilot.css';
import Manager from './Manager';

function ProfilePilot({ profileData, managerHandler }) {
  const [managerType, setManagerType] = useState('');

  const manageManager = (type) => {
    if (managerType === type) {
      setManagerType('');
    } else setManagerType(type);
  };

  const manageClass = (type) => {
    if (!type || type === 'newest') return '';
    if (type === 'add') return 'manager';
    else return 'manager-min';
  };

  if (!profileData) return <div></div>;
  return (
    <div className={`profile-cont ${manageClass(managerType)}`}>
      <div className='pilot'>
        <img src={profileData.avatar_url} />
        <h3>{profileData.username}</h3>
        <p>{profileData.email}</p>
        <div className='buttons-panel'>
          <button onClick={() => manageManager('add')}>add</button>
          <button
            onClick={() => {
              manageManager('newest');
              managerHandler('newest');
            }}
          >
            newest
          </button>
          <button onClick={() => manageManager('from')}>from</button>
          <button onClick={() => manageManager('till')}>till</button>
        </div>
      </div>
      <Manager
        type={managerType}
        managerHandler={managerHandler}
        manageManager={manageManager}
      />
    </div>
  );
}

export default ProfilePilot;
