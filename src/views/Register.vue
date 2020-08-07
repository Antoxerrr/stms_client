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
                name="first_name"
                v-model="$v.form.first_name.$model"
                :error-messages="firstNameErrors"
                type="text"
                outlined
              ></v-text-field>

              <v-text-field
                label="Фамилия"
                name="last_name"
                v-model="$v.form.last_name.$model"
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
              <ul v-if="responseErrors.non_field_errors" class="error--text ma-5">
                <li
                  v-for="error in responseErrors.non_field_errors"
                  :key="error.id"
                >{{ error }}</li>
              </ul>
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
import { REGISTER } from '../store/actions.type';

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';
const passwordMinLength = 8;
const usernameMinLength = 6;

const allowedSymbols = (value) => !value.match(/[^A-zА-я]/g);

export default {
  methods: {
    pushToAuth: () => {
      router.push({ name: 'Auth' });
    },
    cleanResponseErrors(key) {
      if (key) {
        this.responseErrors[key] = [];
      } else {
        this.responseErrors = {};
      }
    },
    register() {
      this.cleanResponseErrors();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch(REGISTER, this.form)
          .then(() => {
            this.pushToAuth();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.responseErrors = error.response.data;
              this.$v.$touch();
            }
          });
      }
    },
  },
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      first_name: '',
      last_name: '',
    },
    responseErrors: {},
    responseNonFieldErrors: {},
  }),
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(usernameMinLength),
      },
      email: { required, email },
      password: {
        required,
        minLength: minLength(passwordMinLength),
      },
      passwordConfirmation: {
        required,
        // eslint-disable-next-line func-names
        sameAs: sameAs(function () { return this.$v.form.password.$model; }),
      },
      first_name: {
        required,
        allowedSymbols,
      },
      last_name: {
        required,
        allowedSymbols,
      },
    },
  },
  computed: {
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      if (!this.$v.form.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.form.username.minLength) {
        errors.push(`Минимальная длина для имени пользователя - ${usernameMinLength} символов`);
      }
      if (this.responseErrors.username) {
        errors = errors.concat(this.responseErrors.username);
        this.cleanResponseErrors('username');
      }
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.email.email) errors.push('Введите корректный email');
      if (this.responseErrors.email) {
        errors = errors.concat(this.responseErrors.email);
        this.cleanResponseErrors('email');
      }
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
      if (!this.$v.form.passwordConfirmation.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.form.passwordConfirmation.sameAs) errors.push('Пароли не совпадают');
      return errors;
    },
    firstNameErrors() {
      let errors = [];
      if (!this.$v.form.first_name.$dirty) return errors;
      if (!this.$v.form.first_name.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.first_name.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      if (this.responseErrors.first_name) {
        errors = errors.concat(this.responseErrors.first_name);
        this.cleanResponseErrors('first_name');
      }
      return errors;
    },
    lastNameErrors() {
      let errors = [];
      if (!this.$v.form.last_name.$dirty) return errors;
      if (!this.$v.form.last_name.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.form.last_name.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      if (this.responseErrors.last_name) {
        errors = errors.concat(this.responseErrors.last_name);
        this.cleanResponseErrors('last_name');
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
