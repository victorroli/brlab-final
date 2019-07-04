<template>
  <header>
    <nav>
      <div>
        <router-link to="/" class="logo">
          <img src="@/assets/ranek.svg" alt="ranek logo" />
        </router-link>
      </div>
      <div class="second-column">
        <router-link class="menu" to="/experimentos">Meus Experimentos</router-link>
        <router-link class="menu" to="/reservas">Reservas</router-link>
        <!-- <router-link class="menu" to="/grupos">Grupos</router-link> -->
        <router-link class="menu" to="/laboratorios">Laboratórios</router-link>
      </div>
      <div>
        <!-- <p>{{nome}}</p> -->
        <router-link class="btn" to="/usuario" v-if="$store.state.login">{{nome}}</router-link>
        <router-link class="btn" to="/login" v-else>Login</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TheHeader",
  data() {
    return {};
  },
  watch: {},
  computed: {
    // ...mapState(["login"])
    nome() {
      console.log("LOgger: ", this.$store.state.usuario.name);
      return this.$store.state.usuario.name;
    }
  }
};
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 10% 70% 20%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.2);
}

nav .btn {
  /* padding-left: 80px; */
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
  /* font-weight: bold; */
}
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

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}

.info {
  display: flex;
  justify-content: end;
}
</style>
