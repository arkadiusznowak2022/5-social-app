import React from 'react';
import './UsersList.css';

function UsersList({
  users,
  deleteUser,
  addUser,
  clickRec,
  clickFriends,
  activeBtn,
}) {
  const createMarkup = () => {
    const markup = users.map((el) => {
      return (
        <li key={el.id}>
          <img src={el.avatar_url} alt='avatar' />
          <h3>{el.username}</h3>
          <p>({el.email})</p>
          {activeBtn === 'friends' ? (
            <i
              className='fa-solid fa-xmark'
              id={el.id}
              onClick={deleteUser}
            ></i>
          ) : (
            <i
              className='fa-solid fa-circle-plus'
              id={el.id}
              onClick={addUser}
            ></i>
          )}
        </li>
      );
    });
    return markup;
  };

  return (
    <div className='users-cont'>
      <div className='buttons-panel-users'>
        <button
          className={activeBtn === 'rec' ? 'btn-no-acitve' : ''}
          onClick={clickFriends}
        >
          Friends
        </button>
        <button
          className={activeBtn === 'friends' ? 'btn-no-acitve' : ''}
          onClick={clickRec}
        >
          Recommended
        </button>
      </div>
      <ul className='users-list'>{users && createMarkup()}</ul>
    </div>
  );
}

export default UsersList;
