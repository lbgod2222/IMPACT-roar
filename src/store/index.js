import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const model = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    ...model
  })

  return Store
}
