<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="primary"
    >
      <v-app-bar-nav-icon
        color="white"
        class="mr-5"
        @click.stop="leftMenu = !leftMenu"
      ></v-app-bar-nav-icon>
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
    <v-navigation-drawer
      v-model="leftMenu"
      app
    >

    </v-navigation-drawer>
    <v-main>
      <loading
        :loading="loadingActive"
        color="primary"
      />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import loading from './components/Loading.vue';

export default {
  name: 'App',
  components: {
    loading,
  },

  computed: {
    ...mapState({
      loadingActive: (state) => state.loading.loadingActive,
    }),
  },

  data: () => ({
    leftMenu: false,
  }),
};
</script>

<style>
:root {
  --primary-color: #3579FE;
  --accent-color: #B1C6F4;
  --secondary-color: #424242;
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

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .1s ease;
}

.fade-leave-active {
  transition: opacity .1s ease;
  opacity: 0;
}
</style>
