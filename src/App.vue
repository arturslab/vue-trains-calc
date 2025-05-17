<template>
  <v-app>
    <v-layout>
    <v-main id="wp-melma-vue-trains-calc" class="pt-0">
      <MainPage />
      <div class="py-4" />
      <AppFooter v-if="showFooter" />
    </v-main>
    </v-layout>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
        showFooter: true
      }
    }
  }
</script>
