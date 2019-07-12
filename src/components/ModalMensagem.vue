<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="titulo">
      <div class="d-block text-center">
        <slot></slot>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Fechar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalMensagem",
  props: ["titulo"],
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    }
  },
  watch: {
    titulo() {
      console.log("mensagem: ", mensagem);
    }
  }
};
</script>