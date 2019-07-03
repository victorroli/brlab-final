<template>
  <section class="register">
    <h2>Cadastro de Usuário</h2>
    <transition mode="out-in">
      <UsuarioForm>
        <button class="btn" @click.prevent="salvarUsuario">Criar Usuário</button>
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
      if (this.verificaCampos()) {
        this.$store.dispatch(this.$store.state.usuario.name);
      }
      console.log("P: ", this.senha);
      console.log("CP: ", this.confirm_senha);
    },
    verificaCampos() {
      if (this.name == "") {
        return false;
        alert("Campo Nome não informado");
      }
      if (this.email == "") {
        return false;
      }
      if (this.senha == "") {
        return false;
      }
      if (this.confirm_senha == "") {
        return false;
      }
      if (this.senha !== this.confirm_senha) {
        return false;
      }
      return true;
    }
  },
  computed: {
    ...mapFields({
      fields: ["nome", "email", "senha", "confirm_senha"],
      base: "usuario",
      mutation: "UPDATE_USUARIO",
      action: "setUsuario"
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
