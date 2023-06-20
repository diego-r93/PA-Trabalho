import { http, httpWithAuthorization, setAuthorizationHeader } from "./http-common"

class MongoDataService {
  getAllBoards(token) {
    console.log('getAllBoards')
    console.log(token)
    console.log('getAllBoards')
    setAuthorizationHeader(token)
    return httpWithAuthorization.get("/api/boards")
  }

  getBoard(id, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.get(`/api/boards/${id}`)
  }

  createBoard(data, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.post("/api/boards", data)
  }

  updateBoard(id, data, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.put(`/api/boards/${id}`, data)
  }

  deleteBoard(id, token) {
    setAuthorizationHeader(token)
    return httpWithAuthorization.delete(`/api/boards/${id}`)
  }
}

export default new MongoDataService()