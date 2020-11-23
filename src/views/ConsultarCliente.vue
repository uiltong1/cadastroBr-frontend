<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <ConsultarCliente />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import ConsultarCliente from "@/components/ConsultarCliente.vue";
export default {
  name: "Home",
  components: {
    Menu,
    ConsultarCliente
  }
};
</script>
