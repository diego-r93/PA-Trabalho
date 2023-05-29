<template>
  <div class="container p-5">
    <div class="row align-items-center">
      <div class="col-lg-4 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Hostname</h5>
            <p class="card-text">{{ hostname }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Time</h5>
            <p class="card-text">{{ time }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">RSSI</h5>
            <p class="card-text">{{ rssi }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Pulse Duration 1</h5>
            <p class="card-text">{{ pulseDuration1 }}</p>
            <h5 class="card-title">Pulse Duration 2</h5>
            <p class="card-text">{{ pulseDuration2 }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt-5">
      <div class="col-lg-6">
        <div class="d-flex flex-column">
          <table v-for="tableConfig in tableConfigs" :key="tableConfig.query" class="table table-striped mb-4">
            <thead>
              <tr>
                <th>{{ tableConfig.header }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rowData, index) in tableData[tableConfig.query]" :key="rowData">
                <template v-if="rowData !== ''">
                  <td>{{ index }}</td>
                  <td>{{ rowData }}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'InfoView',

  data() {
    return reactive({
      hostname: '',
      time: '',
      rssi: '',
      pulseDuration1: '',
      pulseDuration2: '',
      tableConfigs: [
        { method: "GET", url: "/timers1", query: "pump1-table", header: "Pump 1" },
        { method: "GET", url: "/timers2", query: "pump2-table", header: "Pump 2" }
      ],
      tableData: {},
    });
  },
  mounted() {
    this.ajax({ method: "GET", url: "/hostname", query: 'hostname' });
    setInterval(() => this.ajax({ method: "GET", url: "/time", query: 'time' }), 5000);
    setInterval(() => this.ajax({ method: "GET", url: "/rssi", query: 'rssi' }), 5000);
    setInterval(() => this.ajax({ method: "GET", url: "/pulse1", query: 'pulseDuration1' }), 5000);
    setInterval(() => this.ajax({ method: "GET", url: "/pulse2", query: 'pulseDuration2' }), 5000);

    setInterval(() => {
      for (const tableConfig of this.tableConfigs) {
        this.ajax(tableConfig);
      }
    }, 5000);   
  },
  methods: {
    ajax(config) {
      const xhr = new XMLHttpRequest();
      xhr.open(config.method, config.url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (config.header) {
            this.tableData[config.query] = xhr.responseText.split(',');
          }
          else {
            this[config.query] = xhr.responseText;
          }
        }
      };
      xhr.send();
    }
  }
};
</script>




