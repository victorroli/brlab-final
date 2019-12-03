<template>
  <section class="register">
    <transition mode="out-in">
      {{usuario}}
      <UsuarioForm ref="registraUsuario" :lista="listaPapeis" :usuario="usuario">
        <template v-slot:titulo>
          <h1>Cadastro de Usuário</h1>
        </template>
        <br />
        <template>
          <div class="group-button">
            <b-button class="btn salvar" @click.prevent="salvarUsuario">Criar Usuário</b-button>
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
  name: "RegisterUser",
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
  computed: {
    ...mapFields({
      fields: ["name", "email", "senha", "confirm_senha", "nickname"],
      base: "usuario"
      // mutation: "UPDATE_USUARIO",
      // action: "setUsuario"
    })
  },
  created() {
    api.get(`/papel/`).then(response => {
      response.data.papeis.forEach(elemento => {
        let papel = Object({
          id: elemento.id,
          nome: elemento.nome
        });
        this.listaPapeis.push(papel);
      });
    });
  }
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
  max-width: 700px;
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
