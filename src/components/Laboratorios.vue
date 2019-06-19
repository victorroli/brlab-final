<template>
  <section class="laboratorio-container">
    <transition mode="out-in">
      <div class="laboratorios" v-if="laboratorios && laboratorios.length" key="laboratorios">
        <div class="laboratorio" v-for="(laboratorio, index) in laboratorios" :key="index">
          <router-link>
            <img src="../assets/lab.svg">
            {{laboratorio.name}} -
            {{laboratorio.description}}
          </router-link>
        </div>
      </div>
      <div v-else-if="laboratorios && laboratorios.length == 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados. Tente outro termo.</p>
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "Laboratorios",
  data() {
    return {
      laboratorios: null,
      param: "/labs"
    };
  },
  methods: {
    getLaboratorios() {
      // console.log("To: ", to);
      api.get("/labs").then(response => {
        // console.log(response);
        this.laboratorios = response.data.labs;
        next();
      });
    }
  },
  created() {
    this.getLaboratorios();
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    this.getLaboratorios();
    next();
  }
};
</script>

<style scoped>
.laboratorio-container {
  max-width: 1000px;
  margin: 0 auto;
}

.laboratorios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /*repeat(3, 1frm);*/
  grid-gap: 30px;
  margin: 30px;
}

.laboratorio {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

img {
  max-width: 120px;
}
</style>
