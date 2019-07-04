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
  </section>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      dadosLogin: {
        email: "",
        senha: ""
      }
    };
  },

  methods: {
    logar() {
      this.$store.dispatch("login", this.dadosLogin);
      console.log("Login: ", this.$store.state.login);
    }
  },
  watch: {
    login(novo_valor, antigo) {
      // console.log(novo_valor);
      if (novo_valor) {
        alert("Logado com sucesso!!!");
        this.$router.push({ path: "/" });
      }
      // else {
      //   alert("Credenciais erradas, tente novamente!");
      // }
    }
  },
  computed: {
    ...mapState(["login"])
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