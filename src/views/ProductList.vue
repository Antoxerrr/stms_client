<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="8">
        <h2>Список товаров</h2>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск товаров"
          filled
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4" xl="2">
        <v-card>
          <v-card-title class="d-block">
            <v-toolbar-title>Категории товаров</v-toolbar-title>
              <v-card
                v-if="PRODS.length"
                outlined
                class="mx-auto category-box"
                max-width="400"
              >
                <v-list>
                  <v-list-item-group multiple color="indigo">
                    <v-list-item
                      v-for="(prod, i) in PRODS"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="prod.category"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <p v-else class='no-items'>No cats!</p>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="8" xl="6">
        <div v-if="PRODS.length">
          <Product
            :product_data="product"
            :key="product.id"
            v-for="product of PRODS"
            @addToCart="addToCart"
          />
        </div>
        <p v-else class='no-items'>No items!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Product from '@/components/Product.vue';
import { GET_PRODUCTS, ADD_TO_CART } from '../store/actions.type';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  computed: {
    ...mapGetters(['PRODS']),
  },
  data: () => ({
  }),
  methods: {
    methods: {
      ...mapActions(['ADD_TO_CART']),
    },
    addToCart(data) {
      this.$store.dispatch(ADD_TO_CART, data);
    },
  },
  mounted() {
    this.$store.dispatch(GET_PRODUCTS);
  },
};

</script>

<style scoped>
.category-box {
  width: 100%;
}
.no-items {
  display: block;
  color: #ccc;
  margin-top: 20px;
  font-size: 16px;
}
</style>
