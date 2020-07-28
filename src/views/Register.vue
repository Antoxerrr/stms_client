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
                label="Имя пользователя"
                name="username"
                v-model="form.username"
                type="text"
                outlined
              ></v-text-field>

              <v-text-field
                class="auth-text-field"
                label="E-mail"
                name="email"
                v-model="form.email"
                type="email"
                outlined
              ></v-text-field>

              <v-text-field
                class="auth-text-field"
                label="Пароль"
                name="password"
                v-model="form.password"
                type="password"
                hint="Минимум 8 символов"
                outlined
              ></v-text-field>
              <v-text-field
                class="auth-text-field"
                label="Подтверждение пароля"
                name="passwordConfirmation"
                v-model="form.passwordConfirmation"
                type="password"
                outlined
              ></v-text-field>
              <v-text-field
                class="auth-text-field"
                label="Имя"
                name="firstName"
                v-model="form.firstName"
                type="text"
                outlined
              ></v-text-field>
              <v-text-field
                class="auth-text-field"
                label="Фамилия"
                name="lastName"
                v-model="form.lastName"
                type="text"
                outlined
              ></v-text-field>
              <v-btn
                class="auth-button"
                color="primary"
                depressed
                block
              >Зарегистрироваться</v-btn>
            </v-form>
            <v-divider class="ma-5"></v-divider>
            <v-layout
              justify-center
              align-center
              class="mb-5"
              id="have-acc-ask-text"
            >
              <span>Уже есть аккаунт?</span>
            </v-layout>
            <v-btn
              id="reg-button"
              class="auth-button"
              color="accent"
              @click="pushToAuth"
              depressed
              block
            >Войти</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import router from '../router';

export default {
  name: 'Register',
  methods: {
    pushToAuth: () => {
      router.push({ name: 'Auth' });
    },
  },
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
    },
    validations: {
      form: {
        username: { required },
        email: { required, email },
        password: {
          required,
          minLength: minLength(8),
        },
        passwordConfirmation: {
          sameAs: sameAs('form.password'),
        },
        firstName: { required },
      },
    },
  }),
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

  #have-acc-ask-text {
    color: var(--secondary-color);
  }
</style>
