import http from "./http-common"

class UserService {
  getAll() {
    return http.get("/")
  }

  get(id) {
    return http.get(`/${id}`)
  }

  create(data) {
    return http.post("/", data)
  }

  login(data) {
    return http.post("/login", data)
  }

  update(id, data) {
    return http.put(`/${id}`, data)
  }

  delete(id) {
    return http.delete(`/${id}`)
  }
}

export default new UserService()