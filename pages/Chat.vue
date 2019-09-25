<template>
    <div>
     <!-- チャット部分？ -->
     <section v-for="{ key, name, message } in chat" :key="key" class="item">
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
              <p>{{ message }}</p>
          </div>
        </div>
    </section>
    <!-- インプット部分-->
    <form action="" @submit.prevent="doSend" class="form">
      <textarea
        v-model="input"
        @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" class="send-button">Send</button>
    </form>
    </div>
</template>

<script>
// firebase モジュール
import firebase from 'firebase'
export default {
    data () {
        return {
            user: {email:"aaa",name:"name"}, // ユーザー情報
            chat: [], // 取得したしたメッセージを入れる配列
            input: '' // 入力したメッセージ
        }
    },
    created() {
        const ref_message = firebase.database().ref('message')
        this.chat = []
        // message に変更があったときのハンドラを登録
        ref_message.limitToLast(10).on('child_added', this.childAdded)
        // firebase.auth().onAuthStateChanged(user => {
        //     this.user = user ? user: {}
        //     const ref_message = firebase.database().ref('message')
        //     if(user){
        //         this.chat = []
        //         // message に変更があったときのハンドラを登録
        //         ref_message.limitToLast(10).on('child_added', this.childAdded)
        //     } else {
        //         // message に変更があったときのハンドラを解除
        //         ref_message.limitToLast(10).off('child_added', this.childAdded)
        //     }
        // })
    },
    methods: {

        //ログアウト処理
        doLogout() {
            firebase.auth().signOut()
        },
        //スクロール位置を一番下に移動
        scrollBottom() {
            this.$nextTick(() => {
                window.scrollTo(0, document.body.clientHeight)
            })
        },
        //受け取ったメッセージをchatに追加
        //データベースに新しい要素が追加されると随時呼び出される
        childAdded(snap) {
            const message = snap.val()
            this.chat.push({
                key: snap.key,
                name: message.name,
                message: message.message
            })
            this.scrollBottom()
        },
        doSend() {
            if (this.input.length) {
                // firebase にメッセージを追加
                firebase.database().ref('message').push({
                    message: this.input,
                    name: this.user.name
                }, () => {
                    this.input = '' // フォームを空にする
                })
            }
            // if (this.user.uid && this.input.length) {
            //     //firebaseにメッセージを追加
            //     firebase.database().ref('message').push({
            //         message: this.input,
            //         name: this.user.email,
            //         image: this.user.photoUrl
            //     },() => {
            //         this.input = '' //フォームを辛煮する
            //     })
            // }
        }
    }
}
</script>