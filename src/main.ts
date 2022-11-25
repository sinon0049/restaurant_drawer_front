import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/style.scss";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

import vue3GoogleLogin from "vue3-google-login";

library.add(faLocationCrosshairs);

const app = createApp(App).component("fa-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(vue3GoogleLogin, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID });

app.mount("#app");
