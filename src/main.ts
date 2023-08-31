import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/style.scss";

import App from "./App.vue";
import router from "./router";

// font awesome settings
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLocationCrosshairs,
  faFloppyDisk,
  faX,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
library.add(
  faLocationCrosshairs,
  faFloppyDisk,
  faX,
  faFacebook,
  faGoogle,
  faDice
);

import vue3GoogleLogin from "vue3-google-login";

// firebase config
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
initializeApp(firebaseConfig);

const app = createApp(App).component("fa-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(vue3GoogleLogin, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID });

app.mount("#app");
