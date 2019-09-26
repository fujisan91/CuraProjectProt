<template>
  <v-app style="background: #ffffff;">
    <v-app-bar :clipped-left="clipped" fixed app color="secondary">
      <v-spacer />
      <nuxt-link to="/">
        <v-toolbar-title v-text="title" class="primary--text" />
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app color="secondary">
      <span class="primary--text">&copy; 2019 tcmobile</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'Cura'
    }
  }
}
</script>