<template>
  <section>
    <b-modal
      id="modal-usuario"
      ref="modal"
      title="Editar Usuário"
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

        <label for="nickname-input">Nickname:</label>

        <b-form-input
          invalid-feedback="O nickname é obrigatório"
          id="nickname-input"
          v-model="nickname"
          :state="nicknameState"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="nickname-input">Campo nickname obrigatório</b-form-invalid-feedback>

        <label for="email-input">Email:</label>
        <b-form-input
          invalid-feedback="O email é obrigatório"
          id="email-input"
          v-model="email"
          :state="emailState"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="email-input">Campo email obrigatório</b-form-invalid-feedback>

        <label for="funcao">Função:</label>
        <b-form-select v-model="papel_id" :options="papeis"></b-form-select>
      </form>
    </b-modal>
  </section>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "ModalEquipamento",
  data() {
    return {
      nomeState: null,
      emailState: null,
      nicknameState: null,
      nickname: null,
      senha: null,
      nome: null,
      email: "",
      nickname: "",
      senha: "",
      papel_id: "",
      papeis: []
    };
  },
  /* Variáveis não reativas */
  equipamentos: [],
  nome: "",
  descricao: "",
  uri: "",
  id: "",
  created() {
    api.get(`/papel/`).then(response => {
      response.data.papeis.forEach(elemento => {
        let papel = Object({
          value: elemento.id,
          text: elemento.nome
        });
        this.papeis.push(papel);
      });
    });
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      this.descricaoState = valid ? "valid" : "invalid";
      this.uriState = valid ? "valid" : "invalid";
      return valid;
    },
    showModal() {
      this.uriState = null;
      this.nameState = null;
      this.descricaoState = null;
      this.$bvModal.show("modal-usuario");
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

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    recebeValores(usuario) {
      this.preencheCampos(usuario);
      this.showModal();
    },
    preencheCampos(usuario) {
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.nickname = usuario.nickname;

      this.papeis.map(item => {
        if (item.text == usuario.funcao.toLowerCase()) {
          this.papel_id = item.value;
        }
      });
    }
  }
};
</script>
<style>
</style>