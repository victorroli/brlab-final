<template>
  <section class="register" v-if="!this.$store.state.login">
    <transition mode="out-in">
      <UsuarioForm ref="registraUsuario">
        <template v-slot:titulo>
          <h2>Cadastro de Usuário</h2>
        </template>
        <template>
          <button class="btn" @click.prevent="salvarUsuario">Criar Usuário</button>
        </template>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { mapFields } from "@/helpers/mapFields.js";

export default {
  name: "RegisterUser",
  components: {
    UsuarioForm
  },
  methods: {
    salvarUsuario() {
      // if (this.verificaCampos()) {
      console.log("Entrou...");
      this.$refs.registraUsuario.salvarUsuario();
      console.log("Situacao login: ", this.$store.state.login);
      if (this.$store.state.login) {
        console.log("Usuario logado!");
        this.$router.push({ path: "/" });
      }
      // }
    },
    verificaCampos() {
      console.log("Nome: ", this.name);
      if (this.name == "") {
        alert("Campo Nome não informado");
        return false;
      }
      if (this.email == "") {
        alert("Email não informado");
        return false;
      }
      if (this.senha == "") {
        alert("Campo Senha não informado");
        return false;
      }
      if (this.confirm_senha == "") {
        return false;
      }
      // if (this.senha !== this.confirm_senha) {
      //   return false;
      // }
      return true;
    },
    mostraDadosLogin() {
      return !this.$store.state.login || this.$route.name === "usuario-editar";
    }
  },
  watch: {
    // name: function(novo, velho) {
    //   console.log("Novo valor: ", novo);
    //   console.log("Valor antigo: ", velho);
    // }
  },
  computed: {
    ...mapFields({
      fields: ["name", "email", "senha", "confirm_senha", "nickname"],
      base: "usuario"
      // mutation: "UPDATE_USUARIO",
      // action: "setUsuario"
    })
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px auto 10px auto;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}

.register {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

label {
  margin-bottom: 7px;
  font-weight: bold;
}

form {
  display: grid;
}
</style>
