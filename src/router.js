import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/Login/Login.vue';
import Home from 'view/Home/Home.vue';
import Tickets from 'view/Tickets/Tickets.vue';
import Services from 'view/Services/Services.vue';

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
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import(/* webpackChunkName: "about" */ './viewComponents/About.vue'),
        // },
    ],
});
