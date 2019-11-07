// ここからテンプレート
<template>
  <div style="position: relative;">
    <!-- v-on:scrollはブラウザのスクロールを検知してonScrollを実行する。 -->
    <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer">
      <!-- Messageコンポーネントにmessagesを渡そう！ -->
      <Message></Message>
    </div>
    <!-- 入力欄を作ってね -->
    <div class="typer">
      <!-- v-on:keyup.enterによってエンターが押されたときにsendMessageを実行する -->
      <!-- 入力欄に入力された値をdataにバインディングする処理を追加 -->
      <input type="text" placeholder="Type here..." v-on:keyup.enter="sendMessage" />
    </div>
  </div>
</template>
// ここまでテンプレート

// ここからロジック
<script>
// コンポーネントをインポート
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  data() {
    return {
      content: '', // 入力された値
      chatMessages: [], // ルームに投稿されたメッセージ群
      currentRef: {}, // firestoreの参照
      loading: false,
      totalChatHeight: 0
    }
  },
  // マウントされたときにチャット群をロード
  mounted() {
    this.loadChat()
  },
  computed: {
    //ここで生成されるmessagesをMessageコンポーネントに渡している。
    messages() {
      return this.chatMessages
    },
    // チャットルームに入ったuserを取得して、だれが発言したのかをメッセージと紐づける
    user() {
      return this.$store.state.AuthModule.user
    }
  },
  methods: {
    // チャット群を読み込む
    loadChat() {
      this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      this.loading = false

      // chatMessages初期化
      this.chatMessages = []

      // firestoreのコレクションへの参照を取得
      this.currentRef = this.$firestore
        .collection('messages')
        .orderBy('date', 'asc')

      // firestoreのコレクションを監視して、新しいメッセージが登録されたら
      // chatMessagesに追加する。
      this.currentRef.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const post = change.doc.data()

          // ⓵！！ここにchatMessagesにpostを追加する処理を書く！！

          // 最後までスクロールする処理
          this.scrollToEnd()
        })
      })
    },

    // スクロールを検知してメッセージ取得(今回はいじらない)
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
            snapshot.forEach((item) =>{
              tempArray.push(item)
            })
            if (tempArray[0].key === tempArray[1].key) return
            tempArray.reverse()
            tempArray.forEach((child) =>{
              this.chatMessages.unshift(message)
              this.scrollTo()
            })
            this.loading = false
          })
      }
    },

    // ⓹メッセージを送る処理
    sendMessage() {
      if (this.content !== '') {
        this.$store.dispatch('ChatModule/sendMessage', {
          user: null, // nullじゃなくて！！ユーザーを渡す！！
          content: null, // nullじゃなくて！！入力された内容を渡す！！
          date: Date.now()
        })

        // ！！ここに入力された内容を消す処理を追加！！
      }
    },

    // ここはいじらない
    scrollToEnd() {
      this.$nextTick(() => {
        let container = this.$el.querySelector('.chat-container')
        container.scrollTop = container.scrollHeight
      })
    },

    // ここはいじらない
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
// ここまでロジック

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
