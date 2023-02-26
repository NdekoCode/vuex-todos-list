import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// Lorsque l'on est dans un composant on ne faira jamais appel directement au state mais on utilisera les getters pour obtenir ces informations
const state = {
  todos: [
    {
      name: "Apprendre Typescript",
      completed: true,
    },
    {
      name: "Apprendre Docker",
      completed: true,
    },
  ],
};
const mutations = {
  ADD_TODO: (state, nameOfTodo) => {
    state.todos.push({ name: nameOfTodo, completed: false });
  },
};

const getters = {
  todos: (state) => state.todos,
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  noCompletedTodos: (state) => state.todos.filter((todo) => !todo.completed),
  done: (state) => getters.completedTodos(state).length,
  undone: (state) => getters.noCompletedTodos(state).length,
};

const store = new Vuex.Store({
  // UN peu comme Data
  state,
  //   Son des fonctions qui vont permettre de muter ou de modifier notre Etat, faire des changement au niveau de notre state
  mutations,
  //   Créer des methodes qui vont permettre de recuperer une information au niveau de notre state
  getters,
  actions: {},
  //   Nous empeche de muter les choses et donc on faira des modifications uniquement sur les copies du state sans toucher au vrais state
  strict: true,
});
global.store = store;
export default store;
