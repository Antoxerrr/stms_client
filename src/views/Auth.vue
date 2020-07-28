<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card
          id="auth-block"
          class="pa-3"
          tile
        >
          <v-card-subtitle class="text-md-center font-color-primary auth-card-title">
            STORAGE MANAGEMENT SYSTEM
          </v-card-subtitle>
          <v-card-title class="justify-center mb-5 font-color-primary auth-card-title">
            Добро пожаловать!
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                class="auth-text-field"
                label="E-mail"
                name="email"
                type="email"
                outlined
              ></v-text-field>

              <v-text-field
                class="auth-text-field"
                id="password"
                label="Пароль"
                name="password"
                type="password"
                hint="Минимум 8 символов"
                outlined
              ></v-text-field>
              <v-btn
                class="auth-button"
                color="primary"
                depressed
                block
              >Войти</v-btn>
              <v-row>
                <v-checkbox
                  color="accent" label="Запомнить меня">

                </v-checkbox>
                <div id="forgot-password-wrap">
                  <router-link to="/auth">Забыли пароль?</router-link>
                </div>
              </v-row>
            </v-form>
            <v-divider class="ma-7"></v-divider>
            <v-btn
              id="reg-button"
              class="auth-button"
              color="accent"
              depressed
              block
            >Зарегистрироваться</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Auth',
};
</script>

<style scoped>
.auth-card-title {
  color: #3579FE !important;
  font-size: 24px;
}

#auth-block {
  min-width: 450px !important;
}

.auth-button {
  min-height: 64px;
}

#forgot-password-wrap {
  display: flex;
}

.theme--light.v-divider {
  border-color: #B1C6F4 !important;
}
</style>
