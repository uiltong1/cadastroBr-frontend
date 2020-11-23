<template>
  <v-app>
    <v-container-fluid>
    <v-card>
    <v-container>
      <v-alert v-if="succes==true" type="success">{{this.info}}</v-alert>
      <v-alert v-if="succes == false" type="err">{{this.info}}</v-alert>
      <v-form ref="form">
        <v-card-title>Dados do Cliente</v-card-title>
        <v-text-field color="#272727" v-model="cliente" :rules="clienterules" label="Cliente" outlined disabled></v-text-field>
        <v-text-field color="#272727" v-model="cpf" v-mask="cpfmask" :rules="cpfrules" label="CPF" outlined disabled></v-text-field>
        <v-text-field color="#272727" v-model="rg" v-mask="rgmask" label="RG" outlined disabled></v-text-field>
        <input type="date" class="calendar" v-model="nascimento" :rules="nascimentorules" disabled/>
        <v-select
          :rules="localnascrules"
          :items="estados"
          v-model="localnasc"
          outlined
          label="Local de Nascimento"
          disabled
        ></v-select>
        <v-btn color="error"  @click="voltarPagina">Voltar</v-btn>
      </v-form>
    </v-container>
    </v-card>
    </v-container-fluid>
  </v-app>
</template>
<script>
import axios from "axios"
import { mask } from "vue-the-mask"
import constants from "../constants/constants";
export default {
  directives: {
    mask
  },
  name: "Cadastro",
  data: () => ({
    cpfmask: "###.###.###-##",
    rgmask: "##.###.###-##",
    telefonemask: "(##)####-####",
    cliente:'',
    cpf:'',
    estados: ['BA', 'SP'],    
    rg:'',
    nascimento:'',
    localnasc:'',
    succes: null,
    clienterules: [v => !!v || "O campo Cliente é obrigatório"],
    cpfrules: [v => !!v || "O campo Fucionário é obrigatório."],
    localnascrules: [v => !!v || "O campo Local de nascimento é obrigatório."],
    nascimentorules: [v => !!v || "O campo Data de nascimento é obrigatório."],
    telefonerules: [v => !!v || "Informe o telefone."],
    info: [],

  }),
  mounted(){
    this.consultarCliente(this.$route.params.id)
   
  },
  methods: {
    consultarCliente: function(id){
       axios({
        method: "get",
        url: `${constants.baseUrl}/cliente/get/${id}`
      })
        .then(response => {
          this.info = response.data;
          this.cliente = this.info.nome;
          this.cpf = this.info.cpf;
          this.rg = this.info.rg;
          this.nascimento = this.info.nascimento;
          this.localnasc = this.info.localnasc;
        })
        .catch(error => {
          this.info = error;
        })
        .finally(() => (this.loading = false));
    },
    voltarPagina: function() {
      history.back();
    }
  }
};
</script>
<style>
.calendar{
  padding: 10px;
    margin: 5px;
    margin-bottom: 20px;
    border: solid 1px silver;
    border-radius: 5px;
}

</style>
