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
          v-for="todo in filteredTodos"
          :key="todo.id"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              name="complete"
              :checked="todo.completed"
              :id="todo.id"
              @input.stop="toggleTodo(todo)"
            />
            <label :for="todo.id" @dblclick="changeTodo(todo)">{{
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
            @click="editingTodo(todo)"
            :value="todo.name"
            @keyup.esc="cancelEdit"
            @input.stop="handleTodo"
            @keyup.enter="doneEdit(todo)"
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
      editTodoItem: "",
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
      "editTodo",
      "completedAllTodo",
    ]) /* On aurai pus aussi l'appeler sous forme d'object ...Vuex.mapActions({addNewTodo:"addTodo"}) puis dans notre composant créer une autre fonction qui sera "addTodo" et qui va maintenant appeler "addNewTodo" et vider this.newTodo*/,
    addNewTodo() {
      this.addTodo(this.newTodo);
      this.newTodo = "";
    },
    changeTodo(todo) {
      this.editing = todo;
      this.oldTodo = todo.name;
    },
    cancelEdit() {
      if (this.editing !== null) {
        this.editing.name = this.oldTodo;
        this.doneEdit();
      }
    },
    doneEdit(todo = null) {
      this.editing = null;
      if (todo) {
        console.log(this.editTodoItem);
        const newTodo = { ...todo, name: this.editTodoItem };
        this.editTodo(newTodo);
      }
    },

    handleTodo(e) {
      const value = e.target.value;
      this.editTodoItem = value;
    },
    editingTodo(todo) {
      this.editTodoItem = todo.name;
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
        this.completedAllTodo(value);
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
