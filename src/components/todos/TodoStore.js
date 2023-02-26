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
};

const store = new Vuex.Store({
  // UN peu comme Data
  state,
  //   Son des fonctions qui vont permettre de muter ou de modifier notre Etat, faire des changement au niveau de notre state
  mutations,
  //   Créer des methodes qui vont permettre de recuperer une information au niveau de notre state
  getters,
  actions: {},
});
global.store = store;
export default store;
