<template>
  <v-list subheader>
    <v-subheader>トークルーム一覧</v-subheader>
    <v-list-item v-for="(chat, index) in chats" v-bind:key="index" @click="" :to="/chat/ + chat.id">
      <v-list-item-content>
        <v-list-item-title v-html="chat.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  export default{
    created () {
      this.$store.dispatch('ChatModule/loadChats')
    },
    computed: {
      chats () {
        return this.$store.state.ChatModule.chats
      }
    }
  }
</script>
