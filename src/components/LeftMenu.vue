<template>
  <v-layout column>
    <v-list dense>
      <v-list-item two-line>
        <v-list-item-avatar color="success">
          {{ avatarText() }}
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title id="fullname-text">{{ fullName() }}</v-list-item-title>
          <v-list-item-subtitle id="roles-wrap">{{ userRole() }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mb-5"></v-divider>
      <v-list-item link @click="pushToHomePage">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Главная
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="pushToProfile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Профиль
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="pushToProductList">
        <v-list-item-icon>
          <v-icon>mdi-diamond</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Список товаров
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="pushToCart">
        <v-list-item-icon>
          <v-icon>mdi-cart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Корзина
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-layout>
</template>

<script>
/* eslint-disable camelcase */
import { mapState } from 'vuex';
import { GET_ACCOUNT } from '../store/actions.type';

export default {
  name: 'leftMenu',
  computed: mapState({
    account: (state) => state.account.account,
  }),
  mounted() {
    this.$store.dispatch(GET_ACCOUNT);
  },
  methods: {
    pushToHomePage() {
      this.$router.push({ name: 'Home' });
    },
    pushToProfile() {
      this.$router.push({ name: 'Profile' });
    },
    pushToProductList() {
      this.$router.push({ name: 'ProductList' });
    },
    pushToCart() {
      this.$router.push({ name: 'Cart' });
    },
    userRole() {
      if (this.account.groups) return this.account.groups[0];
      return '';
    },
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
    fullName() {
      // eslint-disable-next-line no-unused-vars
      let name;
      const { email, first_name, last_name } = this.account;
      if (first_name) {
        name = first_name;
        if (last_name) {
          name += ` ${last_name}`;
        }
      } else {
        name = email;
      }
      return name;
    },
  },
};
</script>

<style scoped>
  #fullname-text{
    font-size: .96em;
    font-weight: 500;
    width: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  #roles-wrap {
    font-size: 0.79em;
  }
  #exit {
    margin-top: auto;
  }
</style>
