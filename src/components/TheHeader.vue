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
            <b-nav-item>
              <router-link class="menu" to="/experimentos">Meus Experimentos</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link class="menu" to="/reservas">Reservas</router-link>
            </b-nav-item>
            <!-- <b-nav-item>
              <router-link class="menu" to="/grupos">Grupos</router-link>
            </b-nav-item>-->
            <b-nav-item>
              <router-link class="menu" to="/laboratorios">Laboratórios</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right v-if="this.$store.state.login">
              <template slot="button-content">
                <em>{{nome}}</em>
              </template>
              <b-dropdown-item>
                <router-link class="menu" to="/">Perfil</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-button @click="logout">Logout</b-button>
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item v-if="!this.$store.state.login">
              <router-link class="menu" to="/login">Login</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "TheHeader",
  // data() {
  //   return {};
  // },
  // watch: {},
  methods: {
    logout() {
      console.log("Logout...");
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    // ...mapState(["login"])
    nome() {
      // console.log("LOgger: ", this.$store.state.login);
      let stringFinal = "";
      if (this.$store.state.login) {
        stringFinal = "(online)";
      }
      return this.$store.state.usuario.name + stringFinal;
    }
  }
};
</script>

<style scoped>
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
.ml-auto a {
  color: #000;
}
</style>
