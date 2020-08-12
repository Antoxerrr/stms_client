<template>
  <v-container>
    <router-link to="auth">К авторизации</router-link>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      account: (state) => state.account.account,
    }),
  },
};
</script>
