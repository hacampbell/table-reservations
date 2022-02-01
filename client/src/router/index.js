import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/LoginScreen.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/RegisterScreen.vue')
    },
    {
        path: '/restaurants',
        name: 'Restaurants',
        component: () => import(/* webpackChunkName: "restaurants" */ '../views/RestaurantsScreen.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import(/* webpackChunkName: "pagenotfound" */ '../views/PageNotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
