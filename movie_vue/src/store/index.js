import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import CommunityModule from './CommunityModule'

const modules = {
  CommunityModule,
}

const plugins = [
  createPersistedState({
    paths: [
      'CommunityModule',
    ]
  })
]

Vue.use(Vuex)

export default new Vuex.Store({ 
  modules,
  plugins
})