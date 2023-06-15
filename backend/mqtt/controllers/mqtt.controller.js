const mqttService = require('../service/mqttService')

const { MQTT_HOST_NAME, MQTT_USER_NAME, MQTT_PASSWORD } = require('../config/mqtt.config')

const mqttClient = new mqttService(MQTT_HOST_NAME, MQTT_USER_NAME, MQTT_PASSWORD)
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

exports.updateGPIO = async function (req, res) {
  try {
    const id = req.params.id;

    const topic = `${id}/output`
    const message = req.body

    console.log(`Request Topic :: ${topic}`)
    console.log(`Request Message :: ${message}`)

    mqttClient.publish(topic, JSON.stringify(message), {})
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}

exports.getDevices = async (req, res) => {
  try {
    const devices = []; // Array para armazenar os dispositivos

    const topic = 'getdevices';
    const message = 'get all';

    const devicesPromise = new Promise((resolve, reject) => {
      mqttClient.messageCallback = (topic, message) => {
        console.log(`Sucessfully subscribe on MQTT topic ${topic}`)
        console.log(`Received Message :: ${message}`);

        // Parse do JSON recebido
        const device = JSON.parse(message);

        // Adiciona o dispositivo ao array
        devices.push(device);

        // Define um timeout de 1 segundo para resolver a promessa
        setTimeout(resolve, 1000);
      };

      mqttClient.subscribe('devices');
      mqttClient.publish(topic, message, {});
    });

    await devicesPromise;

    mqttClient.unsubscribe('devices');

    // Cria o JSON final com as informações dos dispositivos
    const result = {
      devicesNumber: devices.length,
      devicesInformation: devices,
    };

    // Retorna o JSON final como resposta
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};