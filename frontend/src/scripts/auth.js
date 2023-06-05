let authenticated = false

export function isAuthenticated() {
  return authenticated
}

export function login() {
  authenticated = true
}

export function logout() {
  authenticated = false
}