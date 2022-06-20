import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

import { API } from '../data/API';
import ProfilePilot from '../components/ProfilePilot';
import Posts from '../components/Posts';
import UsersList from '../components/UsersList';

function Home() {
  /////////////////
  //// VARIABLES
  const { jwtToken } = useLocation().state;
  const [profileData, setProfileData] = useState('');
  const [posts, setPosts] = useState('');
  const [users, setUsers] = useState('');
  const [activeBtn, setActiveBtn] = useState('friends');
  const [likes, setLikes] = useState([]);

  const [profileAPI] = useState(new API('profile', jwtToken));
  const choosePostsType = {
    last: new API('last', jwtToken),
    olderThen: new API('olderThen', jwtToken),
    newerThen: new API('newerThen', jwtToken),
  };
  const [postsAPI, setpostsAPI] = useState(choosePostsType.last);
  const [allFollowsAPI] = useState(new API('allfollows', jwtToken));
  const disfollowAPI = new API('disfollow', jwtToken);
  const recommendsAPI = new API('recommendations', jwtToken);
  const addUserAPI = new API('follow', jwtToken);
  const addLikeAPI = new API('like', jwtToken);
  const removeLikeAPI = new API('dislike', jwtToken);
  const newPostAPI = new API('newPost', jwtToken);
  const delPostAPI = new API('delPost', jwtToken);

  ////////////////
  //// USE EFFECT
  const displayPosts = useCallback(
    (res) => {
      const email = profileData.email || '';

      const likesArr = [];
      res.data.forEach((post) => {
        post.likes.forEach((el) => {
          if (el.email === email) {
            likesArr.push(post.id.toString());
          }
        });
      });

      setLikes(likesArr);
      setPosts(res.data);
    },
    [profileData.email]
  );

  useEffect(() => {
    profileAPI.getData((res) => {
      if (res.status === 200) setProfileData(res.data);
    });
  }, [profileAPI]);

  useEffect(() => {
    postsAPI.getData(displayPosts);
  }, [postsAPI, profileData, users, displayPosts]);

  useEffect(() => {
    allFollowsAPI.getData(displayUsersList);
  }, [profileData, allFollowsAPI]);

  ////////////////
  //// UI ACTIONS

  const clickDeletePost = (e) => {
    delPostAPI.setData({ post_id: e.target.id });
    delPostAPI.getData(() => {
      postsAPI.getData(displayPosts);
    });
  };

  const clickLikePost = (e) => {
    addLikeAPI.setData({ post_id: `${e.target.id}` });
    addLikeAPI.getData((res) => {
      if (res.data.liked) {
        postsAPI.getData(refreshPosts);
        setLikes([...likes, e.target.id]);
      }
    });
  };

  const clickDislikePost = (e) => {
    removeLikeAPI.setData({ post_id: `${e.target.id}` });
    removeLikeAPI.getData((res) => {
      if (!res.data.liked) {
        postsAPI.getData(refreshPosts);
        setLikes(
          likes.filter((id) => {
            if (id === e.target.id) return false;
            else return true;
          })
        );
      }
    });
  };

  const clickDeleteUser = (e) => {
    disfollowAPI.setData({ leader_id: `${e.target.id}` });
    disfollowAPI.getData((res) => {
      if (res.status === 201) {
        allFollowsAPI.getData(displayUsersList);
      }
    });
  };

  const clickAddUser = (e) => {
    addUserAPI.setData({ leader_id: `${e.target.id}` });
    addUserAPI.getData((res) => {
      if (res.status === 201) {
        recommendsAPI.getData(displayUsersList);
      }
    });
  };

  const clickFriends = () => {
    setActiveBtn('friends');
    allFollowsAPI.getData(displayUsersList);
  };

  const clickRecommended = () => {
    setActiveBtn('rec');
    recommendsAPI.getData(displayUsersList);
  };

  const managerHandler = (type, data) => {
    if (type === 'newest') {
      const API = choosePostsType.last;
      setpostsAPI(API);
      return;
    }
    if (type === 'add') {
      newPostAPI.setData({ content: data[type] });
      newPostAPI.getData((res) => {
        if (res.status === 200) {
          postsAPI.getData(displayPosts);
        }
      });
      return;
    }

    let API;
    if (type === 'from') API = choosePostsType.newerThen;
    if (type === 'till') API = choosePostsType.olderThen;
    if (!API) return;

    setpostsAPI(API);
    API.setData({ date: data[type] });
  };

  ////////////
  // API HANDLERS

  const refreshPosts = (res) => {
    setPosts(res.data);
  };

  const displayUsersList = (res) => {
    setUsers(res.data);
  };

  //////////////
  //// MARKUP

  return (
    <div className='home-page'>
      <ProfilePilot
        token={jwtToken}
        profileData={profileData}
        managerHandler={managerHandler}
      />
      <Posts
        posts={posts}
        deletePost={clickDeletePost}
        likePost={clickLikePost}
        dislikePost={clickDislikePost}
        likes={likes}
        token={jwtToken}
      />
      <UsersList
        users={users}
        activeBtn={activeBtn}
        deleteUser={clickDeleteUser}
        addUser={clickAddUser}
        clickRec={clickRecommended}
        clickFriends={clickFriends}
      />
    </div>
  );
}

export default Home;
