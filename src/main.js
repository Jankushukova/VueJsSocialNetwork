

import Vue from 'vue'
import router from './routes/routerindex'
import App from './App'
import { BAlert } from 'bootstrap-vue'
Vue.component('b-alert', BAlert)
import Toasted from 'vue-toasted'

Vue.use(Toasted)
import VueLogger from 'vuejs-logger';
Vue.use(VueLogger, options);


Vue.config.productionTip = false;

const options = {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};

/* eslint-disable 777777777777777777no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

