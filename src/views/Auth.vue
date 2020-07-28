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
          <v-card-subtitle class="text-md-center auth-card-subtitle">
            STORAGE MANAGEMENT SYSTEM
          </v-card-subtitle>
          <v-card-title class="justify-center auth-card-title">
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
              <v-layout justify-center align-center>
                <v-checkbox
                  color="primary" label="Запомнить меня">
                </v-checkbox>
                <v-spacer></v-spacer>
                <router-link id="forgot-password-link" to="/auth">Забыли пароль?</router-link>
              </v-layout>
            </v-form>
            <v-divider class="ma-5"></v-divider>
            <v-btn
              id="reg-button"
              class="auth-button"
              color="accent"
              depressed
              block
              @click="pushToRegister"
            >Зарегистрироваться</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router';

export default {
  name: 'Auth',
  methods: {
    pushToRegister: () => {
      router.push({ name: 'Register' });
    },
  },
};
</script>

<style scoped>
.auth-card-title {
  color: var(--primary-color) !important;
  font-size: 24px;
}

.auth-card-subtitle {
  color: var(--accent-color) !important;
  font-size: 18px;
}

#auth-block {
  min-width: 450px !important;
}

.auth-button {
  min-height: 48px;
}

.theme--light.v-divider {
  border-color: var(--accent-color) !important;
}

#forgot-password-link {
  font-size: 15px;
}

#reg-button {
  transition: .2s linear;
}

#reg-button:hover {
  background-color: var(--primary-color) !important;
}
</style>
