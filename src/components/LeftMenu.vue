<template>
  <v-layout class="ma-5">
    <v-avatar color="primary">
      <span class="white--text">{{ avatarText() }}</span>
    </v-avatar>
    <div id="account-text">
      <v-row><span id="account-name">Вася Петров</span></v-row>
      <v-row><span id="account-email">dolbaeb@mail.ru</span></v-row>
    </div>
  </v-layout>
</template>

<script>
/* eslint-disable camelcase */
import { mapState } from 'vuex';

export default {
  name: 'leftMenu',
  computed: {
    ...mapState({
      account: (state) => state.account.account,
    }),
  },
  methods: {
    avatarText() {
      let text = '';
      const { username, first_name, last_name } = this.account;
      if (first_name) {
        text = first_name.charAt(0);
        if (last_name) {
          text += last_name.charAt(0);
        }
      } else {
        text = username.charAt(0);
      }
      return text.toUpperCase();
    },
  },
};
</script>

<style scoped>
</style>
