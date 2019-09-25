<template>
  <div style="position: relative;">
    <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer">
      <Message :messages="messages" @imageLoad="scrollToEnd"></Message>
    </div>
    <div class="typer">
      <input
        type="text"
        placeholder="Type here..."
        v-on:keyup.enter="sendMessage"
        v-model="content"
      />
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  data() {
    return {
      content: '',
      chatMessages: [],
      currentRef: {},
      loading: false,
      totalChatHeight: 0
    }
  },
  mounted() {
    this.loadChat()
  },
  computed: {
    messages() {
      return this.chatMessages
    },
    username() {
      return this.$store.state.AuthModule.user
    }
  },
  methods: {
    loadChat() {
      const that = this
      this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      this.loading = false
      this.chatMessages = []
      this.currentRef = this.$firestore
        .collection('messages')
        .orderBy('date', 'asc')
      this.currentRef.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          const post = change.doc.data()
          that.chatMessages.push(post)
          that.scrollToEnd()
        })
      })
    },
    onScroll() {
      let scrollValue = this.$refs.chatContainer.scrollTop
      const that = this
      if (scrollValue < 100 && !this.loading) {
        this.totalChatHeight = this.$refs.chatContainer.scrollHeight
        this.loading = true
        let currentTopMessage = this.chatMessages[0]
        if (currentTopMessage === undefined) {
          this.loading = false
          return
        }
        this.$firestore
          .collection('messages')
          .get()
          .then(function(snapshot) {
            let tempArray = []
            snapshot.forEach(function(item) {
              tempArray.push(item)
            })
            if (tempArray[0].key === tempArray[1].key) return
            tempArray.reverse()
            tempArray.forEach(function(child) {
              that.chatMessages.unshift(message)
              that.scrollTo()
            })
            that.loading = false
          })
      }
    },
    sendMessage() {
      if (this.content !== '') {
        this.$store.dispatch('ChatModule/sendMessage', {
          username: this.username,
          content: this.content,
          date: Date.now()
        })
        this.content = ''
      }
    },
    scrollToEnd() {
      this.$nextTick(() => {
        let container = this.$el.querySelector('.chat-container')
        container.scrollTop = container.scrollHeight
      })
    },
    scrollTo() {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight
        let difference = currentHeight - this.totalChatHeight
        let container = this.$el.querySelector('.chat-container')
        container.scrollTop = difference
      })
    }
  }
}
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 90vh;
}
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #424142;
  box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
}
.typer input[type='text'] {
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #303030;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content {
    max-width: 60%;
  }
}
</style>
