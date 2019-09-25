<template>
  <div>
    <div
      class="message"
      v-for="(message,index) in messages"
      :key="index"
      :class="{own: message.user.id == user.id && message.user.username == user.username}"
    >
      <div
        class="username"
        v-if="index>0 && messages[index-1].user != message.user"
      >{{message.user.username}}</div>
      <div class="username" v-if="index == 0">{{message.user.username}}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['messages'],
  computed: {
    user() {
      console.warn(this.$store.state.AuthModule.user)
      return this.$store.state.AuthModule.user
    }
  }
}
</script>