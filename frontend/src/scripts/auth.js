let authenticated = false

export function isAuthenticated() {

  const token = localStorage.getItem('token')
  const expiration = localStorage.getItem('expiration')
  const currentTime = new Date().getTime()

  authenticated = (token && expiration && currentTime < parseInt(expiration)) ? true : false

  return authenticated
}

export function login() {
  authenticated = true
}

export function logout() {
  authenticated = false
}