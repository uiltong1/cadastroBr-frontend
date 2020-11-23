<template>
  <v-app>
    <v-container-fluid>
    <v-card>
    <v-container>
      <v-alert v-if="succes==true" type="success">{{this.info}}</v-alert>
      <v-alert v-if="succes == false" type="err">{{this.info}}</v-alert>
      <v-form ref="form">
        <v-card-title>Novo Usuário</v-card-title>
        <v-text-field color="#272727" v-model="nome" :rules="nomerules" label="Nome" outlined></v-text-field>
        <v-text-field color="#272727" v-model="email"     type="email"  :rules="emailrules" label="Email" outlined></v-text-field>
        <v-text-field color="#272727" v-model="password"  type="password" name="input-10-1" :rules="passwordrules" label="Senha" outlined></v-text-field>
        <v-select
          :rules="perfilrules"
          :items="perfis"
          v-model="perfil"
          outlined
          label="Perfil"
        ></v-select>        <v-btn dark @click="gravar">Gravar</v-btn>
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
    nome:'',
    email:'',
    password:'',
    perfil:'',
    info: [],
    perfis: ['Administrador', 'Atendente'],
    succes: null,
    nomerules: [v => !!v || "O campo Nome é obrigatório"],
    emailrules: [v => !!v || "O campo Email é obrigatório."],
    passwordrules: [v => !!v || "O campo Senha é obrigatório."],
    perfilrules: [v => !!v || "O campo Perfil é obrigatório."]

  }),
    mounted(){
        if(sessionStorage.perfil  !== '1'){
       alert('Você não tem permissão de acesso.')
          history.back();
    } 
    },
  methods: {
    gravar() {
      if(this.nome === '' || this.nome == null || this.email === '' || this.email === null || this.password === '' || 
         this.password === null || this.perfil === '' || this.data === ''){
        this.info = 'Preencha os campos obrigatórios';
        this.succes = false;
        return false;
      }
      switch(this.perfil){
        case 'Administrador':
          this.perfil = 1;
         break;
        case 'Atendente':
          this.perfil = 2;
         break;
      }
      axios({
        method: "post",
        url: `${constants.baseUrl}/register`,
        data: {
          name: this.nome,
          email: this.email,
          password: this.password,
          perfil: this.perfil,
        }
      })
        .then(response => {
          this.info = response.data.message;
            this.succes = true;
          window.setTimeout(function() {
            history.back();
          }, 3000);
        })
        .catch(error => {
          this.info = error;
          console.log(this.info)
          this.succes = false;
          console.log(this.info);
        });
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

</style>
