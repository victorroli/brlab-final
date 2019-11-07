<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
          <router-link class="menu" to="/">BrLab</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-show="usuario_logado">
              <router-link class="menu" to="/experimentos">Meus Experimentos</router-link>
            </b-nav-item>

            <b-nav-item-dropdown text="Laboratórios" left v-if="usuario_logado">
              <router-link class="menu" tag="b-dropdown-item" to="/laboratorios">Disponíveis</router-link>
              <router-link
                v-if="this.$store.state.papel_id = 1"
                class="menu"
                tag="b-dropdown-item"
                :to="{name: 'laboratorios-cadastrados'}"
              >Cadastrados</router-link>

              <router-link
                class="menu"
                tag="b-dropdown-item"
                :to="{name: 'solicitacoes-laboratorios'}"
              >Solicitações</router-link>
              <router-link class="menu" tag="b-dropdown-item" :to="{name: 'novo-laboratorio'}">Novo</router-link>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              text="Convênios"
              left
              v-if="this.$store.state.papel_id = 1 && usuario_logado"
            >
              <router-link tag="b-dropdown-item" :to="{name:'convenios_ativos'}">Ativos</router-link>
              <router-link tag="b-dropdown-item" :to="{name:'novo_convenio'}">Novo</router-link>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              text="Instituições"
              v-if="this.$store.state.papel_id = 1 && usuario_logado"
              left
            >
              <router-link tag="b-dropdown-item" :to="{name:'instituicoes_conveniadas'}">Cadastradas</router-link>
              <router-link tag="b-dropdown-item" :to="{name:'nova_instituicao'}">Nova</router-link>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              text="Usuários"
              class="menu"
              v-if="this.$store.state.papel_id = 1 && usuario_logado"
            >
              <router-link tag="b-dropdown-item" class="menu" to="/usuarios">Todos</router-link>
              <router-link
                tag="b-dropdown-item"
                class="menu"
                :to="{name:'solicitacoes_usuarios'}"
              >Solicitações</router-link>
              <router-link tag="b-dropdown-item" class="menu" :to="{name: 'register-user'}">Novo</router-link>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right v-if="this.$store.state.login">
              <template slot="button-content">
                <em>{{nome}}</em>
              </template>
              <b-dropdown-item>
                <router-link tag="b-dropdown-item" class="menu" :to="{name: 'editar_perfil'}">Perfil</router-link>
              </b-dropdown-item>
              <!-- <b-dropdown-item> -->
              <!-- <router-link tag="b-dropdown-item" class="menu" @click="logout">Logout</router-link> -->
              <!-- <b-button @click="logout">Logout</b-button> -->
              <b-dropdown-item-btn @click="logout()">Logout</b-dropdown-item-btn>
              <!-- </b-dropdown-item> -->
            </b-nav-item-dropdown>

            <b-nav-item v-if="!this.$store.state.login">
              <router-link class="menu" tag="b-nav-item" to="/login">Login</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      papel: "",
      respostaLogout: ""
    };
  },

  methods: {
    logout() {
      this.confirmaAcao();
    },
    confirmaAcao() {
      this.respostaLogout = "";
      this.$bvModal
        .msgBoxConfirm("Deseja realmente sair do BrLab?", {
          title: "Logout",
          okVariant: "info",
          okTitle: "Sim",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.respostaLogout = value;
        })
        .catch(erro => {
          return;
        });
    }
  },
  watch: {
    respostaLogout(valor) {
      if (valor) {
        this.$store.dispatch("logout");
        this.$router.push({ path: "/login" });
      }
    }
  },
  computed: {
    usuario_logado() {
      if (this.$store.state.login) {
        this.papel = this.$store.state.usuario.descricao_papel;
        return true;
      }
      return false;
    },

    nome() {
      let stringFinal = "";
      if (this.$store.state.login) {
        stringFinal = " (" + this.papel + ")";
      }
      return this.$store.state.usuario.nome + stringFinal;
    }
  }
};
</script>

<style scoped>
/* b-nav-item-dropdown a {
  color: #fff;
} */
.nav-link span {
  color: #fff;
}
/* nav {
  display: grid;
  grid-template-columns: 10% 70% 20%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.2);
}

nav .btn {
  margin-left: 30%;
}
.second-column a {
  display: inline-block;
  padding: 10px 30px;
  color: #65d;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.second-column a:hover {
  transform: scale(1.1);
  color: #09661a;
  font-weight: bold; 
} */
/* 
.second-column a:nth-child(1):hover {
  background: tomato;
}

.second-column a:nth-child(2):hover {
  background: red;
}

.second-column a:nth-child(3):hover {
  background: greenyellow;
} */

/* .logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}

.info {
  display: flex;
  justify-content: end;
} */
a {
  color: #fff;
}
a .dropdown-item {
  background: green;
}

.ml-auto a {
  color: #000;
}
</style>
