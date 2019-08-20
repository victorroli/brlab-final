<template>
  <section>
    <h1>Usuários do sistema</h1>
    <div id="usuarios">
      <b-table striped hover :items="listaUsuarios" :fields="fields"></b-table>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ListaUsuarios",
  data() {
    return {
      listaUsuarios: [],
      fields: {
        id: {
          label: "ID"
        },
        nome: {
          label: "Nome"
        },
        nickname: {
          label: "Nickname"
        },
        email: {
          label: "Email"
        },
        funcao: {
          label: "Papel"
        }
      }
    };
  },
  created() {
    this.buscaUsuarios();
  },
  methods: {
    buscaUsuarios() {
      api.get(`/usuarios`, {}).then(response => {
        let usuarios_sistema = response.data.filter(usuario => {
          return usuario.verificado;
        });

        usuarios_sistema.map(usuario => {
          let novoUsuario = new Object({
            id: usuario.id,
            nome: usuario.nome,
            nickname: usuario.nickname,
            email: usuario.email,
            funcao: this.descricaoPapel(usuario.papel_id)
          });
          this.listaUsuarios.push(novoUsuario);
        });
      });
    },
    descricaoPapel(tipo) {
      console.log("Tipo recebido: ", tipo);
      let papel = "";
      switch (tipo) {
        case 1: {
          papel = "Administrador";
          break;
        }
        case 2: {
          papel = "Aluno";
          break;
        }
        case 3: {
          papel = "Professor";
          break;
        }
        case 4: {
          papel = "Pesquisador";
          break;
        }
      }
      return papel;
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
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
#usuarios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
