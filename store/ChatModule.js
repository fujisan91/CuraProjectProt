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
    const chatID = payload.chatID
    const message = {
      user: payload.username,
      content: payload.content,
      date: payload.date
    }
    this.$firestore
      .collection('messages')
      .doc(chatID)
      .collection('messages')
      .doc()
      .set(message)
      .then((data) => {})
      .catch((error) => {
        console.log(error)
      })
  },
  loadChats({ commit }) {
    const chatsGroup = []
    this.$firestore
      .collection('chats')
      .get()
      .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          chatsGroup.push({
            id: doc.id,
            name: doc.data().name
          })
        })
        commit('setChats', chatsGroup)
      })
  },
  createChat({ commit }, payload) {
    const docRef = this.$firestore.collection('chats').doc()
    docRef.set({ name: payload.chatName })
    return new Promise((resolve, reject) => {
      resolve(docRef.id)
    })
  }
}

export const getters = {
  messages(state) {
    return state.messages
  },
  chats(state) {
    return state.chats
  }
}
