<script>
import Clip from "./components/Clip.vue";
export default {
  name: "App",
  components: {
    Clip,
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper"></div>
    </header>

    <main><Clip/>></main>
  </div>
</template>

<style scoped></style>
