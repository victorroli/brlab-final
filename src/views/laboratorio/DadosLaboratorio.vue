<template>
  <section class="lab-container">
    <div class="lab-selecionado">
      <div class="lab-img">
        <img src="../../assets/lab.svg" alt />
      </div>
      <div class="lab-info">
        <h3>{{lab_selecionado.name}}</h3>
        <div class="btn-info">
          <router-link
            :to="{name: 'iniciaExperimento', params:{iniciaExperimento:'inicia-experimento'}}"
            tag="button"
            class="btn"
          >Iniciar</router-link>
          <router-link
            :to="{name: 'acompanhaExperimento', params:{acompanhaExperimento:'monitoramento'}}"
            tag="button"
            class="btn"
          >Acompanhar</router-link>
          <router-link
            :to="{name: 'agendamento', params: {agendamento: 'agendamento'}}"
            tag="button"
            class="btn"
          >Reservar</router-link>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h3>Últimos Experimentos</h3>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "DadosLaboratorio",
  props: ["laboratorio"],
  data() {
    return {
      lab_selecionado: null
    };
  },
  methods: {
    getLaboratorio() {
      api.get(`/labs/${this.laboratorio}`).then(response => {
        this.lab_selecionado = response.data;
      });
    }
  },
  created() {
    this.getLaboratorio();
  }
};
</script>

<style scoped>
h3 {
  color: #84f;
  margin-top: 40px;
  font-size: 1.5rem;
  text-align: center;
}
.lab-selecionado {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px;
  padding-bottom: 20px;
  /* border-bottom: 1px solid red; */
}
.lab-img {
  display: flex;
  justify-content: center;
}

.lab-info {
  display: grid;
}
img {
  max-width: 250px;
}
.btn {
  margin-bottom: 10px;
}
.btn-info {
  display: grid;
  padding-right: 200px;
  padding-left: 200px;
}
hr {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 30%;
  margin-left: 30%;
  color: #84f;
}
</style>
