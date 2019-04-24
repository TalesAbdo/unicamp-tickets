import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/Login/Login.vue';
import Home from 'view/Home/Home.vue';
import Tickets from 'view/Tickets/Tickets.vue';
import Services from 'view/Services/Services.vue';
import Members from 'view/Members/Members.vue';
import Metrics from 'view/Metrics/Metrics.vue';

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
        },
        {
            path: '/tickets',
            name: 'Tickets',
            component: Tickets,
        },
        {
            path: '/services',
            name: 'Services',
            component: Services,
        },
        {
            path: '/members',
            name: 'Members',
            component: Members,
        },
        {
            path: '/metrics',
            name: 'Metrics',
            component: Metrics,
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import(/* webpackChunkName: "about" */ './viewComponents/About.vue'),
        // },
    ],
});
