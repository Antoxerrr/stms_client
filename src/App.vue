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
        v-if="isAuthenticated"
      ></v-app-bar-nav-icon>
      <div id="header-text-wrap">
        <v-icon
          id="header-icon"
          class="mr-3"
          color="white"
        >mdi-package-variant-closed</v-icon>
        <span id="header-text">STMS</span>
      </div>
      <div id="logout-btn-wrap" v-if="isAuthenticated">
        <v-btn
          text
          color="white"
          @click.prevent="logout"
        >
          <v-icon class="mr-1">mdi-exit-to-app</v-icon>
          <span>Выйти</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="leftMenu"
      app
    >
      <left-menu/>
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
import { LOGOUT } from '@/store/actions.type';
import loading from './components/Loading.vue';
import leftMenu from './components/LeftMenu.vue';

export default {
  name: 'App',
  components: {
    loading,
    leftMenu,
  },

  computed: {
    ...mapState({
      loadingActive: (state) => state.loading.loadingActive,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },

  data: () => ({
    leftMenu: false,
  }),
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => this.$router.push({ name: 'Auth' }));
    },
  },
};
</script>

<style>
:root {
  --primary-color: #3579FE;
  --accent-color: #B1C6F4;
  --secondary-color: #424242;
}

.theme--light.v-application {
  background-color: #f4f6f8 !important;
}

.v-application a {
  text-decoration: none;
  font-weight: 500;
}

#header-text {
  cursor: default;
}

#header-icon {
  font-size: 1.5em;
}

#header-text-wrap {
  font-size: 1.5em;
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
#logout-btn-wrap{
  margin-left: auto;
}
h2 {
  color: #263238;
}
</style>
