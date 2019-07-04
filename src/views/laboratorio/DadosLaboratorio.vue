<template>
  <section class="lab-container">
    <div class="lab-selecionado">
      <div class="lab-img">
        <img src="../../assets/lab.svg" alt />
      </div>
      <div class="lab-info">
        <h3>{{lab_selecionado.name}}</h3>
        <div class="tempo-experimento">
          <p>Tempo de Experimentação: {{lab_selecionado.tempo}}</p>
        </div>
        <div class="btn-info">
          <router-link
            :to="{name: 'iniciaExperimento', params:{iniciaExperimento:'inicia-experimento'}}"
            tag="button"
            class="btn"
          >Iniciar</router-link>
          <!-- <router-link
            :to="{name: 'acompanhaExperimento', params:{acompanhaExperimento:'monitoramento'}}"
            tag="button"
            class="btn"
          >Acompanhar</router-link>-->
          <router-link
            :to="{name: 'agendamento', params: {agendamento: 'agendamento', nome_lab: lab_selecionado.name}}"
            tag="button"
            class="btn"
          >Reservar</router-link>
        </div>
      </div>
    </div>
    <div class="descricao-lab">
      <p>{{lab_selecionado.description}}</p>
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
        console.log("Dados: ", response.data);
        this.lab_selecionado = response.data;
        console.log("Dados: ", this.lab_selecionado);
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
  margin-bottom: 38px;
  padding-bottom: 20px;
  padding-top: 20px;
}
.btn-info {
  display: grid;
  padding-right: 200px;
  padding-left: 200px;
  align-content: center;
}
hr {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 30%;
  margin-left: 30%;
  color: #84f;
}
.tempo-experimento p {
  padding: 20px;
  font-size: 17px;
}
.descricao-lab {
  font-size: 1.5rem;
  color: rgb(138, 103, 197);
  font-weight: 550;
}
</style>
