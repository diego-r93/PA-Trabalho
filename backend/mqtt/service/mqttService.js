const mqtt = require("mqtt");

class MQTTService {
  constructor(host, username, password, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.username = username;
    this.password = password;
    this.messageCallback = messageCallback;
    this.subscriptions = []; // Array para armazenar as inscrições ativas
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    this.mqttClient.on("message", (topic, message) => {
      if (this.messageCallback) this.messageCallback(topic, message);
      else console.log(message.toString());
    });

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
    this.subscriptions.push(topic); // Adiciona a inscrição ao array de inscrições
  }

  // Unsubscribe from MQTT Message
  unsubscribe(topic) {
    this.mqttClient.unsubscribe(topic);
    this.subscriptions = this.subscriptions.filter((t) => t !== topic); // Remove a inscrição do array de inscrições
  }

  unsubscribeAll() {
    this.subscriptions.forEach((topic) => {
      this.mqttClient.unsubscribe(topic);
    });
    this.subscriptions = []; // Limpa o array de inscrições
  }
}

module.exports = MQTTService;