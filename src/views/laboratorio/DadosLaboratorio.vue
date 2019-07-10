<template>
  <b-container class="lab-container">
    <b-row>
      <b-col class="lab-selecionado">
        <!-- <div class="lab-selecionado"> -->
        <div class="lab-img">
          <img src="../../assets/lab.svg" alt />
        </div>
        <div class="lab-info">
          <h3>{{lab_selecionado.name}}</h3>
          <div class="tempo-experimento">
            <p>Tempo de Experimentação: {{lab_selecionado.tempo}}</p>
          </div>
          <b-row>
            <!-- <b-col sm="2"></b-col> -->
            <b-col class="text-center btn-div">
              <router-link
                :to="{name: 'iniciaExperimento', params:{iniciaExperimento:'inicia-experimento'}}"
                tag="b-button"
                class="btn"
              >Iniciar</router-link>
            </b-col>
            <!-- <b-col sm="2"></b-col> -->
          </b-row>
          <b-row>
            <b-col class="text-center btn-div">
              <router-link
                :to="{name: 'agendamento', params: {agendamento: 'agendamento', nome_lab: lab_selecionado.name}}"
                tag="b-button"
                class="btn"
              >Reservar</router-link>
            </b-col>
          </b-row>
        </div>
        <!-- </div> -->
      </b-col>
    </b-row>
    <b-row class="descricao-lab text-center">
      <b-col>
        <p>{{lab_selecionado.description}}</p>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col class="text-center">
        <h3>Últimos Experimentos</h3>
      </b-col>
    </b-row>
  </b-container>
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

.btn-div {
  padding-right: 20%;
  padding-left: 20%;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  height: 100%;
  align-content: center;
  background: #87f;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background: #65d;
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
