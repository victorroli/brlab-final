<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Convênio cadastrado"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoExcluir"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="resetModal"
    @ok="salvaInstituicao"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <label for="uri-input">Criado em:</label>
      <b-form-input
        id="criacao-input"
        v-model="criacao"
        type="date"
        :state="criacaoState"
        required
        aria-describedby="criacao-input"
      ></b-form-input>
      <b-form-invalid-feedback id="criacao-input">Campo Data de Criação é obrigatório</b-form-invalid-feedback>

      <label for="validade-input">Válido até:</label>
      <b-form-input id="validade-input" v-model="validade" :state="validadeState" type="date"></b-form-input>
      <b-form-invalid-feedback id="observacao-input">Campo Data de validade obrigatório</b-form-invalid-feedback>

      <label for="tipo">Instituição:</label>
      <b-form-select v-model="instituicao" :options="instituicoes"></b-form-select>

      <label for="tipo">Laboratório:</label>
      <b-form-select v-model="laboratorio" :options="laboratorios"></b-form-select>
    </form>
  </b-modal>
</template>

<script>
import { api } from "@/services.js";
import { setTimeout } from "timers";
export default {
  name: "ModalConvenio",
  // props: [laboratorio],
  data() {
    return {
      evento: "",
      criacaoState: "",
      validadeState: "",
      instituicaoState: "",
      laboratorioState: "",
      criacao: "",
      validade: "",
      instituicao: "",
      laboratorio: "",
      txtBotaoIncluir: "Salvar",
      txtBotaoExcluir: "Cancelar",
      tipo: "",
      id: "",
      options: [
        { value: 0, text: "Educação Básica" },
        { value: 1, text: "Educação Superior" },
        { value: 2, text: "Outro" }
      ],
      laboratorios: [],
      instituicoes: []
    };
  },
  created() {
    this.buscaLaboratorios();
    this.buscaInstituicoes();
  },
  methods: {
    showModal() {
      this.$bvModal.show("modal-form");
    },
    resetModal() {
      this.$bvModal.hide("modal-form");
    },
    salvaInstituicao() {
      console.log("Criacao: ", this.criacao);
      console.log("Validade: ", this.validade);
      // return;
      api
        .put(`/convenio/${this.id}`, {
          criacao: this.criacao,
          validade: this.validade,
          laboratorio: this.laboratorio,
          instituicao: this.instituicao
        })
        .then(response => {
          if (response.data.status == 201) {
            console.log("Obtido: ", response.data);
            this.preencheCampos(response.data.content, true);
          }
        });

      setTimeout(() => {
        this.$parent.buscaConvenios();
      }, 500);
    },
    preencheCampos(convenio, atualiza = false) {
      this.id = convenio.id;
      this.instituicao = convenio.instituicao_id;
      this.laboratorio = convenio.laboratorio_id;
      this.criacao = this.quebraData(convenio.criacao, atualiza); //convenio.criacao.replace(/\//g, "-");
      this.validade = this.quebraData(convenio.validade, atualiza);
    },
    quebraData(data, atualiza) {
      console.log("Data pega:", data);
      let dataFinal = "";
      if (data.includes("/")) {
        let dataRecebida = data.split("/");
        dataFinal =
          this.checValores(dataRecebida[2]) +
          "-" +
          this.checValores(dataRecebida[1]) +
          "-" +
          this.checValores(dataRecebida[0], atualiza);
      } else {
        let recebido = new Date(data);
        dataFinal =
          recebido.getFullYear() +
          "-" +
          this.checValores(recebido.getMonth(), atualiza) +
          "-" +
          this.checValores(recebido.getDate());
      }
      // if (!atualiza)
      // return dataRecebida[2] + "-" + dataRecebida[1] + "-" + dataRecebida[0];

      console.log("Final date: ", dataFinal);
      return dataFinal;
    },
    limparCampos() {
      this.agendamento = null;
      this.solicitante = "";
      this.observacao = "";
      this.data = "";
      this.horarioTermino = "";
      this.horarioInicio = "";
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        console.log("Valor trago: ", valor);
        if (mes) {
          valorFinal += 1;
        }
        if (valor.length < 2) return `0${valorFinal}`;
      }
      return valorFinal;
    },
    recebeValoresConvenio(convenio) {
      this.preencheCampos(convenio);
      this.showModal();
    },
    buscaLaboratorios() {
      this.laboratorios = [];
      this.laboratorio = "";
      api.get("/labs/").then(response => {
        response.data.map(response => {
          this.laboratorios.push({ value: response.id, text: response.name });
        });
      });
    },
    buscaInstituicoes() {
      this.instituicoes = [];
      this.instituicao = "";
      api.get("/instituicao/").then(response => {
        response.data.map(instituicao => {
          this.instituicoes.push({
            value: instituicao.id,
            text: instituicao.nome
          });
        });
        // this.instituicoes = [...response.data];
      });
    }
  }
};
</script>

<style>
</style>
