<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="5"
      >
        <v-card
          id="auth-block"
          class="pa-3"
          tile
        >
          <v-card-subtitle class="text-sm-center auth-card-subtitle">
            STORAGE MANAGEMENT SYSTEM
          </v-card-subtitle>
          <v-card-title class="justify-center auth-card-title">
            Добро пожаловать!
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                label="Имя пользователя"
                name="username"
                v-model="$v.form.username.$model"
                type="text"
                :error-messages="usernameErrors"
                outlined
              ></v-text-field>

              <v-text-field
                label="E-mail"
                name="email"
                v-model="$v.form.email.$model"
                type="email"
                :error-messages="emailErrors"
                outlined
              ></v-text-field>

              <v-text-field
                label="Пароль"
                name="password"
                v-model="$v.form.password.$model"
                :error-messages="passwordErrors"
                type="password"
                hint="Минимум 8 символов"
                outlined
              ></v-text-field>
              <v-text-field
                label="Подтверждение пароля"
                name="passwordConfirmation"
                v-model="$v.form.passwordConfirmation.$model"
                :error-messages="passwordConfirmationErrors"
                type="password"
                outlined
              ></v-text-field>

              <v-text-field
                label="Имя"
                name="firstName"
                v-model="$v.form.firstName.$model"
                :error-messages="firstNameErrors"
                type="text"
                outlined
              ></v-text-field>

              <v-text-field
                label="Фамилия"
                name="lastName"
                v-model="$v.form.lastName.$model"
                :error-messages="lastNameErrors"
                type="text"
                outlined
              ></v-text-field>
              <v-btn
                class="auth-button"
                color="primary"
                type="submit"
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

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';
const passwordMinLength = 8;

const allowedSymbols = (value) => Boolean(value.match(/^[A-zА-я]/g));

export default {
  methods: {
    pushToAuth: () => {
      router.push({ name: 'Auth' });
    },
    register() {
      if (this.$v.form.$invalid) {
        this.$v.touch();
      }
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
  }),
  validations: {
    form: {
      username: { required },
      email: { required, email },
      password: {
        required,
        minLength: minLength(passwordMinLength),
      },
      passwordConfirmation: {
        // eslint-disable-next-line func-names
        sameAs: sameAs(function () { return this.$v.form.password.$model; }),
      },
      firstName: {
        required,
        allowedSymbols,
      },
      lastName: {
        allowedSymbols,
      },
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      if (!this.$v.form.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.email.email) errors.push('Введите корректный email');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.password.minLength) {
        errors.push(`Минимальная длина пароля - ${passwordMinLength} символов`);
      }
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form.passwordConfirmation.$dirty) return errors;
      if (!this.$v.form.passwordConfirmation.sameAs) errors.push('Пароли не совпадают');
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      if (!this.$v.form.firstName.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.firstName.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      if (!this.$v.form.firstName.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      return errors;
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
