import http from "./http-common"

class UserService {
  getAll() {
    return http.get("/users")
  }

  get(id) {
    return http.get(`/users/${id}`)
  }

  create(data) {
    return http.post("/users", data)
  }

  login(data) {
    return http.post("users/login", data)
  }

  update(id, data) {
    return http.put(`/users/${id}`, data)
  }

  delete(id) {
    return http.delete(`/users/${id}`)
  }
}

export default new UserService()