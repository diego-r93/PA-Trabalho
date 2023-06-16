require('dotenv').config();

const MQTT_HOST_NAME = process.env.MQTT_HOST_NAME
const MQTT_USER_NAME = process.env.MQTT_USER_NAME
const MQTT_PASSWORD = process.env.MQTT_PASSWORD

module.exports = {
  MQTT_HOST_NAME,
  MQTT_USER_NAME,
  MQTT_PASSWORD
}