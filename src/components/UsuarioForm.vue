<template>
  <form>
    <slot name="titulo"></slot>
    <div class="usuario" v-if="mostraDadosLogin">
      <label for="nome">Nome:</label>
      <!-- <input id="nome" type="text" name="nome" v-model="name" /> -->
      <b-form-input id="nome" type="text" name="nome" v-model="registro.nome" />

      <label for="nickname">Nickname:</label>
      <b-form-input id="nickname" type="text" name="nickname" v-model="registro.nickname" />

      <label for="papel">Função atual:</label>
      <b-form-select v-model="registro.papel_id" :options="papeis"></b-form-select>

      <label for="email">Email:</label>
      <b-form-input id="email" type="email" name="email" v-model="registro.email" />

      <label for="senha">Senha:</label>
      <b-form-input id="senha" :type="tipo_senha" name="senha" v-model="registro.senha" />
      <b-button @click="exibeSenha">mostrar</b-button>
      <label for="senha">Confirmar Senha:</label>
      <b-form-input
        id="confirm_senha"
        :type="tipo_senha"
        name="confirm_senha"
        v-model="confirm_senha"
      />
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
import { api } from "@/services.js";

export default {
  name: "UsuarioForm",
  props: ["lista", "usuario"],
  data() {
    return {
      registro: {
        nome: "",
        email: "",
        nickname: "",
        senha: "",
        papel_id: ""
      },
      mostrar: false,
      tipo_senha: "password",
      papeis: []
    };
  },
  methods: {
    salvarUsuario(acao = null) {
      if (acao == "editar") {
        this.$store.dispatch("updateUsuario", this.registro);
      }
      // this.$store.dispatch("setUsuario", this.registro);
    },
    checUsuario() {
      if (this.usuario) {
        this.registro.nome = this.usuario.nome;
        this.registro.nickname = this.usuario.nickname;
        this.registro.senha = this.usuario.senha;
        this.registro.email = this.usuario.email;
        this.registro.papel_id = this.usuario.papel_id;
      }
    },
    buscaPapeis() {
      api.get(`/papel/`).then(response => {
        response.data.papeis.forEach(elemento => {
          let papel = Object({
            value: elemento.id,
            text: elemento.nome
          });
          // console.log("Paper: ", papel.nome);
          this.papeis.push(papel);
        });
      });
    },
    exibeSenha() {
      this.mostrar = !this.mostrar;
      if (this.mostrar) this.tipo_senha = "text";
      else this.tipo_senha = "password";
    }
  },
  created() {
    this.checUsuario();
    this.buscaPapeis();
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
    },
    usuario(valor) {
      console.log("Usuario: ", valor);
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
      return !this.$store.state.login || this.$route.name === "editar_perfil";
    }
  },
  beforeUpdate() {
    // this.papeis = [];
    // this.lista.forEach(elemento => {
    //   let opcao = Object({
    //     value: elemento.id,
    //     text: elemento.nome
    //   });
    //   this.papeis.push(opcao);
    // });
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

