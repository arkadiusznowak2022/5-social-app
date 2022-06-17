import React, { useState } from 'react';
import './Posts.css';
import LikeOrNot from './LikeOrNot';

function Posts({
  posts,
  deletePost,
  likePost,
  dislikePost,
  likes = [],
  token,
}) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  };
  const [idSelect, setIdSelect] = useState('');

  const showLikeOrNot = (e) => {
    if (!token) return;
    const id = e.target.id;
    if (id === idSelect) setIdSelect('');
    else setIdSelect(e.target.id);
  };

  const checkIfLiked = (id = -1) => {
    return likes.includes(id.toString());
  };

  const createMarkup = () => {
    const markup = posts.map((el) => {
      const created = new Intl.DateTimeFormat('en-GB', dateOptions).format(
        new Date(el.created_at)
      );

      return (
        <li className='post' key={el.id}>
          <img src={el.user.avatar_url} alt='avatar' />
          <div className='post-content'>
            <p className='date'>{created}</p>
            <i
              className={`fa-solid fa-xmark x ${token && 'token'}`}
              id={el.id}
              onClick={deletePost}
            ></i>
            <h3 className='text'>{el.content}</h3>
            <p className='likes-cont'>
              <i
                className={`fa-solid fa-heart love-it 
                ${checkIfLiked(el.id) && 'liked'}
                ${token && 'token'}`}
                id={el.id}
                onClick={showLikeOrNot}
              ></i>
              {el.likes.length}
            </p>
            <LikeOrNot
              id={el.id}
              likePost={likePost}
              dislikePost={dislikePost}
              active={+idSelect === el.id}
              showLikeOrNot={showLikeOrNot}
            />
            <p className='username'>{el.user.username}</p>
          </div>
        </li>
      );
    });
    return markup;
  };

  return <ul className='posts-cont'>{posts && createMarkup()}</ul>;
}

export default Posts;
