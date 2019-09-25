export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  signUserUp({ commit }, payload) {
    commit('setLoading', true, { root: true })
    commit('clearError', null, { root: true })
    this.$auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        this.$firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            name: payload.username
          })
          .then((message) => {
            commit('setLoading', false, { root: true })
            const newUser = {
              id: result.user.uid,
              username: payload.username
            }
            commit('setUser', newUser)
          })
          .catch((error) => {
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
          })
      })
      .catch((error) => {
        commit('setLoading', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  signUserIn({ commit }, payload) {
    commit('setLoading', true, { root: true })
    commit('clearError', null, { root: true })
    this.$auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        this.$firestore
          .collection('users')
          .doc(result.user.uid)
          .get()
          .then(function(doc) {
            commit('setLoading', false, { root: true })
            const newUser = {
              id: result.user.uid,
              username: doc.data().name
            }
            commit('setUser', newUser)
          })
      })
      .catch((error) => {
        commit('setLoading', false, { root: true })
        commit('setError', error, { root: true })
      })
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
