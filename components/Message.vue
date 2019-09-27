<template>
  <div>
    <div
      class="message"
      v-for="(message,index) in messages"
      :key="index"
      :class="{own: message.user.id == user.id && message.user.username == user.username}"
    >
      <div style="margin-top: 20px"></div>
      <div
        class="username"
        v-if="index>0 && messages[index-1].user != message.user"
      >{{message.user.username}}</div>
      <div class="username" v-if="index == 0">{{message.user.username}}</div>
      <div class="content">
        <div v-html="message.content"></div>
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