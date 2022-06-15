import axios from 'axios';

export class API {
  constructor(type = '', authorizationToken) {
    this.type = type;

    this.axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    };
  }

  /////////////////////////////
  ///// DATA

  url = {
    global: 'https://akademia108.pl/api/social-app/post/latest',
    signup: 'https://akademia108.pl/api/social-app/user/signup',
    login: 'https://akademia108.pl/api/social-app/user/login',
    logout: 'https://akademia108.pl/api/social-app/user/logout',
    profile: 'https://akademia108.pl/api/social-app/user/profile',
    last: 'https://akademia108.pl/api/social-app/post/latest',
    allfollows: 'https://akademia108.pl/api/social-app/follows/allfollows',
    disfollow: 'https://akademia108.pl/api/social-app/follows/disfollow',
    recommendations:
      'https://akademia108.pl/api/social-app/follows/recommendations',
    follow: 'https://akademia108.pl/api/social-app/follows/follow',
    like: 'https://akademia108.pl/api/social-app/post/like',
    dislike: 'https://akademia108.pl/api/social-app/post/dislike',
    olderThen: 'https://akademia108.pl/api/social-app/post/older-then',
    newerThen: 'https://akademia108.pl/api/social-app/post/newer-then',
    newPost: 'https://akademia108.pl/api/social-app/post/add',
    delPost: 'https://akademia108.pl/api/social-app/post/delete',
  };

  postData = {};

  /////////////////////////////
  ///// SETTERS

  setData(data) {
    this.postData = data;
  }

  /////////////////////////////
  ///// GETTER
  getData = (handler) => {
    axios
      .post(this.url[this.type], this.postData, this.axiosConfig)
      .then((res) => {
        handler(res);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  };
}
