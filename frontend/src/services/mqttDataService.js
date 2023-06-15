import http from "./http-common"

class MqttDataService {
  subscribe() {
    return http.get("/mqtt",)
  }

  publish(data) {
    return http.post("/mqtt", data)
  }

  updateGpio(id, data) {
    return http.patch(`/mqtt/${id}`, data)
  }

  getAll() {
    return http.get("/mqtt/getdevices")
  } 
}

export default new MqttDataService()