export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async signUserIn({ commit }, payload) {
    commit('setLoading', true, { root: true })
    await this.$auth.signInAnonymously()
    this.$auth.onAuthStateChanged(function(user) {
      if (user) {
        const newUser = {
          id: user.uid,
          username: payload.name
        }
        commit('setUser', newUser)
        commit('setLoading', false, { root: true })
      }
    })
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
