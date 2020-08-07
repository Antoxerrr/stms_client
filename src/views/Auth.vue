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
            <v-form @submit.prevent="login">
              <v-text-field
                class="auth-text-field"
                label="Имя пользователя"
                name="username"
                type="text"
                v-model="$v.form.username.$model"
                :error-messages="usernameErrors"
                outlined
              ></v-text-field>

              <v-text-field
                class="auth-text-field"
                id="password"
                label="Пароль"
                name="password"
                type="password"
                hint="Минимум 8 символов"
                v-model="$v.form.password.$model"
                :error-messages="passwordErrors"
                outlined
              ></v-text-field>
              <v-btn
                class="auth-button"
                color="primary"
                type="submit"
                depressed
                block
              >Войти</v-btn>
              <v-layout justify-center align-center v-if="wrongCredentials">
                <p class="mt-5 error--text">Неверный логин или пароль</p>
              </v-layout>
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
import { required } from 'vuelidate/lib/validators';
import { GET_ACCOUNT, LOGIN } from '@/store/actions.type';
import { setHeader } from '@/common/token';
import router from '../router';

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';

export default {
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      if (!this.$v.form.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push(FIELD_REQUIRED_MESSAGE);
      return errors;
    },
  },
  methods: {
    pushToRegister: () => {
      router.push({ name: 'Register' });
    },

    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch(LOGIN, this.form)
          .then(() => {
            this.wrongCredentials = false;
            router.push({ name: 'Home' });
            setHeader();
            this.$store.dispatch(GET_ACCOUNT);
          })
          .catch((status) => {
            if (status === 401) this.wrongCredentials = true;
          });
      }
    },
  },
  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },
  data: () => ({
    form: {
      username: '',
      password: '',
    },
    wrongCredentials: false,
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
