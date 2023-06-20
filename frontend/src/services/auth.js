class Authentication {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    const expiration = localStorage.getItem('expiration');
    const currentTime = new Date().getTime();

    this.authenticated = token && expiration && currentTime < parseInt(expiration);

    return this.authenticated;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
    localStorage.removeItem('userData')
    this.authenticated = false;
  }
}

export default new Authentication();