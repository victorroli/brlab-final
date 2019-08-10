<template>
  <section>
    <h1>Experimentos</h1>
    <div id="experimentos" v-if="experimentos.length > 0">
      <b-table striped hover :items="experimentos"></b-table>
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
      experimentos: []
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
        return `0${valorFinal}`;
      }
      return valorFinal;
    },
    converteDate(data) {
      /*
        A data obtida do banco não vem com o valor GMT, então
        deve-se acrescentar na string esse valor.
        Como neste ano de 2019 não haverá horário de verão
        então permaneceu padrão o valor "-0300 que corresponde ao horário de Brasília"         
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

      // console.log(`${ano}-${mes}-${dia} ${hora}:${minutos}`);
      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },
    listaExperimentos() {
      console.log("Lista de experimentos...");
      api
        .get(`/experimentos/usuario/${this.$store.state.usuario.id}`, {})
        .then(response => {
          console.log("Resposta obtida: ", response.data);
          // let horarioInicio = this.converteDate(reserva.periodo_inicio);
          let experimentosRealizados = [];
          response.data.forEach(resposta => {
            let oExperimento = new Object({
              horario_inicio: this.converteDate(resposta.periodo_inicio),
              horario_termino: this.converteDate(resposta.periodo_fim),
              titulo: "Horário reservado",
              laboratorio: resposta.laboratorio_id,
              observacao: resposta.observacao ? resposta.observacao : "-"
            });
            // Trecho a ser verificado posteriormente para checar o status da reserva no momento
            // let horaInicio = new Date(horarioInicio);
            // let horarioAtual = new Date();
            // console.log("Horário início: ", horarioInicio);
            // console.log("Horário atual: ", horarioAtual);
            console.log("Experimento: ", oExperimento);
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
</style>
