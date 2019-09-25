export const state = () => ({
  loading: false,
  error: null,
  onlineUsers: []
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setOnlineUsers(state, payload) {
    state.onlineUsers = payload
  }
}

export const acttions = {
  clearError({ commit }) {
    commit('clearError')
  }
}

export const getters = {
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
  onlineUsers(state) {
    return state.onlineUsers
  }
}
