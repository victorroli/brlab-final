<template>
  <section class="convenios">
    <h1>Novo Convênio</h1>
    <div class="usuario">
      <label for="nome">Instituição:</label>
      <b-form-select v-model="instituicao" :options="listaInstituicoes"></b-form-select>
      <label for="laboratorio">Laboratório:</label>
      <b-form-select v-model="laboratorio" :options="listaLabs"></b-form-select>
      <b-form-group label="Dias que será disponibilizado:" v-if="laboratorio">
        <b-form-checkbox-group
          id="dias-semana"
          v-model="diasSelecionados"
          :options="diasSemana"
          name="diasSemana"
        ></b-form-checkbox-group>
      </b-form-group>
      <label for="tempo">Tempo por dia:</label>
      <b-form-input id="tempo" type="time" name="tempo" v-model="tempo" />
      <!-- <label for="dias">Dias disponíveis:</label> -->
      <label for="criacao">Data de Criação:</label>
      <b-form-input id="criacao" type="date" name="criacao" v-model="criacao" />
      <label for="validade">Válido até:</label>
      <b-form-input id="validade" type="date" name="validade" v-model="validade" />
      <br />
      <b-button @click="salvaConvenio()">Salvar</b-button>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "NovoConvenio",
  data() {
    return {
      listaInstituicoes: [],
      listaLabs: [],
      laboratorio: "",
      instituicao: "",
      criacao: "",
      validade: "",
      tempo: "",
      diasSelecionados: [],
      diasSemana: [
        { text: "Domingo", value: 1 },
        { text: "Segunda", value: 2 },
        { text: "Terça", value: 3 },
        { text: "Quarta", value: 4 },
        { text: "Quinta", value: 5 },
        { text: "Sábado", value: 6 }
      ]
    };
  },
  created() {
    this.buscaLaboratorios();
    this.buscaInstituicoes();
  },
  methods: {
    buscaLaboratorios() {
      api.get("/labs/").then(response => {
        if (response.data) {
          let laboratorios = [];
          response.data.forEach(laboratorio => {
            laboratorios.push({
              value: laboratorio.id,
              text: laboratorio.name
            });
          });
          this.listaLabs = [...laboratorios];
        }
      });
    },
    buscaInstituicoes() {
      api.get("/instituicao/").then(response => {
        if (response.data) {
          let instituicoes = [];
          response.data.forEach(instituicao => {
            instituicoes.push({
              value: instituicao.id,
              text: instituicao.nome
            });
          });
          // console.log("Instituição: ", response.data);
          this.listaInstituicoes = [...instituicoes];
        }
      });
    },
    salvaConvenio() {
      api
        .post("/convenio/", {
          criacao: this.criacao,
          validade: this.validade,
          laboratorio_id: this.laboratorio,
          instituicao_id: this.instituicao,
          tempo: this.tempo,
          dias: this.diasSelecionados
        })
        .then(response => {
          console.log("Resposta obitda: ", response.data);
        });
    }
  }
};
</script>

<style scoped>
.convenios {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>