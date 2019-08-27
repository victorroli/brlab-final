<template>
  <section class="register" v-if="this.$store.state.login">
    <transition mode="out-in">
      <UsuarioForm ref="registraUsuario" :usuario="this.$store.state.usuario">
        <template v-slot:titulo>
          <h1>Editar Perfil</h1>
        </template>
        <br />
        <template>
          <div class="group-button">
            <b-button class="btn salvar" @click.prevent="salvarUsuario">Salvar</b-button>
          </div>
        </template>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { mapFields } from "@/helpers/mapFields.js";
import { api } from "@/services.js";

export default {
  name: "EditarPerfil",
  data() {
    return {
      listaPapeis: []
    };
  },
  components: {
    UsuarioForm
  },
  methods: {
    salvarUsuario() {
      this.$refs.registraUsuario.salvarUsuario();
      if (this.$store.state.login) {
        this.$router.push({ path: "/" });
      }
    },
    verificaCampos() {
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
  },
  created() {}
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 20px auto 20px auto;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.button {
  text-align-last: center;
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
