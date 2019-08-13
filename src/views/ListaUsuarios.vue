<template>
  <section>
    <h1>Usuários do sistema</h1>
    <div id="usuarios">
      <b-table striped hover :items="listaUsuarios"></b-table>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ListaUsuarios",
  data() {
    return { listaUsuarios: [] };
  },
  created() {
    this.buscaUsuarios();
  },
  methods: {
    buscaUsuarios() {
      api.get(`/usuarios`, {}).then(response => {
        console.log("Resposta obtida: ", response.data);
        // let horarioInicio = this.converteDate(reserva.periodo_inicio);
        let usuarios_sistema = [];
        response.data.forEach(usuario => {
          let oUsuario = new Object({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nickname: usuario.nickname,
            papel_id: usuario.papel_id
          });
          usuarios_sistema.push(oUsuario);
        });

        this.listaUsuarios = [...usuarios_sistema];
      });
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

      console.log(`${ano}-${mes}-${dia} ${hora}:${minutos}`);
      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        return `0${valorFinal}`;
      }
      return valorFinal;
    }
  }
};
</script>

<style scoped>
#usuarios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
