<template>
  <section class="login">
    <div v-if="!mostrarLoading">
      <h1>Login</h1>
      <form action>
        <label for="Email">Email:</label>
        <input type="email" name="email" id="email" v-model="dadosLogin.email" />
        <label for="Senha">Senha:</label>
        <input type="password" name="senha" id="senha" v-model="dadosLogin.senha" />
        <b-button class="btn login" @click.prevent="logar">Entrar</b-button>
      </form>

      <b-modal id="my-modal" centered title="Entrar no sistema" ok-only>
        <p class="my-2">{{ resposta }}</p>
      </b-modal>
    </div>
    <div v-else> 
      <loading-page :v-if="mostrarLoading"></loading-page>
    </div>
  </section>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
import { mapState, mapGetters } from "vuex";
import PaginaCarregando from "@/components/PaginaCarregando.vue";
// import ModalMensagem from "@/components/ModalMensagem.vue";
export default {
  name: "Login",
  components: {
    loadingPage: PaginaCarregando
    // mensagem: ModalMensagem
  },
  data() {
    return {
      dadosLogin: {
        email: "",
        senha: ""
      },
      mostrarLoading: false,
      resposta: "",
      boxConfirmation: ""
    };
  },

  methods: {
    logar() {
      this.mostrarLoading = true;
      if (this.verificaCampos()) {
        // let contador = 0;
        // while(contador < 10){
        //   console.log('Contador: ', contador);
          if (this.$store.state.login) {
            console.log('Entrou alguma vez?');
            this.resposta = "Logado com sucesso!";
            this.$router.push({ path: "/laboratorios"});
            this.$bvModal.show("my-modal");
            this.mostrarLoading = true;
          }else{
            this.$store.dispatch("login", this.dadosLogin);
          }
          // contador += 1;
        }
      // } else this.resposta = "Verifique os campos";
    },
    verificaCampos() {
      if (!this.dadosLogin.email) {
        return false;
      }
      if (!this.dadosLogin.senha) {
        return false;
      }
      return true;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    }
  },
  watch: {
    login(novo_valor) {
      if (novo_valor) {
            this.resposta = "Logado com sucesso!";
            this.$router.push({ path: "/laboratorios"});
            this.$bvModal.show("my-modal");
        
        // this.$refs["my-modal"].show();
      }
    },
    
  },
  computed: {
    ...mapState(["login"]),
    respostaMensagem() {
      if (this.verificaCampos()) {
        return true;
      } else return false;
    }
  }
};
</script>

<style scoped>
label {
  margin-bottom: 7px;
  font-weight: bold;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #260078;
}

.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

form {
  display: grid;
}

/* .btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
} */

.opcoes-adicionais {
  text-align: center;
  margin: 20px auto 0 auto;
}

.opcoes-adicionais p {
  display: inline;
  margin: 10px;
}

.perdeu a:hover {
  color: #84f;
  text-decoration: underline;
}

.btn {
  margin-top: 13px;
  padding: 10px 20px 10px 20px;
  background-color: #17a2b8;
}

.btn:hover {
  background: rgb(22, 112, 196);
}
</style>
