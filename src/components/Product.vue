<template>
<v-card
  class="mx-auto mb-5"
  outlined
>
  <v-row>
    <v-col cols="9">
      <v-list-item three-line>
        <v-list-item-avatar
          tile
          size="150"
        >
          <img src="../assets/logo.png" alt="">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ product_data.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ product_data.category }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
    <v-col cols="3" align-self="center">
      <v-list-item-subtitle>{{ product_data.price }} P/Ед.</v-list-item-subtitle>
      <v-card-actions>
        <v-btn
          raised
          x-large
          color="primary"
          @click="addToCart"
        >
          В корзину
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product_data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data);
    },
  },
};
</script>
