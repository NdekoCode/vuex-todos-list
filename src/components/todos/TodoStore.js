import { v4 as uuid } from "uuid";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// UN peu comme data(){ return {} }
const state = {
  todos: [
    {
      id: uuid(),
      name: "Apprendre Typescript",
      completed: true,
    },
    {
      id: uuid(),
      name: "Apprendre Docker",
      completed: true,
    },
  ],
};
/** Une action ça va etre une fonction qui va ensuite delencher une mutation, les actions font les verification prealable, une fois que ces verification sont conforme alors il peut faire appel aux mutations */
const actions = {
  addTodo: (store, name) => {
    if (name.length >= 2) {
      store.commit("ADD_TODO", name);
      name = "";
    } else {
      alert("Entrer une tache correcte");
    }
  },
  removeTodo: (store, todo) => {
    store.commit("DELETE_TODO", todo);
  },
  deleteCompleted: (store) => {
    store.commit("DELETE_COMPLETED");
  },
  toggleTodo: (store, todo) => {
    store.commit("TOGGLE_TODO", todo);
  },
  editTodo: (store, todo) => {
    if (todo.name.length >= 2) {
      store.commit("EDIT_TODO", todo);
    } else {
      alert("Entrer une tache correcte");
    }
  },
  completedAllTodo: (store, value) => {
    store.commit("COMPLETE_ALL_TODO", value);
  },
};

/** Lorsque l'on est dans un composant on ne faira jamais appel directement au state mais on utilisera les getters pour obtenir ces informations*/
const getters = {
  todos: (state) => state.todos,
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  noCompletedTodos: (state) => state.todos.filter((todo) => !todo.completed),
  done: (state) => getters.completedTodos(state).length,
  undone: (state) => getters.noCompletedTodos(state).length,
};
/** Son des fonctions qui vont permettre de muter ou de modifier notre Etat, faire des changement au niveau de notre state */
const mutations = {
  ADD_TODO: (state, nameOfTodo) => {
    state.todos.push({
      id: uuid(),
      name: nameOfTodo,
      completed: false,
    });
  },
  DELETE_TODO: (state, todo) => {
    state.todos = state.todos.filter((d) => d.name !== todo.name);
  },
  DELETE_COMPLETED: (state) => {
    state.todos = state.todos.filter((d) => !d.completed);
  },
  TOGGLE_TODO: (state, todo) => {
    state.todos = state.todos.map((d) => {
      if (d.id === todo.id) {
        d.completed = !d.completed;
      }
      return d;
    });
  },
  EDIT_TODO: (state, todo) => {
    state.todos = state.todos.map((d) => {
      if (d.id === todo.id) {
        d.name = todo.name;
      }
      return d;
    });
  },
  COMPLETE_ALL_TODO: (state, value) => {
    state.todos = state.todos.map((todo) => {
      todo.completed = Boolean(value);
      return todo;
    });
  },
};

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  //   Nous empeche de muter les choses et donc on faira des modifications uniquement sur les copies du state sans toucher au vrais state
  strict: true,
});
global.store = store;
export default store;
