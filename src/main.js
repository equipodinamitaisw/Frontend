import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import store from './store';
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'G-WR1KC1L6PJ',
  router
});

new Vue({
  router,
  vuetify,
  store,
  moment,
  render: h => h(App)
}).$mount('#app');
