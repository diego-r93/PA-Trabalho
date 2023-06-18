import { http, httpWithAuthorization, setAuthorizationHeader } from "./http-common"

class UserService {
  getAll() {
    return http.get("/users")
  }

  get(id, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.get(`/users/${id}`)
  }

  create(data) {
    return http.post("/users", data)
  }

  login(data) {
    return http.post("users/login", data)
  }

  update(id, data, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.put(`/users/${id}`, data)
  }

  delete(id) {
    return http.delete(`/users/${id}`)
  }
}

export default new UserService()