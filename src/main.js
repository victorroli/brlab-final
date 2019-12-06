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

Vue.filter("resultadoExperimento", (inicio, fim) => {
  console.log("Inicio: ", inicio);
  console.log("Fim: ", fim);
  let date_ini = new Date(inicio);
  let date_fim = new Date(fim);

  let horas = date_ini.getHours() - date_fim.getHours();
  let minutos = date_ini.getMinutes() - date_fim.getMinutes();
  let segundos = date_ini.getSeconds() - date_fim.getSeconds();
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
  console.log("Tempo total: ", tempoTotal);
  return tempoTotal;
});

Vue.filter("formataData", valor => {
  let data = new Date(valor);
  let dia = data.getDate();
  let mes = data.getMonth();
  let ano = data.getFullYear();

  if (dia < 9) {
    dia = "0" + dia;
  }

  if (mes < 9) {
    mes = "0" + mes;
  }

  return `${dia}/${mes + 2}/${ano}`;
});

Vue.filter("formataHorario", valor => {
  let data = new Date(valor);
  let horas = data.getHours();
  let minutos = data.getMinutes();
  let segundos = data.getSeconds();

  return `${horas}:${minutos}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
