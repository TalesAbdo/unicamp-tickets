import moment from 'moment';
import Vue from 'vue';
import Icon from 'vue-awesome/icons';
import App from './App.vue';
import router from './router';
import store from './store';

moment.locale('pt-BR');
Vue.component('icon', Icon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
