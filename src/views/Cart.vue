<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" xl="6">
        <div v-if="CART.length">
          <CartProduct
            :product_data="item"
            v-for="(item, index) of CART"
            :key="item.id"
            @deleteFromCart="deleteFromCart(index)"
          />
        </div>
        <p v-else class='no-items'>No items!</p>
      </v-col>
      <v-col cols="4" xl="2">
        <div class='total'>Итого: <span>300 Р.</span></div>
        <div class="btn-wrap">
          <v-btn
            raised
            block
            x-large
            color="primary"
          >
            Оформить заказ
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartProduct from '@/components/CartProduct.vue';
import { mapGetters, mapActions } from 'vuex';
import { DELETE_FROM_CART } from '../store/actions.type';

export default {
  name: 'Cart',
  components: {
    CartProduct,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(['CART']),
  },
  methods: {
    ...mapActions(['DELETE_FROM_CART']),
    deleteFromCart(index) {
      this.$store.dispatch(DELETE_FROM_CART, index);
    },
  },
};
</script>

<style scoped>
.total {
  display: block;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
}
.btn-wrap {
  margin-top: 15px;
}
</style>
