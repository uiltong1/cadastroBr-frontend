<template>
  <v-app>
    <v-container-fluid>
    <v-card>
    <v-container>
      <v-form ref="form">
        <v-alert v-if="succes==true" type="success">{{this.info}}</v-alert>
        <v-card-title>Novo Cliente</v-card-title>
        <v-text-field color="#272727" v-model="cliente" :rules="clienterules" label="Cliente" outlined></v-text-field>
        <v-text-field color="#272727" v-model="cpf" v-mask="cpfmask" :rules="cpfrules" label="CPF" outlined></v-text-field>
        <v-text-field color="#272727" v-model="rg" v-mask="rgmask" label="RG" outlined></v-text-field>
        <input type="date" class="calendar" v-model="nascimento" :rules="nascimentorules"/>
        <v-select
          :rules="localnascrules"
          :items="estados"
          v-model="localnasc"
          outlined
          label="Local de Nascimento"
        ></v-select>
        <v-container>
        <v-row>
          Telefone(s):        
        </v-row>
        <v-row><v-btn color="#CFA656" @click="adicionar">+</v-btn></v-row>
         <v-container v-for="(input, index) in inputs" :key="index">
          <v-row>
              <v-text-field
                color="#272727"
                :name="input"
                v-model="input.index"
                :key="index"
                label="Telefone"
                :value="input.index"
                v-mask="telefonemask"
                outlined
              ></v-text-field>
            <v-col>
              <v-btn small  color="error"  @click="removerIndice(index)">-</v-btn>
              </v-col>
          </v-row>
        </v-container>
        </v-container>
        <v-spacer></v-spacer>
        <v-btn dark @click="gravar">Gravar</v-btn>
        <v-btn color="error" @click="voltarPagina">Cancelar</v-btn>
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
    succes: null,
    cpfmask: "###.###.###-##",
    rgmask: "##.###.###-##",
    telefonemask: "(##)####-####",
    inputs: [],
    cliente:'',
    cpf:'',
    estados: ['BA', 'SP'],    
    rg:'',
    nascimento:'',
    localnasc:'',
    telefones:[],
    info: '',
    clienterules: [v => !!v || "O campo Cliente é obrigatório"],
    cpfrules: [v => !!v || "O campo Fucionário é obrigatório."],
    localnascrules: [v => !!v || "O campo Local de nascimento é obrigatório."],
    nascimentorules: [v => !!v || "O campo Data de nascimento é obrigatório."],
    telefonerules: [v => !!v || "Informe o telefone."]
  }),
  methods: {
    gravar() {
      this.validaTelefones()
      this.validaEstado(this.localnasc)

      for (let i of this.inputs) {
        this.telefones.push(i.index);
      }

      // Valida os campos
      if(this.validaCampos() != false){
         axios({
        method: "post",
        url: `${constants.baseUrl}/register/cliente`,
        data: {
          nome: this.cliente,
          cpf: this.cpf,
          rg: this.rg,
          localnasc: this.localnasc,
          nascimento: this.nascimento,
          usrinc: sessionStorage.id,
          telefone: this.telefones
        }
      })
        .then(response => {
          this.info = response.data.message;
          console.log(response)
          this.succes = true;

          window.setTimeout(function() {
            history.back();
          }, 3000);
        })
        .catch(error => {
          console.log(error)
        });
      }
    },
    voltarPagina: function() {
      history.back();
    },
    validaEstado: function(estado){
      console.log(estado)
      switch(estado){
        case 'BA':
          var data 
          data  = this.nascimento.replace('-', ',');
          data = data.replace('-',',');
          var result
          result = this.idade(new Date(data))
          if(result < 18){
            alert("O cliente deve ter mais que 18 anos.")
            return false;
          }
          break;
        case 'SP':
          if(this.rg === '' || this.rg === null){
            alert('Campo RG obrigatório.')
            this.succes = true;
            return false;
          }
          break;
      }
    },

   idade:function(d1, d2){
        d2 = d2 || new Date();
        var diff = d2.getTime() - d1.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    },

    adicionar: function() {
        this.inputs.push({ index: "" });
    },
    remover: function() {
      this.inputs.pop({ index: "" });
    },
    removerIndice: function(indice) {
      this.inputs.splice(indice, 1);
    },
    
    validaCampos:function(){
      if(this.cliente === '' || this.cliente === null ){
       alert('Campo Nome obrigatório.')
        return false;
      }
      if(this.cpf === '' || this.cpf === null){
       alert('Campo CPF obrigatório.')
        return false;
      }
      if(this.nascimento === '' || this.nascimento === null){
       alert('Campo Data de nascimento obrigatório.')
        return false;
      }
    },
    // Valida se há telefones repetidos
     validaTelefones: function() {
      this.i = 0;
      this.k = 0;
      if (this.inputs.length > 1) {
        this.ultimo = this.inputs[this.inputs.length - 1];
        const aux = this.inputs;
        while (this.k < aux.length) {
          if (this.ultimo.index == aux[this.k].index) {
            this.i++;
          }
          if (this.i > 1) {
            alert(
              "Nº " + this.ultimo.index + " já se encontra na lista."
            );
            return false;
          }
          this.k++;
        }
      }
    },



  }
};
</script>
<style>
.v-card>:last-child:not(.v-btn):not(.v-chip) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-top: 0px;
}

.calendar{
  padding: 10px;
    margin: 5px;
    margin-bottom: 20px;
    border: solid 1px silver;
    border-radius: 5px;
}

</style>
