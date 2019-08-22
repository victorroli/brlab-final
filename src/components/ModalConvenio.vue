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

      <label for="laboratorio-input">Laboratório:</label>
      <b-form-input id="laboratorio-input" v-model="laboratorio" :state="laboratorioState"></b-form-input>
      <b-form-invalid-feedback id="laboratorio-input">Campo laboratorio obrigatório</b-form-invalid-feedback>

      <label for="instituicao-input">Instituição:</label>
      <b-form-input id="instituicao-input" v-model="instituicao" :state="instituicaoState"></b-form-input>
      <b-form-invalid-feedback id="instituicao-input">Campo instituicao obrigatório</b-form-invalid-feedback>
    </form>
  </b-modal>
</template>

<script>
import { api } from "@/services.js";
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
        .put(`/convenio/${this.id}`, {
          //   nome: this.nome,
          //   telefone: this.telefone,
          //   cnpj: this.cnpj,
          //   cep: this.cep,
          //   tipo: this.tipo,
          //   bairro: this.bairro,
          //   rua: this.rua,
          //   numero: this.numero,
          //   complemento: this.complemento,
          //   cidade: this.cidade
        })
        .then(response => {
          //   if (response.data.status == 201) {
          //     this.preencheCampos(response.data.instituicao);
          //   }
        });
    },
    preencheCampos(convenio) {
      console.log("Convenio: ", convenio);
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
    recebeValoresConvenio(convenio) {
      this.preencheCampos(convenio);
      this.showModal();
    }
  }
};
</script>

<style>
</style>
