<template>
  <form>
    <slot name="titulo"></slot>

    <div class="usuario" v-if="mostraDadosLogin">
      <label for="nome">Nome:</label>
      <!-- <input id="nome" type="text" name="nome" v-model="name" /> -->
      <input id="nome" type="text" name="nome" v-model="registro.name" />
      <!-- {{registro.name}} -->
      <label for="nickname">Nickname:</label>
      <input id="nickname" type="text" name="nickname" v-model="registro.nickname" />

      <label for="email">Email:</label>
      <input id="email" type="email" name="email" v-model="registro.email" />

      <label for="senha">Senha:</label>
      <input id="senha" type="password" name="senha" v-model="registro.senha" />

      <label for="senha">Confirmar Senha:</label>
      <input id="confirm_senha" type="password" name="confirm_senha" v-model="confirm_senha" />
    </div>

    <!-- <label for="cep">Cep</label>
    <input id="cep" type="text" name="cep" v-model="cep" @keyup="preencherCep" maxlength="8">

    <label for="rua">Rua</label>
    <input id="rua" type="text" name="rua" v-model="rua">

    <label for="numero">Número</label>
    <input id="numero" type="text" name="numero" v-model="numero">

    <label for="bairro">Bairro</label>
    <input id="bairro" type="text" name="bairro" v-model="bairro">

    <label for="cidade">Cidade</label>
    <input id="cidade" type="text" name="cidade" v-model="cidade">

    <label for="estado">Estado</label>
    <input id="estado" type="text" name="estado" v-model="estado">-->

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
// import { getCep } from "@/services.js";

export default {
  name: "UsuarioForm",
  data() {
    return {
      registro: {
        name: "",
        email: "",
        nickname: "",
        senha: ""
      }
    };
  },
  methods: {
    salvarUsuario() {
      this.$store.dispatch("setUsuario", this.registro);
    }
  },
  watch: {
    "registro.name": function(novo, velho) {
      // if (novo != "") registro.name = novo;
      console.log("Name: ", novo);
    },
    "registro.nickname": function(novo, velho) {
      console.log("Nickname: ", novo);
    },
    "registro.senha": function(novo) {
      console.log("Nova senha: ", novo);
    },
    "registro.email": function(novo) {
      console.log("Novo email: ", novo);
    }
  },
  computed: {
    confirm_senha: {
      set: function(valor) {
        if (
          (valor.length !== this.registro.senha.length && valor.length > 0) ||
          (valor !== this.registro.senha && this.registro.senha.length > 0)
        ) {
          console.log("As senhas estão diferentes");
        } else console.log("Senhas iguais!!!");
      }
    },
    mostraDadosLogin() {
      return !this.$store.state.login || this.$route.name === "usuario-editar";
    }
  }
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  /* grid-template-columns: 1fr; */
  align-items: center;
}

/* .usuario {
  grid-column: 1/ 3;
} */
</style>

