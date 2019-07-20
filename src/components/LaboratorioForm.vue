<template>
  <form>
    <slot name="titulo"></slot>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="laboratorio.nome" />

      <label for="host">Host:</label>
      <input id="host" type="text" name="host" v-model="laboratorio.host" />

      <label for="porta">Porta:</label>
      <input id="porta" type="text" name="porta" v-model="laboratorio.porta" />

      <label for="tempo">Tempo de Experimento:</label>
      <input id="tempo" type="number" name="tempo" v-model="laboratorio.tempo" />

      <label for="descricao">Descrição:</label>
      <textarea name="descricao" id="descricao" cols="30" rows="5" v-model="laboratorio.descricao"></textarea>

      <fieldset class="equipamentos">
        <legend class="titulo-equipamento">Equipamentos</legend>
        <div class="add-equipamento">
          <EquipamentoForm ref="equipamentoRef"></EquipamentoForm>
        </div>
      </fieldset>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import EquipamentoForm from "@/components/EquipamentoForm.vue";
import { api } from "../services.js";
export default {
  name: "LaboratorioForm",
  data() {
    return {
      laboratorio: {
        nome: "",
        host: "",
        porta: "",
        tempo: "",
        descricao: "",
        equipamentos: []
      }
    };
  },
  components: {
    EquipamentoForm
  },
  methods: {
    incluirLab() {
      let listaEquipamentos = this.$refs.equipamentoRef.retornaEquipamentos();
      listaEquipamentos.forEach((elemento, index) => {
        let equipamento = Object({
          nome: elemento.nome,
          descricao: elemento.descricao,
          uri: elemento.uri
        });
        this.laboratorio.equipamentos.push(equipamento);
      });
      if (this.verificaCampos()) {
        this.setLaboratorio();
        alert("Solicitação enviada...");
        this.limpaVariaveis();
      }
      this.$router.go(-1);
    },
    verificaCampos() {
      return true;
    },
    limpaVariaveis() {
      (this.nome = ""),
        (this.host = ""),
        (this.porta = ""),
        (this.tempo = ""),
        (this.descricao = "");
    },
    setLaboratorio() {
      api
        .post(`/labs/`, {
          name: this.laboratorio.nome,
          description: this.laboratorio.descricao,
          host: this.laboratorio.host,
          port: this.laboratorio.porta,
          tempo_experimento: this.laboratorio.tempo,
          equipamentos: this.laboratorio.equipamentos
        })
        .then(response => {
          console.log("Resposta obtida: ", response.data);
        });
      this.laboratorio.equipamentos = [];
    }
  }
};
</script>

<style scoped>
form,
.laboratorio {
  display: grid;
  /* grid-template-columns: 1fr; */
  align-items: center;
}

.horario input {
  margin: 10px;
  /* width: 50px; */
}

textarea {
  max-width: 500px;
}

.equipamentos {
  border: 1px groove #17a2b8;
}

.titulo-equipamento {
  /* border: 1px groove #17a2b8; */
  padding: 0 1.4em 1.4em 1.4em;
  margin: 0 0 1.5em 0;
}

.add-equipamento {
  display: flex;
  justify-content: center;
}
</style>
