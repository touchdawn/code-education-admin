import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import axios from 'axios'//引入axios
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.config.productionTip = false

Vue.use(ElementUI, {size:"small"});
Vue.use(mavonEditor);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
