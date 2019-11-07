<template>
  <div style="position: relative;">
    <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer">
      <Message :messages="messages"></Message>
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
    user() {
      return this.$store.state.AuthModule.user
    }
  },
  methods: {
    loadChat() {
      this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      this.loading = false
      this.chatMessages = []
      this.currentRef = this.$firestore
        .collection('messages')
        .orderBy('date', 'asc')
      console.log(this)
      this.currentRef.onSnapshot((snapshot) => {
        console.log(this)
        snapshot.docChanges().forEach((change) => {
          console.log(this)
          const post = change.doc.data()
          this.chatMessages.push(post)
          this.scrollToEnd()
        })
      })
    },
    onScroll() {
      let scrollValue = this.$refs.chatContainer.scrollTop
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
          .then((snapshot) => {
            let tempArray = []
            snapshot.forEach((item) => {
              tempArray.push(item)
            })
            if (tempArray[0].key === tempArray[1].key) return
            tempArray.reverse()
            tempArray.forEach((child) => {
              this.chatMessages.unshift(message)
              this.scrollTo()
            })
            this.loading = false
          })
      }
    },
    sendMessage() {
      if (this.content !== '') {
        this.$store.dispatch('ChatModule/sendMessage', {
          user: this.user,
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
  background-color: #eaf0fb;
  color: #000000;
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
  background-color: #ffffff;
  color: #ffffff;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: #69b6cf;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: #69b6cf;
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