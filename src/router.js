import Vue from 'vue';
import Router from 'vue-router';
// import Login from 'view/Login/Login.vue';
// import Home from 'view/Home/Home.vue';
// import Tickets from 'view/Tickets/Tickets.vue';
// import Services from 'view/Services/Services.vue';
// import Members from 'view/Members/Members.vue';
// import Metrics from 'view/Metrics/Metrics.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ 'view/Login/Login.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "about" */ 'view/Home/Home.vue'),
        },
        {
            path: '/tickets',
            name: 'Tickets',
            component: () => import(/* webpackChunkName: "about" */ 'view/Tickets/Tickets.vue'),
        },
        {
            path: '/services',
            name: 'Services',
            component: () => import(/* webpackChunkName: "about" */ 'view/Services/Services.vue'),
        },
        {
            path: '/members',
            name: 'Members',
            component: () => import(/* webpackChunkName: "about" */ 'view/Members/Members.vue'),
        },
        {
            path: '/metrics',
            name: 'Metrics',
            component: () => import(/* webpackChunkName: "about" */ 'view/Metrics/Metrics.vue'),
        },
    ],
});
