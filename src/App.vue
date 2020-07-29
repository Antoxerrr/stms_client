<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="primary"
    >
      <div id="header-text-wrap">
        <v-icon
          id="header-icon"
          large
          class="mr-3"
          color="white"
        >mdi-package-variant-closed</v-icon>
        <span id="header-text">STMS</span>
      </div>
    </v-app-bar>
    <v-main>
      <loading
        :loading="loadingActive"
      />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import router from './router';
import loading from './components/Loading.vue';

export default {
  name: 'App',
  components: {
    loading,
  },

  created() {
    router.beforeResolve((to, from, next) => {
      this.loadingActive = true;
      next();
    });

    router.afterEach(() => {
      this.loadingActive = false;
    });
  },

  data: () => ({
    loadingActive: false,
  }),
};
</script>

<style>
:root {
  --primary-color: #3579FE;
  --accent-color: #b1c6f4;
}

body {
  background-color: #E5E5E5;
}

.v-application a {
  text-decoration: none;
  font-weight: 500;
}

#header-text {
  cursor: default;
}

#header-text-wrap {
  font-size: 28px;
  color: white;
}
</style>
