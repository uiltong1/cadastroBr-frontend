<template>
  <v-app>
    <v-container-fluid>
    <v-card>
    <v-container>
      <v-alert v-if="succes==true" type="success">{{this.info}}</v-alert>
      <v-alert v-if="succes == false" type="err">{{this.info}}</v-alert>
      <v-form ref="form">
        <v-card-title>Editar Cliente</v-card-title>
        <v-text-field color="#272727" v-model="cliente" :rules="clienterules" label="Cliente" outlined></v-text-field>
        <v-text-field color="#272727" v-model="cpf" v-mask="cpfmask" :rules="cpfrules" label="CPF" outlined disabled></v-text-field>
        <v-text-field color="#272727" v-model="rg" v-mask="rgmask" label="RG" outlined></v-text-field>
        <input type="date" class="calendar" v-model="nascimento" :rules="nascimentorules"/>
        <v-select
          :rules="localnascrules"
          :items="estados"
          v-model="localnasc"
          outlined
          label="Local de Nascimento"
        ></v-select>
        <v-btn dark @click="gravar">Gravar</v-btn>
        <v-btn color="error"  @click="voltarPagina">Cancelar</v-btn>
      </v-form>
      
      <!-- Modal para adicionar novos telefones -->
       <v-dialog v-model="dialog" max-width="250px">
          <v-card>
            <v-card-title>Telefone</v-card-title>
            <v-card-text>
              <v-row>
                <v-text-field color="#272727" v-model="telefone" v-mask="telefonemask" :rules="telefonerules" label="Telefone" outlined></v-text-field>
              </v-row>
              <v-row>
                <v-btn color="success" @click="addTelefone()">Adicionar</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- Listagem de telefones -->
      <template >
          <v-card class="pa-3">
            <v-row>
              <v-col sm="3">
                <v-btn color="success" @click="abrirModal()">Novo</v-btn>
              </v-col>
            </v-row>

<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Número
          </th>
           <th class="text-left">
            Ação
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in info"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.numero }}</td>
          <td> 
             <v-btn @click="deletar(item)">Deletar</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


                    </v-card>
      </template>
    </v-container>
    </v-card>
    </v-container-fluid>   
  </v-app>
</template>
<script>
import axios from "axios"
import { mask } from "vue-the-mask"
import constants from "../constants/constants";
import {  mdiCancel } from "@mdi/js";
export default {
  directives: {
    mask
  },
  name: "Cadastro",
  data() {
    return {
     pesquisa: "",
      headers: [
        { text: "Nº", value: "id" },
      ],
    info: [],
    icone: {mdiCancel},
    cpfmask: "###.###.###-##",
    rgmask: "##.###.###-##",
    telefonemask: "(##)####-####",
    cliente:'',
    cpf:'',
    estados: ['BA', 'SP'],    
    rg:'',
    nascimento:'',
    localnasc:'',
    dialog: '',
    telefone: '',
    succes: null,
    clienterules: [v => !!v || "O campo Cliente é obrigatório"],
    cpfrules: [v => !!v || "O campo Fucionário é obrigatório."],
    localnascrules: [v => !!v || "O campo Local de nascimento é obrigatório."],
    nascimentorules: [v => !!v || "O campo Data de nascimento é obrigatório."],
    telefonerules: [v => !!v || "Informe o telefone."],

}},
  watch: {
    dialog(val) {
      val || this.fecharModal();
    },
  },
  mounted(){
    this.consultarCliente(this.$route.params.id);
    this.listarTelefones(this.$route.params.id);
   
  },
  methods: {
    addTelefone: function(){
        axios({
        method: "post",
        url: `${constants.baseUrl}/telefone/add`,
        data: {
          cliente: this.$route.params.id,
          numero: this.telefone,
          usrinc: sessionStorage.id
        }
      })
        .then(response => {
          this.info = response.data.message;
          this.telefone = '';
          this.dialog = false;         
          location.reload(true)
          // this.listarTelefones();
        })
        .catch(error => {
          console.log(error)
        });
      },
    deletar:function(item){
         axios({
        method: "delete",
        url: `${constants.baseUrl}/telefone/remove/${item.id}`,
      })
        .then(response => {
          this.info = response
          location.reload(true)          
        })
        .catch(error => {
          this.info = error
        });
    },
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
  
  
  //Listar telefones
  listarTelefones:function(id){
    axios({
        method: "get",
        url: `${constants.baseUrl}/telefone/get/${id}`
      })
        .then(response => {
          this.info = response.data;
        })
        .catch(error => {
          this.info = error;
        })
        .finally(() => (this.loading = false));
  },

  gravar() {
      this.validaEstado(this.localnasc)
      
      // Valida os campos
      if(this.validaCampos() != false){
         axios({

        method: "patch",
        url: `${constants.baseUrl}/update/cliente/${this.$route.params.id}`,
        data: {
          nome: this.cliente,
          rg: this.rg,
          localnasc: this.localnasc,
          nascimento: this.nascimento,
          usratualizacao: sessionStorage.id
        }
      })
        .then(response => {
          this.info = response.data.message;
          this.succes = true;
          window.setTimeout(function() {
            this.succes = false;
          }, 3000);
        })
        .catch(error => {
          console.log(error)
        });
      }
    },

    // Valida o estado do cliente
    validaEstado: function(estado){
      switch(estado){
        case 'BA':
           console.log('Bahia')
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

    //Abrir modal telefone
   abrirModal(){
      this.dialog = true
    },
    //Fechar modal telefone
    fecharModal() {
      this.dialog = false;
      setTimeout(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        // this.editedIndex = -1;
      }, 300);
    },  
    //Valida se há campos em branco
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

    voltarPagina: function() {
      history.back();
    }
  }
};
</script>
<style>
.v-card>:last-child:not(.v-btn):not(.v-chip) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-top: 65px;
}

.calendar{
  padding: 10px;
    margin: 5px;
    margin-bottom: 20px;
    border: solid 1px silver;
    border-radius: 5px;
}


.theme--light.v-card {
    margin-top: 50px;
    background-color: #fff;
    color: rgba(0,0,0,.87);
}
</style>
