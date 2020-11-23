<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <Inicio />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Inicio from "@/components/Inicio.vue";
export default {
  name: "Home",
  components: {
    Menu,
    Inicio
  }
};
</script>
