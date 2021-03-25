import axios from 'axios';
import FuseUtils from '../../../@fuse/utils/FuseUtils';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.defaults.baseURL = 'http://localhost:1337/api/v1/';
    axios.interceptors.response.use(
      (response) => response,
      (err) => new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized response, logout the user
          this.emit('onAutoLogout', 'Invalid access_token');
          this.setSession(null);
        }
        throw err;
      }),
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit('onNoAccessToken');
      return;
    }
    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => new Promise((resolve, reject) => {
    axios.post('auth/register', data)
      .then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
  });

  signInWithEmailAndPassword = (email, password) => new Promise((resolve, reject) => {
    axios.post('auth/login', {
      email,
      password,
    })
      .then((response) => {
        if (response.data.user) {
          this.setSession(response.data.token.accessToken);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  signInWithToken = () => new Promise((resolve, reject) => {
    axios.get('auth/me')
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          this.logout();
          reject(new Error('Failed to login with token.'));
        }
      }).catch((error) => {
        this.logout();
        reject(new Error('Failed to login with token.'));
      });
  });

  updateUserData = (user) => axios.post('/api/auth/user/update', {
    user,
  });

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    // const decoded = jwtDecode(access_token);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //   console.warn('access token expired');
    //   return false;
    // }

    return true;
  };

  getAccessToken = () => window.localStorage.getItem('jwt_access_token');
}

const instance = new JwtService();

export default instance;
