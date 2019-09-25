<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="createChat">
          <v-flex xs12>
            <v-text-field
              name="chatname"
              label="Chat Name"
              id="chatname"
              v-model="chatName"
              type="text"
              required></v-text-field>
            <v-btn type="submit">トークを作成</v-btn>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        chatName: ''
      }
    },
    methods: {
      createChat () {
        if (this.chatName !== '') {
          let key = 0
          this.$store.dispatch('ChatModule/createChat', { chatName: this.chatName }).then((value) => {
            key = value
            this.$router.push('/chat/' + key)
          })
        }
      }
    }
  }
</script>
