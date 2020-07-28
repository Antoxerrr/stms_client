import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
  options: {
    customProperties: true,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3579FE',
        secondary: '#424242',
        accent: '#B1C6F4',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
