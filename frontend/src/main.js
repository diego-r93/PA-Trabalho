import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

import { initializeApp } from "firebase/app"

// Plugins
import { registerPlugins } from '@/plugins'

const firebaseConfig = {
  apiKey: "AIzaSyAH-_Z45K7xqst9DwJFDhKVIdUb5pYaTms",
  authDomain: "vue-firebase-project-616a5.firebaseapp.com",
  projectId: "vue-firebase-project-616a5",
  storageBucket: "vue-firebase-project-616a5.appspot.com",
  messagingSenderId: "871311794752",
  appId: "1:871311794752:web:1ea1043b36f5023770f5a5",
  measurementId: "G-PTYLQBNLCC"
};

initializeApp(firebaseConfig)

const app = createApp(App)

registerPlugins(app)

app.use(router).mount('#app')
