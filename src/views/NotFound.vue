<template>
 <v-container class="fill-height">
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="10"
      >
        <v-text
          class="err404 d-block text-center"
          color="primary"
          >404</v-text>
        <v-text class="Oops d-block text-center">Упс, похоже вы потерялись...</v-text>
        <v-text class="errMistake d-block text-center">Запрашиваемая страница не найдена!
          Скорее всего, в ссылке допущена ошибка.</v-text>
        <v-text class="clickpls d-block d-block text-center">Нажатие на кошака вернёт
          вас на главную страницу.</v-text>

        <router-link class="catbox d-flex justify-center" to="/">
          <img
            src="../assets/catbox.png" alt="тык на кошака">
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.err404 {
  font-size: 144px;
  font-weight: 500;
  letter-spacing: -1.5px;
  line-height: 110px;
  color:  var(--primary-color);
}
.Oops {
  font-size: 34px;
  letter-spacing: 0.25px;
  margin-top: 30px;
  color: var(--accent-color);
}
.errMistake {
  font-size: 30px;
  letter-spacing: 0.25px;
}
.clickpls {
  font-size: 18px;
  letter-spacing: 0.5px;
  margin-top: 30px;
  color:  var(--primary-color);
}
</style>
