<template>
  <v-container color="secondary">
    <v-layout row color="secondary">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="name"
                      id="name"
                      v-model="name"
                      type="e-mail"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-btn type="submit" :loading="loading" color="primary">チャットを始める</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    user() {
      console.log(this.$store.state.AuthModule.user)
      return this.$store.state.AuthModule.user
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch('AuthModule/signUserIn', {
        name: this.name
      })
      this.$router.push('chat')
    }
  }
}
</script>
