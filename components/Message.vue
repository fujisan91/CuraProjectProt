<template>
  <div>
    <!-- ⓶propsで受け取ったmessagesをループしてmessageとindexを取り出す -->
    <div
      class="message"
      :key="index"
      :class="{own: message.user.id == ユーザーのIDと比較 && message.user.username == ユーザーの名前と比較}"
    >
      <div style="margin-top: 9px"></div>
      <!-- ⓷ここの?を編集して条件処理を追加 -->
      <div
        class="username"
        ???="index>0 && messages[index-1].user.username != message.user.username"
      >
        <!-- ここにユーザーの名前を表示 -->
      </div>
      <div class="username" v-if="index == 0">
        <!-- ここにユーザーの名前を表示 -->
      </div>
      <div class="content">
        <!-- ⓸メッセージの内容を表示するためにv-htmlにメッセージの内容を渡す。 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 親コンポーネントからpropsでmessagesを受け取っている
  props: ['messages'],

  // computedを使うと算出後のデータをdataとして扱える。つまり算出結果にthis.userとアクセスできる
  computed: {
    user() {
      if (this.$store.state.AuthModule.user === null) {
        return {
          id: 'default',
          name: 'default'
        }
      }
      return this.$store.state.AuthModule.user
    }
  }
}
</script>
<style scoped>
.username {
  color: #69b6cf;
}
</style>