<template>
  <form>
    <slot name="titulo"></slot>
    <div class="usuario">
      <form>
        <label for="nome">Nome:</label>
        <b-form-input id="nome" type="text" name="nome" v-model="registro.nome" />

        <label for="nickname">Nickname:</label>

        <b-form-input id="nickname" type="text" name="nickname" v-model="registro.nickname" />
        <label for="papel">Função atual:</label>
        <b-form-select v-model="registro.papel_id" :options="papeis"></b-form-select>
        <br />
        <label for="email">Email:</label>
        <b-form-input id="email" type="email" name="email" v-model="registro.email" />

        <label>Senha:</label>
        <b-form-input id="senha" type="text" name="senha" v-model="registro.senha" />
        <label for="senha">Confirmar Senha:</label>
        <b-form-input id="confirmsenha" type="text" name="confirm_senha" v-model="confirm_senha" />
      </form>
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
        this.boxMensagem("Usuário editado com sucesso!!!");
      }
      if (acao == "salvar") {
        if (this.verificaCampos()) {
          this.boxMensagem("Preencha todos os campos...");
        } else {
          this.setUsuario();
        }
      }
    },
    setUsuario() {
      api
        .post(`/usuario`, {
          nome: this.registro.nome,
          email: this.registro.email,
          senha: this.registro.senha,
          nickname: this.registro.nickname,
          papel_id: this.registro.papel_id
        })
        .then(response => {
          if (response.data.status == 201) {
            this.boxMensagem(
              "Usuário " + this.registro.nome + " cadastrado com sucesso!!!"
            );
          } else if (response.data.status == 200) {
            this.boxMensagem(
              "Usuário " + this.registro.nome + " já cadastrado!!!"
            );
          }
        });
    },
    verificaCampos() {
      let erro = false;
      if (!this.registro.nome) {
        erro = true;
      }
      if (!this.registro.email) {
        erro = true;
      }
      if (!this.registro.nickname) {
        erro = true;
      }
      if (!this.registro.senha) {
        erro = true;
      }
      if (!this.registro.papel_id) {
        erro = true;
      }
      return erro;
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
      this.papeis = [];
      api.get(`/usuarios/papeis`).then(response => {
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
    },
    boxMensagem(mensagem) {
      this.$bvModal.msgBoxOk(mensagem, {
        footerClass: "p-2",
        buttonSize: "md",
        centered: true
      });
      this.buscaPapeis();
    }
  },
  created() {
    this.checUsuario();
    this.buscaPapeis();
  },
  watch: {
    // "registro.name": function(novo, velho) {
    //   // if (novo != "") registro.name = novo;
    //   console.log("Name: ", novo);
    // },
    // "registro.nickname": function(novo, velho) {
    //   console.log("Nickname: ", novo);
    // },
    // "registro.senha": function(novo) {
    //   console.log("Nova senha: ", novo);
    // },
    // "registro.email": function(novo) {
    //   console.log("Novo email: ", novo);
    // },
    // usuario(valor) {
    //   console.log("Usuario: ", valor);
    // }
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
