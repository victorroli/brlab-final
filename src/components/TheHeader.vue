<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand>
          <router-link to="/">
            <img id="logotipo" src="../imagens/logo_brlab.png" alt="logotipo brlab" />
          </router-link>
        </b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item v-if="usuario_logado && this.$store.state.usuario.papel_id != 1">
            <router-link class="menu" to="/laboratorios">
              <span>Laboratórios</span>
            </router-link>
          </b-nav-item>
          <b-nav-item-dropdown
            text="Laboratórios"
            left
            v-if="usuario_logado && this.$store.state.usuario.papel_id == 1"
          >
            <router-link class="menu" tag="b-dropdown-item" to="/laboratorios">Disponíveis</router-link>
            <router-link
              v-if="this.$store.state.usuario.papel_id == 1"
              class="menu"
              tag="b-dropdown-item"
              :to="{ name: 'laboratorios-cadastrados' }"
            >Cadastrados</router-link>

            <router-link
              class="menu"
              tag="b-dropdown-item"
              :to="{ name: 'solicitacoes-laboratorios' }"
            >Solicitações</router-link>
            <router-link class="menu" tag="b-dropdown-item" :to="{ name: 'novo-laboratorio' }">Novo</router-link>
          </b-nav-item-dropdown>

          <b-nav-item v-show="usuario_logado">
            <router-link class="menu" to="/experimentos">
              <span>Meus Experimentos</span>
            </router-link>
          </b-nav-item>

          <b-nav-item-dropdown
            text="Convênios"
            left
            v-if="this.$store.state.usuario.papel_id == 1 && usuario_logado"
          >
            <router-link tag="b-dropdown-item" :to="{ name: 'convenios_ativos' }">Ativos</router-link>
            <router-link tag="b-dropdown-item" :to="{ name: 'novo_convenio' }">Novo</router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            text="Instituição"
            v-if="this.$store.state.usuario.papel_id == 1 && usuario_logado"
            left
          >
            <router-link
              tag="b-dropdown-item"
              :to="{ name: 'instituicoes_conveniadas' }"
            >Cadastradas</router-link>
            <router-link tag="b-dropdown-item" :to="{ name: 'nova_instituicao' }">Nova</router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            text="Usuários"
            class="menu"
            v-if="this.$store.state.usuario.papel_id == 1 && usuario_logado"
          >
            <router-link tag="b-dropdown-item" class="menu" :to="{name: 'todos'}">Todos</router-link>
            <router-link
              tag="b-dropdown-item"
              class="menu"
              :to="{ name: 'solicitacoes-usuarios' }"
            >Solicitações</router-link>
            <router-link tag="b-dropdown-item" class="menu" :to="{ name: 'novo-usuario' }">Novo</router-link>
          </b-nav-item-dropdown>
          <b-nav-item v-if="usuario_logado">
            <router-link class="menu" to="/reservas">
              <span>Reservas</span>
            </router-link>
          </b-nav-item>
          <b-nav-item-dropdown
            text="Configuração"
            left
            v-if="usuario_logado && this.$store.state.usuario.papel_id == 1"
          >
            <router-link class="menu" tag="b-dropdown-item" :to="{name: 'papeis'}">Papeis</router-link>
            <router-link
              class="menu"
              tag="b-dropdown-item"
              :to="{name: 'status'}"
            >Status Laboratório</router-link>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="this.$store.state.login">
            <template slot="button-content">
              <em>{{ nome }}</em>
            </template>
            <b-dropdown-item>
              <router-link tag="b-dropdown-item" class="menu" :to="{ name: 'editar_perfil' }">Perfil</router-link>
            </b-dropdown-item>
            <b-dropdown-item id="logout" @click="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
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
        this.$router.push({ path: "/" });
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
.navbar.navbar-dark.navbar-expand-lg {
  background: #73d5d5;
  font-size: 1rem;
}

a:hover,
span:hover {
  text-decoration: none;
}

.dropdown-menu.show {
  color: darkcyan;
}

button.dropdown-item {
  color: white;
  background: rgb(30, 202, 210);
}

#logotipo {
  width: 90px;
}

a.nav-link span {
  color: white;
}

header {
  border-bottom: 1px solid #7bb7ec;
  box-shadow: 0 0 5px seagreen;
}

a.nav-link span {
  color: #fff;
}

a.nav-link span:hover {
  color: #260078;
}

/* .menu.router-link-exact-active.router-link-active */
</style>
