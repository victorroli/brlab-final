<template>
  <form>
    <slot name="titulo"></slot>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <b-form-input id="nome" type="text" name="nome" v-model="laboratorio.nome" />

      <label for="host">Host:</label>
      <b-form-input id="host" type="text" name="host" v-model="laboratorio.host" />

      <label for="porta">Porta:</label>
      <b-form-input id="porta" type="text" name="porta" v-model="laboratorio.porta" />

      <label for="tempo">Tempo de Experimento:</label>
      <b-form-input id="tempo" type="number" name="tempo" v-model="laboratorio.tempo" />

      <label for="descricao">Descrição:</label>
      <textarea name="descricao" id="descricao" cols="30" rows="5" v-model="laboratorio.descricao"></textarea>

      <label for="equipamento">Equipamentos:</label>
      <div class="add-equipamento">
        <EquipamentoForm ref="equipamentoRef"></EquipamentoForm>
      </div>
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
          uri: elemento.uri,
          id: elemento.id
        });
        this.laboratorio.equipamentos.push(equipamento);
      });
      if (this.verificaCampos()) {
        this.setLaboratorio();
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
          // console.log("Resposta obtida: ", response.data);
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
  align-items: center;
}

.horario input {
  margin: 10px;
}

textarea {
  max-width: 500px;
}

.titulo-equipamento {
  padding: 0 1.4em 1.4em 1.4em;
  margin: 0 0 1.5em 0;
}

.add-equipamento {
  display: flex;
  justify-content: center;
  background: white;
  padding: 10px;
  border: 1px solid rebeccapurple;
  border-radius: 4px;
}
label {
  margin-top: 5px;
}
</style>
