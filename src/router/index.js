import Vue from 'vue'
import VueRouter from 'vue-router'
import {isSignedIn} from '../security/auth'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import ClienteCadastrar from '../views/ClienteCadastrar.vue'
import UsuarioInicio from '../views/UsuarioInicio.vue'
import ClienteInicio from '../views/ClienteInicio.vue'
import UsuarioCadastrar from '../views/UsuarioCadastrar.vue'
import ConsultarCliente from '../views/ConsultarCliente.vue'
import EditarCliente from '../views/EditarCliente.vue'
import UsuarioEditar from '../views/UsuarioEditar.vue'
import UsuarioConfiguracoes from '../views/UsuarioConfiguracoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/ClienteInicio',
    name: 'ClienteInicio',
    component: ClienteInicio,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/ClienteCadastrar',
    name: 'ClienteCadastrar',
    component: ClienteCadastrar,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/UsuarioInicio',
    name: 'UsuarioInicio',
    component: UsuarioInicio,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/UsuarioCadastrar',
    name: 'UsuarioCadastrar',
    component: UsuarioCadastrar,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/UsuarioEditar/:id',
    name: 'UsuarioEditar',
    component: UsuarioEditar,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/EditarCliente/:id',
    name: 'EditarCliente',
    component: EditarCliente,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/ConsultarCliente/:id',
    name: 'ConsultarCliente',
    component: ConsultarCliente,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/UsuarioConfiguracoes',
    name: 'UsuarioConfiguracoes',
    component: UsuarioConfiguracoes,
    beforeEnter(_,__, next){
      if(isSignedIn()){
        next()
        return 
      }
      next('/')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
