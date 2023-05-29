<template>
  <main class="container">
    <div class="col-12 mt-3">
      <div class="col-12 mt-3 pt-3 text-center">
        <img width="280" src="../assets/images/update-logo.png" alt="ElegantOTA">
      </div>
      <div class="col-12"></div>
      <div class="col-12 mt-3 text-center" v-if="loading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="progress" v-if="!loading && !uploading && OTAError !== null" key="error"></div>
        <div class="col-12 mt-3 pt-2 p-centered" v-else-if="!loading && !uploading && OTASuccess" key="success"></div>
        <div class="col-12 mt-3 pt-2" v-else-if="!loading && !uploading" key="otainput">
          <div class="col-3 col-sm-9 col-md-6 mx-auto">
            <div class="form-check form-check-inline mr-2">
              <input class="form-check-input" type="radio" name="firmwaretype" id="flexRadioDefault1" v-model="type"
                value="firmware">
              <label class="form-check-label" for="flexRadioDefault1">
                Firmware
              </label>
            </div>
            <div class="form-check form-check-inline ml-2">
              <input class="form-check-input" type="radio" name="firmwaretype" id="flexRadioDefault2" v-model="type"
                value="filesystem">
              <label class="form-check-label" for="flexRadioDefault2">
                Filesystem
              </label>
            </div>
          </div>
          <div class="w-50 mt-3 mx-auto" id="upload-form">
            <div class="input-group pt-2 mt-2">
              <input class="form-input file-input form-control" type="file" ref="fileInput" @change="uploadOTA">
              <button class="btn btn-outline-secondary" type="button" @click="submit">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="col-12 mt-3 mb-2 pt-2" v-if="!loading && uploading">
          <div class="col-2 mt-3 mb-2 col-sm-7 col-md-4 text-right mx-auto">
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                aria-label="Upload Progress Bar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"
                :style="{ width: progress + '%' }"></div>
            </div>
            <div class="pt-2 text-center">{{ progress }}%</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="columns mt-3" v-if="!loading">
          <div class="col-12 text-center">
            <span class="badge bg-secondary mr-2">{{ deviceData.id }}</span> -
            <span class="badge bg-success ml-2">{{ deviceData.hardware }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      uploading: false,
      progress: 0,
      OTAError: null,
      OTASuccess: false,

      type: 'firmware',
      file: null,
      deviceData: {
        id: null,
        hardware: null,
      },
    };
  },
  methods: {
    uploadOTA() {
      this.file = this.$refs.fileInput.files[0];
    },
    submit() {
      this.uploading = true;
      const formData = new FormData();
      formData.append('file', this.file);

      const request = new XMLHttpRequest();

      request.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded / event.total) * 100);
          this.progress = percentCompleted;
        }
      });

      request.addEventListener('load', () => {
        if (request.status === 200) {
          this.OTASuccess = true;
        } else if (request.status !== 500) {
          this.OTAError = `[HTTP ERROR] ${request.statusText}`;
        } else {
          this.OTAError = request.responseText;
        }
        this.uploading = false;
        this.progress = 0;
      });

      request.withCredentials = true;

      request.addEventListener('error', (error) => {
        console.error(error);
        this.uploading = false;
        this.progress = 0;
      });

      request.open('POST', '/ota-update');
      request.send(formData);
    },
    retryOTA() {
      this.OTAError = null;
      this.OTASuccess = false;
      this.uploadOTA(null);
    },

    clear() {
      this.OTAError = null;
      this.OTASuccess = false;
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      fetch('/update/identity', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(async (response) => {
          if (response.ok) {
            this.deviceData = await response.json();
            this.loading = false;
          }
        });
    }
  },
}
</script>

<style></style>