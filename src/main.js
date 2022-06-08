import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import store from './store';
import VueGtag from "vue-gtag";

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config:{id: 'G-WR1KC1L6PJ'},
  appName: 'go2climb'
});

new Vue({
  router,
  vuetify,
  store,
  moment,
  render: h => h(App)
}).$mount('#app');
