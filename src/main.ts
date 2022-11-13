import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/style.scss";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

library.add(faLocationCrosshairs);

const app = createApp(App).component("fa-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
