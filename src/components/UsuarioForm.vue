<template>
  <form>
    <slot name="titulo"></slot>
    <div class="usuario">
      <b-container>
        <b-row>
          <b-col class="labels" cols="3">
            <label for="nome">Nome:</label>
          </b-col>
          <b-col cols="8">
            <!-- <input id="nome" type="text" name="nome" v-model="name" /> -->
            <b-form-input id="nome" type="text" name="nome" v-model="registro.nome" />
          </b-col>
        </b-row>

        <b-row>
          <b-col class="labels" cols="3">
            <label for="nickname">Nickname:</label>
          </b-col>

          <b-col cols="8">
            <b-form-input id="nickname" type="text" name="nickname" v-model="registro.nickname" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="labels" cols="3">
            <label for="papel">Função atual:</label>
          </b-col>
          <b-col cols="8">
            <b-form-select v-model="registro.papel_id" :options="papeis"></b-form-select>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col class="labels" cols="3">
            <label for="email">Email:</label>
          </b-col>
          <b-col cols="8">
            <b-form-input id="email" type="email" name="email" v-model="registro.email" />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" class="labels">
            <label>Senha:</label>
          </b-col>
          <b-col cols="7" class="senha-input">
            <b-form-input id="senha" :type="tipo_senha" name="senha" v-model="registro.senha" />
          </b-col>
          <b-col cols="2" class="senha-icon">
            <b-button @click="exibeSenha">
              <font-awesome-icon :icon="tipo_icone" />
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col" cols="3">
            <label for="senha">Confirmar Senha:</label>
          </b-col>
          <b-col cols="8">
            <b-form-input
              id="confirmsenha"
              :type="tipo_senha"
              name="confirm_senha"
              v-model="confirm_senha"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>

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
      tipo_icone: "eye",

      mostrar: false,
      tipo_senha: "password",
      papeis: []
    };
  },
  methods: {
    salvarUsuario(acao = null) {
      if (acao == "editar") {
        this.$store.dispatch("updateUsuario", this.registro);
        alert("Usuário editado com sucesso!!!");
      }
      this.$store.dispatch("setUsuario", this.registro);
      alert("Usuário cadastrado com sucesso!!");
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
      if (this.mostrar) {
        this.tipo_senha = "text";
        this.tipo_icone = "eye";
      } else {
        this.tipo_senha = "password";
        this.tipo_icone = "eye-slash";
      }
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
        if (this.registro.senha.length == valor.length) {
          if (this.registro.senha != valor) {
            alert("As senhas estão diferentes. Verifique!");
          }
        }
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
  width: 700px;
}

.senhas {
  padding: 0px;
}

.senha-input {
  padding-right: 0px;
}

.senha-icon {
  padding: 0px;
}
</style>

