<template>
  <v-container>
    <h2>Профиль</h2>
    <v-tabs
      class="mt-8"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        Информация
      </v-tab>
      <v-tab-item>
        <v-divider></v-divider>
        <v-container fluid class="fill-height">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="3"
            >
              <v-card id="avatar-wrap" class="py-5" outlined>
                <v-avatar color="primary" size="150" id="user-avatar">
                  <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
                <v-btn text color="primary" class="mt-3">Сменить фотографию</v-btn>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="9"
            >
              <v-card outlined class="pa-6">
                <v-row class="pt-3">
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <h4>Основная информация</h4>
                    <v-divider class="my-5"></v-divider>
                    <v-form @submit.prevent="">
                      <v-text-field
                        label="Имя пользователя"
                        name="username"
                        type="text"
                        v-model="$v.primaryInfo.username.$model"
                        outlined
                        :error-messages="usernameErrors"
                      ></v-text-field>
                      <v-text-field
                        label="E-mail"
                        name="email"
                        type="email"
                        v-model="$v.primaryInfo.email.$model"
                        outlined
                        :error-messages="emailErrors"
                      ></v-text-field>
                      <v-text-field
                        label="Имя"
                        name="first_name"
                        type="text"
                        v-model="$v.primaryInfo.first_name.$model"
                        outlined
                        :error-messages="firstNameErrors"
                      ></v-text-field>
                      <v-text-field
                        label="Фамилия"
                        name="last_name"
                        type="text"
                        v-model="$v.primaryInfo.last_name.$model"
                        outlined
                        :error-messages="lastNameErrors"
                      ></v-text-field>
                      <v-btn
                        color="success"
                        type="submit"
                      >
                        Обновить
                      </v-btn>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab>
        Безопасность
      </v-tab>
      <v-tab-item>
        <v-divider></v-divider>
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <h4>Изменить пароль</h4>
          <v-form @submit.prevent="">
            <v-text-field
              label="Старый пароль"
              name="old_password"
              type="password"
              v-model="$v.passwordInfo.old_password.$model"
              outlined
              :error-messages="oldPasswordErrors"
            ></v-text-field>
            <v-text-field
              label="Новый пароль"
              name="new_password"
              type="password"
              v-model="$v.passwordInfo.new_password.$model"
              outlined
              :error-messages="passwordErrors"
            ></v-text-field>
            <v-text-field
              label="Подтверждение пароля"
              name="new_password_confirm"
              type="password"
              v-model="$v.passwordInfo.new_password_confirm.$model"
              outlined
              :error-messages="passwordConfirmationErrors"
            ></v-text-field>
            <v-btn
              color="success"
              type="submit"
            >
              Изменить пароль
            </v-btn>
          </v-form>
        </v-col>
      </v-tab-item>
      <v-tab>
        Настройки
      </v-tab>
      <v-tab-item>
        <v-divider></v-divider>
        <v-switch>тупа кек</v-switch>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';
const passwordMinLength = 8;
const usernameMinLength = 6;

const allowedSymbols = (value) => !value.match(/[^A-zА-я]/g);

export default {
  name: 'Profile',
  data: () => ({
    primaryInfo: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
    },
    passwordInfo: {
      old_password: '',
      new_password: '',
      new_password_confirm: '',
    },
    responseErrors: {},
    responseNonFieldErrors: {},
  }),
  computed: {
    ...mapState({
      account: (state) => state.account.account,
    }),

    usernameErrors() {
      let errors = [];
      if (!this.$v.primaryInfo.username.$dirty) return errors;
      if (!this.$v.primaryInfo.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.primaryInfo.username.minLength) {
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
      if (!this.$v.primaryInfo.email.$dirty) return errors;
      if (!this.$v.primaryInfo.email.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.primaryInfo.email.email) errors.push('Введите корректный email');
      if (this.responseErrors.email) {
        errors = errors.concat(this.responseErrors.email);
        this.cleanResponseErrors('email');
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.passwordInfo.new_password.$dirty) return errors;
      if (!this.$v.passwordInfo.new_password.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.passwordInfo.new_password.minLength) {
        errors.push(`Минимальная длина пароля - ${passwordMinLength} символов`);
      }
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.passwordInfo.new_password_confirm.$dirty) return errors;
      if (!this.$v.passwordInfo.new_password_confirm.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.passwordInfo.new_password_confirm.sameAs) errors.push('Пароли не совпадают');
      return errors;
    },
    firstNameErrors() {
      let errors = [];
      if (!this.$v.primaryInfo.first_name.$dirty) return errors;
      if (!this.$v.primaryInfo.first_name.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.primaryInfo.first_name.allowedSymbols) {
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
      if (!this.$v.primaryInfo.last_name.$dirty) return errors;
      if (!this.$v.primaryInfo.last_name.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.primaryInfo.last_name.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      if (this.responseErrors.last_name) {
        errors = errors.concat(this.responseErrors.last_name);
        this.cleanResponseErrors('last_name');
      }
      return errors;
    },
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.passwordInfo.old_password.$dirty) return errors;
      if (!this.$v.passwordInfo.old_password.required) errors.push(this.FIELD_REQUIRED_MESSAGE);
      return errors;
    },
  },
  validations: {
    primaryInfo: {
      username: {
        required,
        minLength: minLength(usernameMinLength),
      },
      email: { required, email },
      first_name: {
        required,
        allowedSymbols,
      },
      last_name: {
        required,
        allowedSymbols,
      },
    },
    passwordInfo: {
      old_password: { required },
      new_password: {
        required,
        minLength: minLength(passwordMinLength),
      },
      new_password_confirm: {
        required,
        // eslint-disable-next-line func-names
        sameAs: sameAs(function () { return this.$v.passwordInfo.new_password.$model; }),
      },
    },
  },
};
</script>

<style scoped>
  #avatar-wrap {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  #user-avatar {
    border-radius: 50% !important;
  }
</style>
