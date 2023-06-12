const mqttService = require('../service/mqttService')

const MQTT_HOST_NAME = 'mqtt://127.0.0.1:1883'

const mqttClient = new mqttService(MQTT_HOST_NAME)
mqttClient.connect()

exports.subscribeMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic

    console.log(`Request Topic :: ${topic}`)

    mqttClient.subscribe(topic)
    res
      .status(200)
      .json({ status: "200", message: `Sucessfully subscribe on MQTT topic ${topic}` })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}