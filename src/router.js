import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('view/Login/Login.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            meta: { requiresAuth: true },
            component: () => import('view/Home/Home.vue'),
        },
        {
            path: '/services',
            name: 'Services',
            meta: { requiresAuth: true },
            component: () => import('view/Services/Services.vue'),
        },
        {
            path: '/members',
            name: 'Members',
            meta: { requiresAuth: true },
            component: () => import('view/Members/Members.vue'),
        },
        {
            path: '/metrics',
            name: 'Metrics',
            meta: { requiresAuth: true },
            component: () => import('view/Metrics/Metrics.vue'),
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
