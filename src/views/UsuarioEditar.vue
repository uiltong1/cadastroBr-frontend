<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <UsuarioEditar />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import UsuarioEditar from "@/components/UsuarioEditar.vue";
export default {
  name: "Home",
  components: {
    Menu,
    UsuarioEditar
  }
};
</script>
