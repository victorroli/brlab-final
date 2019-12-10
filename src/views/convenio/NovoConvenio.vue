<template>
  <section class="convenios">
    <h1>Novo Convênio</h1>
    <form>
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
      <div class="group-button">
        <b-button class="salvar" @click="salvaConvenio()">Salvar</b-button>
      </div>
    </form>
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
        { text: "Sexta", value: 6 },
        { text: "Sábado", value: 7 }
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
    checaCampos() {
      let erro = false;
      if (!this.laboratorio) erro = true;
      if (!this.instituicao) erro = true;
      if (!this.criacao) erro = true;
      if (!this.validade) erro = true;
      if (!this.tempo) erro = true;
      if (!this.diasSelecionados.length) {
        erro = true;
      }
      return erro;
    },
    salvaConvenio() {
      if (this.checaCampos()) {
        this.boxMensagem("Preencha todos os campos!");
        return;
      }
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
          if (response.data.status == 201) {
            this.$router.push({ path: "/convenios_ativos" });
          }
        });
    },
    boxMensagem(mensagem) {
      this.$bvModal.msgBoxOk(mensagem, {
        footerClass: "p-2",
        buttonSize: "md",
        centered: true
      });
      this.buscaPapeis();
    }
  }
};
</script>

<style scoped>
</style>
