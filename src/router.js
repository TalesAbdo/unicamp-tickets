import Vue from 'vue';
import Router from 'vue-router';
import Login from './viewComponents/Login.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import(/* webpackChunkName: "about" */ './viewComponents/About.vue'),
        // },
    ],
});
