<template>
  <div id="app">
    <Todos />
    <Todos />
    <Todos />
  </div>
</template>

<script>
import Todos from "./components/todos/Todos.vue";

import store from "./components/todos/TodoStore";
export default {
  name: "App",
  store,
  methods: {},
  components: {
    Todos,
  },
};
</script>

<style src="./assets/css/index.css"></style>
