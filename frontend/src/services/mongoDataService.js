import http from "./http-common"

class MongoDataService {
  getAllBoards() {
    return http.get("/api/boards")
  }

  getBoard(id) {
    return http.get(`/api/boards/${id}`)
  }

  createBoard(data) {
    return http.post("/api/boards", data)
  }

  updateBoard(id, data) {
    return http.put(`/api/boards/${id}`, data)
  }

  deleteBoard(id) {
    return http.delete(`/api/boards/${id}`)
  }
}

export default new MongoDataService()