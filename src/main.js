import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Datetime from "vue-datetime";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-datetime/dist/vue-datetime.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserPlus,
  faUsers,
  faEdit,
  faTrash,
  faPlusCircle,
  faCheckCircle,
  faEye,
  faEyeSlash,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserPlus,
  faUsers,
  faEdit,
  faTrash,
  faPlusCircle,
  faCheckCircle,
  faEye,
  faEyeSlash,
  faTimesCircle
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// You need a specific loader for CSS files

Vue.use(Datetime);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.filter("converteData", valor => {
  let date = new Date(valor);
  let horas = date.getHours();
  let minutos = date.getMinutes();
  let segundos = date.getSeconds();
  let tempoTotal = "";
  if (horas) {
    tempoTotal += ` Horas: ${horas}`;
  }
  if (minutos) {
    tempoTotal += ` Minutos: ${minutos}`;
  }
  if (segundos) {
    tempoTotal += ` Segundos: ${segundos}`;
  }

  return tempoTotal;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
