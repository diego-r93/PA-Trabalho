<template>
  <div class="container p-5 text-center">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(pump, id) in pumps" :key="id">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ pump.name }}</h5>
            <p class="card-title"><i class="fa-solid fa-bolt"></i> GPIO {{ pump.gpio }}</p>
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input form-switch-lg" type="checkbox" role="switch" :id="pump.gpio"
                :checked="getState(pump.gpio) === 'on'" @change="() => toggleCheckbox(pump.gpio)">
            </div>
            <p class="state mt-3">
              State:
              <span v-if="getState(pump.gpio) === 'on'">
                <span class="box-on bg-success text-white rounded">ON</span>
              </span>
              <span v-else>
                <span class="box-off bg-danger text-white rounded">OFF</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'PumpsView',

  data() {
    return {
      pumps: [
        { name: 'Pump 1', gpio: 21 },
        { name: 'Pump 2', gpio: 19 },
        { name: 'Pump 3', gpio: 18 },
        { name: 'Pump 4', gpio: 5 }
      ],
      states: reactive({
        '21': 'on',
        '19': 'off',
        '18': 'on',
        '5': 'off'
      })
    };
  },

  mounted() {
    this.onLoad(); // Chamando a função diretamente ao montar o componente
  },

  watch: {
    // Observando mudanças no estado do componente
    $route() {
      this.onLoad(); // Chamando a função ao atualizar o componente
    }
  },

  methods: {
    getState(id) {
      return this.states[id];
    },
    onLoad() {
      this.initWebSocket()
    },
    initWebSocket() {
      console.log('Trying to open a WebSocket connection...')
      this.websocket = new WebSocket(`ws://${window.location.hostname}/ws`)
      this.websocket.onopen = this.onOpen
      this.websocket.onclose = this.onClose
      this.websocket.onmessage = this.onMessage
    },
    onOpen() {
      console.log('Connection opened')
      this.websocket.send("states")
    },
    onClose() {
      console.log('Connection closed')
      setTimeout(this.initWebSocket, 2000)
    },
    onMessage(event) {
      const myObj = JSON.parse(event.data);
      console.log(myObj);
      for (const gpio of myObj.gpios) {
        const { output, state } = gpio;
        console.log(output);
        console.log(state);
        if (state === "1") {
          this.states[output] = "on"; // Atualize diretamente a propriedade reativa
        } else if (state === "0") {
          this.states[output] = "off"; // Atualize diretamente a propriedade reativa
        }
      }
      console.log(event.data);
    },
    toggleCheckbox(gpio) {
      console.log(gpio);
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(gpio);
        if (this.states[gpio]) {
          this.states[gpio] = "on";
        } else {
          this.states[gpio] = "off";
        }
      } else {
        console.log("WebSocket is not open.");
      }
    },
  },
};
</script>

<style>
.form-check-input[type="checkbox"] {
  width: 75px;
  height: 30px;
}

.state {
  font-size: 1.2rem;
}

.state .fa {
  margin-right: 0.5rem;
}
</style>
