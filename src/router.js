import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/Login/Login.vue';
import Home from 'view/Home/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import(/* webpackChunkName: "about" */ './viewComponents/About.vue'),
        // },
    ],
});
