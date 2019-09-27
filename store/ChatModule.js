export const state = () => ({
  chats: []
})

export const mutations = {
  setMessagesEmpty(state) {
    state.messages = []
  },
  setChats(state, payload) {
    state.chats = payload
  }
}

export const actions = {
  sendMessage({ commit }, payload) {
    if (payload.user === null) {
      payload.user = {
        id: 'defaultid',
        name: 'default'
      }
    }
    const message = {
      user: payload.user,
      content: payload.content,
      date: payload.date
    }
    this.$firestore
      .collection('messages')
      .doc()
      .set(message)
      .then((data) => {})
      .catch((error) => {
        console.log(error)
      })
  }
}

export const getters = {
  messages(state) {
    return state.messages
  }
}
