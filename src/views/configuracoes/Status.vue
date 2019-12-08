<template>
  <section>
    <div id="status" v-if="listaStatus.length">
      <h1>Papeis</h1>
      <b-table
        striped
        hover
        :items="listaStatus"
        :fields="fields"
        class="text-center"
        v-if="listaStatus.length"
      >
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">
            <font-awesome-icon icon="edit" />Editar
          </b-button>
          <b-button class="excluir" @click="excluir(row.item)">
            <font-awesome-icon icon="trash" />Excluir
          </b-button>
        </template>
      </b-table>
      <modal-papeis ref="modalPapeis"></modal-papeis>
      <div class="group-button">
        <b-button @click="novoPapel()">
          <font-awesome-icon icon="plus-circle" />Novo Papel
        </b-button>
      </div>
    </div>
    <div v-else>
      <PaginaCarregando v-if="listaStatus.length == 0" />
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "Status",
  data() {
    return {};
  },
  methods: {
    buscaStatus() {}
  }
};
</script>