<template>
  <section class="todoapp">
    <header>
      <form class="header" @submit.prevent="addNewTodo">
        <h1 class="">Todos</h1>
        <input
          v-model="newTodo"
          type="text"
          class="new-todo"
          placeholder="Ajouter une tache"
        />
      </form>
    </header>
    <div class="main">
      <input
        type="checkbox"
        class="toggle-all pointer"
        id="alLDone"
        v-model="allDone"
      />
      <label for="alLDone"></label>
      <transition-group name="bounce" tag="ul" class="todo-list" appear>
        <!-- class="{completed: todo.completed }": Rajoute la classe 'completed' si notre tache est completer -->
        <li
          class="todo"
          :class="{ completed: todo.completed, editing: editing === todo }"
          v-for="(todo, index) in filteredTodos"
          :key="index"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              name="complete"
              :id="index"
              @input.stop="toggleTodo(todo)"
            />
            <label :for="index" @dblclick="editTodo(todo)">{{
              todo.name
            }}</label>
            <button
              class="destroy pointer"
              @click.prevent="removeTodo(todo)"
            ></button>
          </div>
          <input
            type="text"
            class="edit"
            v-model="todo.name"
            @keyup.esc="cancelEdit"
            @keyup.enter="doneEdit"
            @blur="cancelEdit"
            v-focus="editing === todo"
          />
        </li>
      </transition-group>
    </div>
    <transition name="bounce">
      <footer class="footer" v-if="hasTodos">
        <div class="mb-3 count-container">
          <span class="todo-count mx-1"
            ><strong>{{ undone }} tache à faire</strong></span
          >
          <span class="todo-count mx-1"
            ><strong>{{ done }} Tache faites</strong></span
          >
        </div>
        <ul class="filters">
          <li>
            <a
              href="#"
              :class="{ selected: filter === 'all' }"
              @click="filter = 'all'"
              >Toutes</a
            >
          </li>
          <li>
            <a :class="{ selected: filter === 'todo' }" @click="filter = 'todo'"
              >A faire</a
            >
          </li>
          <li>
            <a
              href="#"
              :class="{ selected: filter === 'done' }"
              @click="filter = 'done'"
              >Faites</a
            >
          </li>
        </ul>
        <button v-if="done" class="clear-completed" @click="deleteCompleted">
          Supprimer les taches terminer
        </button>
      </footer>
    </transition>
  </section>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import store from "./TodoStore";
global.v = Vuex;
export default {
  name: "Todos",
  store,
  data() {
    return {
      oldTodo: null,
      editing: null,
      newTodo: "",
      filter: "all", // Done, todo,all
    };
  },
  directives: {
    focus(el, value) {
      if (value) {
        Vue.nextTick(() => el.focus());
      }
    },
  },
  watcher: {
    value(value) {
      this.todos = value;
    },
  },
  methods: {
    ...Vuex.mapActions([
      "addTodo",
      "removeTodo",
      "deleteCompleted",
      "toggleTodo",
    ]) /* On aurai pus aussi l'appeler sous forme d'object ...Vuex.mapActions({addNewTodo:"addTodo"}) puis dans notre composant créer une autre fonction qui sera "addTodo" et qui va maintenant appeler "addNewTodo" et vider this.newTodo*/,
    addNewTodo() {
      this.addTodo(this.newTodo);
      this.newTodo = "";
    },
    editTodo(todo) {
      this.editing = todo;
      this.oldTodo = todo.name;
    },
    cancelEdit() {
      if (this.editing !== null) {
        this.editing.name = this.oldTodo;

        this.doneEdit();
      }
    },
    doneEdit() {
      this.editing = null;
    },
  },
  computed: {
    ...Vuex.mapGetters([
      "todos",
      "undone",
      "done",
      "completedTodos",
      "noCompletedTodos",
    ]),
    hasTodos() {
      return this.todos.length > 0;
    },
    allDone: {
      set(value) {
        this.todos = this.todos.map((todo) => {
          todo.completed = Boolean(value);
          return todo;
        });
      },
      get() {
        return this.undone === 0;
      },
    },
    filteredTodos() {
      if (this.filter === "done") {
        // Sans lui passer de paramètre vuex va se charger de cela
        return this.completedTodos;
      } else if (this.filter === "todo") {
        // Sans lui passer de paramètre vuex va se charger de cela
        return this.noCompletedTodos;
      }
      return this.todos;
    },
  },
};
</script>
<style src="./todos.css"></style>
