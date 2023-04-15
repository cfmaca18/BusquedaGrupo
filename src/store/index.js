import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      isAuthenticated: false,
    },
  },
  
  getters: {
  },
  mutations: {
        //se utiliza para inicializar el estado del objeto userdel almacenamiento Vuex. 
  //Verifica si hay un token almacenado en el almacenamiento local del navegador
  //(localStorage) y establece el estado de user.token y user.isAuthenticated en consecuencia.
    initializeStore(state) {
      //En este caso, la expresión localStorage.getItem('token') se utiliza para verificar si hay un token almacenado 
      //en el almacenamiento local del navegador. Si el método getItem() encuentra un valor con la clave "token" 
      //en el almacenamiento local, entonces la condición if se evaluará como verdadera y se ejecutará el bloque de 
      //código dentro de ella.
      if (localStorage.getItem('token')) {
        state.user.token = localStorage.getItem('token'),
        state.user.isAuthenticated = true
      } else {
        state.user.token = '',
        state.user.isAuthenticated = false
      }
    },
    setToken(state, token) {
      //se utiliza para establecer el token de usuario en el almacenamiento de Vuex 
      //y establecer isAuthenticated como verdadero.
      state.user.token = token,
      state.user.isAuthenticated = true
    },
    removeToken(state) {
      //se utiliza para eliminar el token de usuario del almacenamiento de Vuex
      // y establecer isAuthenticated como falso.
      state.user.token = '',
      state.user.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
