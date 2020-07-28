<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
body {
  background-color: #E5E5E5;
}
</style>
