<template>
  <section class="register">
    <h2>Cadastro de Usuário</h2>
    <transition mode="out-in">
      <UsuarioForm>
        <button class="btn">Criar Usuário</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "RegisterUser",
  components: {
    UsuarioForm
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px auto 10px auto;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}

.register {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

label {
  margin-bottom: 7px;
  font-weight: bold;
}

form {
  display: grid;
}
</style>
