import { http, httpWithAuthorization, setAuthorizationHeader } from "./http-common"

class UserService {
  getAll() {
    return http.get("/api/users")
  }

  get(id, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.get(`/api/users/${id}`)
  }

  create(data) {
    return http.post("/api/users", data)
  }

  login(data) {
    return http.post("/api/users/login", data)
  }

  update(id, data, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.put(`/api/users/${id}`, data)
  }

  delete(id) {
    return http.delete(`/api/users/${id}`)
  }
}

export default new UserService()