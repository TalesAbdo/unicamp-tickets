import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';
// import Login from 'view/Login/Login.vue';
// import Home from 'view/Home/Home.vue';
// import Tickets from 'view/Tickets/Tickets.vue';
// import Services from 'view/Services/Services.vue';
// import Members from 'view/Members/Members.vue';
// import Metrics from 'view/Metrics/Metrics.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ 'view/Login/Login.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "about" */ 'view/Home/Home.vue'),
        },
        {
            path: '/tickets',
            name: 'Tickets',
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "about" */ 'view/Tickets/Tickets.vue'),
        },
        {
            path: '/services',
            name: 'Services',
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "about" */ 'view/Services/Services.vue'),
        },
        {
            path: '/members',
            name: 'Members',
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "about" */ 'view/Members/Members.vue'),
        },
        {
            path: '/metrics',
            name: 'Metrics',
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "about" */ 'view/Metrics/Metrics.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.state.user.id) {
            next();
        } else {
            next(false);
        }
    } else {
        next();
    }
});

export default router;
