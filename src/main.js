import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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
