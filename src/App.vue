<template>
  <div id="app">
    <TheHeader />
    <div id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>

<style>
* {
  border-sizing: border-box;
}

body,
h1,
h2,
ul,
li,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s ease-in-out;
  /* transition: all .2s ease-in-out;  */
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}

input,
textarea,
.form-control {
  border-radius: 4px;
  border: 1px solid rgb(147, 154, 168);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #84f;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

/* Alinha botão das tabelas nas listagens */
.group-button {
  width: 100%;
  text-align: center;
}

.btn.editar.btn-secondary {
  background: dodgerblue;
}

.btn.excluir.btn-secondary {
  background: rgb(225, 11, 11);
}

.btn-secondary {
  margin: 1px 3px 1px 3px;
}

.btn.salvar:hover {
  background: #0ece3a;
}

.btn.salvar {
  background: #18bbb2;
}

/* Estilização dos ícones */
.svg-inline--fa {
  margin-right: 3px;
  width: 20px;
}

.labels {
  margin-top: 3px;
  padding-right: 0px;
}
</style>
