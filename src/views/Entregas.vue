<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <Entregas />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Entregas from "@/components/Entregas.vue";
export default {
  name: "Home",
  components: {
    Menu,
    Entregas
  }
};
</script>
