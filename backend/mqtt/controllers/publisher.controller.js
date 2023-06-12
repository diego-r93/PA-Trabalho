const mqttService = require('../service/mqttService')

const MQTT_HOST_NAME = 'mqtt://127.0.0.1:1883'

const mqttClient = new mqttService(MQTT_HOST_NAME)
mqttClient.connect()

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic
    const message = req.body.message

    console.log(`Request Topic :: ${topic}`)
    console.log(`Request Message :: ${message}`)

    mqttClient.publish(topic, message, {})
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}