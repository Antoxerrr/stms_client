<template>
  <v-container>
    <h2>Профиль</h2>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-card outlined>
          <div id="avatar-wrap" class="pt-5">
            <v-avatar size="150" color="primary">
              <v-icon size="50">mdi-account</v-icon>
            </v-avatar>
            <v-btn class="mt-5" text color="primary">Сменить фото</v-btn>
          </div>
          <v-divider class="mt-3"></v-divider>
          <v-list class="pa-0">
            <v-list-item link>
              <v-list-item-icon><v-icon>mdi-account-edit</v-icon></v-list-item-icon>
              <v-list-item-content>Основная информация</v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
              <v-list-item-content>Настройки</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        KEK
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>
  #avatar-wrap {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>
