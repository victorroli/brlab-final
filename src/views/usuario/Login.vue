<template>
  <section class="login">
    <h1>Login</h1>
    <form action>
      <label for="Email">Email:</label>
      <input type="email" name="email" id="email" v-model="dadosLogin.email" />
      <label for="Senha">Senha:</label>
      <input type="password" name="senha" id="senha" v-model="dadosLogin.senha" />
      <b-button class="btn login" @click.prevent="logar">Entrar</b-button>
    </form>
    <!-- <div class="opcoes-adicionais">
      <p class="perdeu">
        <a href="/" target="_blank">Esqueci minha senha.</a>
      </p>
      <p class="perdeu">
        <router-link :to="{name: 'register-user'}">Criar nova conta</router-link>
      </p>
    </div>-->

    <!-- <b-modal id="my-modal" ref="my-modal" hide-footer centered>
      <div class="d-block text-center">
        <slot>
          <p>{{resposta}}</p>
        </slot>
      </div>
      <b-button class="sm-2" @click="hideModal">Fechar</b-button>
    </b-modal>-->

    <b-modal id="my-modal" centered title="Entrar no sistema" ok-only>
      <p class="my-2">{{ resposta }}</p>
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
        setTimeout(() => {
          if (this.$store.state.login) {
            this.resposta = "Logado com sucesso!";
            this.$router.push({ path: "/laboratorios" });
          } else this.resposta = "Credenciais erradas. Verifique";
          this.$bvModal.show("my-modal");
        }, 2000);
      } else this.resposta = "Verifique os campos";
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
