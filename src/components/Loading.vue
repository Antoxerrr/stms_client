<template>
  <v-progress-linear
    :active="loading"
    :color="color"
    :indeterminate="true"
    class="ma-0"
    height="4"
    style="top: -2px;"
    id="main-loader"
  ></v-progress-linear>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loading: Boolean,
    color: String,
  },
};
</script>

<style scoped>
#main-loader {
  height: 3px;
  top: 0 !important;
  transform: scale(1, -1);
}
</style>
