<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Instituição cadastrada"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoExcluir"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="resetModal"
    @ok="salvaInstituicao"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <label for="uri-input">Instituição:</label>
      <b-form-input
        id="nome-input"
        v-model="nome"
        :state="nomeState"
        required
        aria-describedby="nome-input"
      ></b-form-input>
      <b-form-invalid-feedback id="nome-input">Campo Nome da Instituição obrigatório</b-form-invalid-feedback>

      <label for="tipo">Tipo:</label>
      <b-form-select v-model="tipo" :options="options"></b-form-select>

      <label for="uri-input">CNPJ:</label>
      <b-form-input
        id="cnpj-input"
        v-model="cnpj"
        :state="cnpjState"
        required
        aria-describedby="cnpj-input"
      ></b-form-input>
      <b-form-invalid-feedback id="cnpj-input">Campo CNPJ é obrigatório</b-form-invalid-feedback>

      <label for="telefone-input">Telefone:</label>
      <b-form-input
        id="telefone-input"
        v-model="telefone"
        :state="telefoneState"
        required
        aria-describedby="telefone-input"
      ></b-form-input>
      <b-form-invalid-feedback id="telefone-input">O telefone não pode ser vazio</b-form-invalid-feedback>

      <label for="cidade-input">Cidade:</label>
      <b-form-input id="cidade-input" v-model="cidade" :state="cidadeState"></b-form-input>
      <b-form-invalid-feedback id="observacao-input">Campo cidade obrigatório</b-form-invalid-feedback>

      <label for="bairro-input">Bairro:</label>
      <b-form-input id="bairro-input" v-model="bairro" :state="bairroState"></b-form-input>
      <b-form-invalid-feedback id="bairro-input">Campo bairro obrigatório</b-form-invalid-feedback>

      <label for="rua-input">rua:</label>
      <b-form-input id="rua-input" v-model="rua" :state="ruaState"></b-form-input>
      <b-form-invalid-feedback id="rua-input">Campo Rua obrigatório</b-form-invalid-feedback>

      <label for="numero-input">Número:</label>
      <b-form-input id="numero-input" v-model="numero" :state="numeroState"></b-form-input>
      <b-form-invalid-feedback id="numero-input">Campo Número obrigatório</b-form-invalid-feedback>
    </form>
  </b-modal>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ModalInstituicao",
  // props: [laboratorio],
  data() {
    return {
      evento: "",
      nomeState: "",
      cnpjState: "",
      telefoneState: "",
      cidadeState: "",
      bairroState: "",
      numeroState: "",
      ruaState: "",
      nome: "",
      cnpj: "",
      telefone: "",
      cidade: "",
      bairro: "",
      complemento: "",
      rua: "",
      numero: "",
      txtBotaoIncluir: "Salvar",
      txtBotaoExcluir: "Cancelar",
      tipo: "",
      id: "",
      options: [
        { value: 0, text: "Educação Básica" },
        { value: 1, text: "Educação Superior" },
        { value: 2, text: "Outro" }
      ]
    };
  },
  methods: {
    showModal() {
      this.$bvModal.show("modal-form");
    },
    resetModal() {
      this.$bvModal.hide("modal-form");
    },
    salvaInstituicao() {
      api
        .put(`/instituicao/${this.id}`, {
          nome: this.nome,
          telefone: this.telefone,
          cnpj: this.cnpj,
          cep: this.cep,
          tipo: this.tipo,
          bairro: this.bairro,
          rua: this.rua,
          numero: this.numero,
          complemento: this.complemento,
          cidade: this.cidade
        })
        .then(response => {
          if (response.data.status == 201) {
            this.preencheCampos(response.data.instituicao);
          }
        });
    },
    preencheCampos(instituicao) {
      this.nome = instituicao.nome;
      this.cnpj = instituicao.cnpj;
      this.telefone = instituicao.telefone;
      this.cidade = instituicao.cidade;
      this.cep = instituicao.cep;
      this.bairro = instituicao.bairro;
      this.complemento = instituicao.complemento;
      this.rua = instituicao.rua;
      let tipoInstit = instituicao.tipo;
      this.id = instituicao.id;
      switch (tipoInstit) {
        case "Ensino Fundamental": {
          this.tipo = 0;
          break;
        }
        case "Ensino Médio": {
          this.tipo = 1;
          break;
        }
        case "Ensino Superior": {
          this.tipo = 2;
          break;
        }
      }
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
        if (mes) {
          valorFinal += 1;
        }
        return `0${valorFinal}`;
      }
      return valorFinal;
    },
    recebeValoresInstituicao(instituicao) {
      this.preencheCampos(instituicao);
      this.showModal();
    }
  }
};
</script>

<style>
</style>
