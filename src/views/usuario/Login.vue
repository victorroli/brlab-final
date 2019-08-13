<template>
  <section class="login">
    <h1>Login</h1>
    <form action>
      <label for="Email">Email:</label>
      <input type="email" name="email" id="email" v-model="dadosLogin.email" />
      <label for="Senha">Senha:</label>
      <input type="password" name="senha" id="senha" v-model="dadosLogin.senha" />
      <button class="btn" @click.prevent="logar">Entrar</button>
    </form>
    <div class="opcoes-adicionais">
      <p class="perdeu">
        <a href="/" target="_blank">Esqueci minha senha.</a>
      </p>
      <p class="perdeu">
        <router-link :to="{name: 'register-user'}">Criar nova conta</router-link>
      </p>
    </div>

    <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        <slot>
          <h1>{{resposta}}</h1>
        </slot>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Fechar</b-button>
    </b-modal>
  </section>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
import { mapState } from "vuex";
// import ModalMensagem from "@/components/ModalMensagem.vue";
export default {
  name: "Login",
  components: {
    // mensagem: ModalMensagem
  },
  data() {
    return {
      dadosLogin: {
        email: "",
        senha: ""
      },
      resposta: "",
      boxConfirmation: ""
    };
  },

  methods: {
    logar() {
      if (this.verificaCampos()) {
        this.$store.dispatch("login", this.dadosLogin);
        this.resposta = "Logado com sucesso!";
        //   // console.log("Login: ", this.$store.state.login);
      } else this.resposta = "Credenciais erradas";
      this.$bvModal
        .msgBoxConfirm(this.resposta, {
          size: "md",
          buttonSize: "md",
          okTitle: "Ok",
          // okOnly: true,
          okOnly: true,
          // cancelVariant: true,
          // footerClass: "p-3",
          // hideHeaderClose: true,
          centered: true
        })
        .then(resposta => {
          if (this.login) {
            if (resposta == null || resposta) {
              this.$router.push({ path: "/" });
            }
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    verificaCampos() {
      if (!this.dadosLogin.email) {
        console.log("Email inválido...");
        return false;
      }
      if (!this.dadosLogin.senha) {
        console.log("Senha inválida...");
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
        // this.$refs["my-modal"].show();
      }
    }
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
  color: #84f;
}

.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

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
</style>