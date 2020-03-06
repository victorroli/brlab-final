<template>
  <section>
    <h1>Experimentos</h1>
    <div id="experimentos" v-if="experimentos.length > 0">
      <b-table striped hover :items="experimentos" :fields="fields"></b-table>
    </div>
    <div class="sem-registro" v-if="experimentos.length == 0">
      <h5>Nenhum registro encontrado!</h5>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "experimentos",
  data() {
    return {
      experimentos: [],
      fields: [
        { key: "laboratorio", label: "Laboratório" },
        { key: "titulo", label: "Título" },
        { key: "horario_inicio", label: "Horário Início" },
        { key: "horario_termino", label: "Horário Término" },
        { key: "observacao", label: "Observação" }
      ]
    };
  },
  created() {
    this.listaExperimentos();
  },
  methods: {
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        if (valorFinal < 10) valorFinal = `0${valorFinal}`;
      }
      return valorFinal;
    },
    converteDate(data) {
      /*
        A data obtida do banco não vem com o valor GMT, então
        deve-se acrescentar na string esse valor.
        Como neste ano de 2019 não haverá horário de verão
        então permaneceu padrão o valor "'-0300' que corresponde ao horário de Brasília"         
      */
      data += "-0300";

      let dataConvertida = new Date(data);
      let dia = "",
        mes = "",
        ano = "",
        hora = "",
        minutos = "";
      ano = dataConvertida.getFullYear();
      mes = this.checValores(dataConvertida.getMonth(), true);
      dia = this.checValores(dataConvertida.getDate());
      hora = this.checValores(dataConvertida.getHours());
      minutos = this.checValores(dataConvertida.getMinutes());

      return `${hora}:${minutos} ${dia}/${mes}/${ano}`;
    },
    listaExperimentos() {
      api
        .get(`/experimentos/usuario/${this.$store.state.usuario.id}`, {})
        .then(response => {
          let experimentosRealizados = [];
          response.data.forEach(resposta => {
            let oExperimento = new Object({
              horario_inicio: this.converteDate(resposta.periodo_inicio),
              horario_termino: resposta.periodo_fim ? this.converteDate(resposta.periodo_fim) : this.converteDate(resposta.periodo_inicio),
              titulo: "Horário reservado",
              laboratorio: resposta.laboratorio_id,
              observacao: resposta.observacao ? resposta.observacao : "-"
            });
            // Trecho a ser verificado posteriormente para checar o status da reserva no momento
            // let horaInicio = new Date(horarioInicio);
            // let horarioAtual = new Date();
            // console.log("Horário início: ", horarioInicio);
            // console.log("Horário atual: ", horarioAtual);
            experimentosRealizados.push(oExperimento);
          });

          this.experimentos = [...experimentosRealizados];
        });
    }
  }
};
</script>

<style scoped>
.sem-registro {
  text-align: center;
}
table {
  text-align: center;
}
#experimentos {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
