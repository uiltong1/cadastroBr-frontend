<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <UsuarioInicio />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import UsuarioInicio from "@/components/UsuarioInicio.vue";
export default {
  name: "Home",
  components: {
    Menu,
    UsuarioInicio
  }
};
</script>
