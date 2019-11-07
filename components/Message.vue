<template>
  <div>
    <div
      class="message"
      ⓶！！ここにメッセージをループする処理を追加
      :key="index"
      :class="{own: message.user.id == ユーザーのIDと比較 && message.user.username == ユーザーの名前と比較}"
    >
      <div style="margin-top: 9px"></div>
      <div
        class="username"
        ⓷ここの?を編集して条件処理を追加
        ???="index>0 && messages[index-1].user.username != message.user.username"
      >
        <!-- ユーザーの名前を表示 -->
      </div>
      <div class="username" v-if="index == 0">
        <!-- ユーザーの名前を表示 -->
      </div>
      <div class="content">
        <!-- ⓸メッセージの内容を表示するためにv-htmlにメッセージの内容を渡す。 -->
        <div v-html></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messages'],
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