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
                v-if="categories.length"
                outlined
                class="mx-auto category-box"
                max-width="400"
              >
                <v-list>
                  <v-list-item-group multiple color="indigo">
                    <v-list-item
                      v-for="(category, i) in categories"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="category.name"></v-list-item-title>
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
        <div v-if="products.length">
          <Product
            :product_data="product"
            :key="product.id"
            v-for="product of products"
            @sendArticle="showarticle"
          />
        </div>
        <p v-else class='no-items'>No items!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  computed: {
    categories() {
      return [
        { name: 'asd' },
        { name: 'asd' },
      ];
    },
  },
  data: () => ({
    products: [
      {
        id: 0, name: 'lego', category: 'toys', description: 'lego toy', price: 545, in_storage: 14, bar_code: 123123,
      },
    ],
  }),
  methods: {
    showarticle(value) {
      console.log(value);
    },
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
