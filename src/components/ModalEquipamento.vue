<template>
  <section>
    <b-modal
      id="modal-equipamento"
      ref="modal"
      title="Novo Equipamento"
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <label for="uri-input">Nome:</label>
        <b-form-input
          id="nome-input"
          v-model="nome"
          :state="nomeState"
          required
          aria-describedby="nome-input"
        ></b-form-input>
        <b-form-invalid-feedback id="nome-input">Campo Nome obrigatório</b-form-invalid-feedback>

        <label for="uri-input">URI:</label>
        <b-form-input
          invalid-feedback="O URI é obrigatório"
          id="uri-input"
          v-model="uri"
          :state="uriState"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="uri-input">Campo URI obrigatório</b-form-invalid-feedback>

        <label for="uri-input">Descrição:</label>
        <b-form-textarea
          id="descricao-input"
          v-model="descricao"
          placeholder="Descreva um pouco sobre o equipamento..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback id="descricao-input">Campo descrição obrigatório</b-form-invalid-feedback>
      </form>
    </b-modal>
  </section>
</template>
<script>
export default {
  name: "ModalEquipamento",
  data() {
    return {
      nomeState: null,
      descricaoState: null,
      uriState: null,
      modo: "",
      nome: "",
      uri: "",
      descricao: "",
      //   equipamento: {
      //     nome: "",
      //     descricao: "",
      //     uri: ""
      //   },
      listaEquipamentos: []
    };
  },
  /* Variáveis não reativas */
  equipamentos: [],
  nome: "",
  descricao: "",
  uri: "",
  id: "",
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      this.descricaoState = valid ? "valid" : "invalid";
      this.uriState = valid ? "valid" : "invalid";
      return valid;
    },
    showModal(estado) {
      console.log("Modo: ", this.modo);
      if (!this.modo) {
        console.log("Zerou tudo");
        this.nome = "";
        this.descricao = "";
        this.uri = "";
      }

      this.uriState = null;
      this.nameState = null;
      this.descricaoState = null;
      this.$bvModal.show("modal-equipamento");
    },
    resetModal() {
      this.uriState = null;
      this.nameState = null;
      this.descricaoState = null;
      this.modo = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      let indexSelecionado = "";
      if (this.nome && this.nome != undefined) {
        let equipamento = Object({
          nome: this.nome,
          descricao: this.descricao,
          uri: this.uri,
          id: this.id
        });

        if (this.modo == "editar") {
          this.listaEquipamentos.forEach((elemento, indice) => {
            if (elemento.id == equipamento.id) {
              indexSelecionado = indice;
            }
          });
          if (indexSelecionado == 0 || indexSelecionado != "")
            this.listaEquipamentos[indexSelecionado] = equipamento;
          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
          return;
        }
        this.listaEquipamentos.push(equipamento);
        this.$parent._data.listaEquipamentos = this.listaEquipamentos;
        this.$store.commit("UPDATE_EQUIPAMENTOS", this.listaEquipamentos);
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.modo = "";
        this.$refs.modal.hide();
      });
    },
    recebeValores(item, modo) {
      this.preencheCampos(item);
      this.modo = modo;
      this.showModal(true);
    },
    preencheCampos(equipamento) {
      console.log("O que chegou: ", equipamento);
      this.nome = equipamento.nome;
      this.uri = equipamento.uri;
      this.descricao = equipamento.descricao;
      this.id = equipamento.id;
    }
  }
};
</script>
<style>
</style>