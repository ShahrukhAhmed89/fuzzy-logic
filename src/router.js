import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Categories from './views/Categories.vue';
import Product from './views/Product.vue';


Vue.use(Router);

export default new Router({
  // mode: 'history',
  // scrollBehavior() {
  //   return { x: 0, y: 0 };
  // },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category/:slug',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/product/:id',
      name: 'productPage',
      component: Product,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Product.vue'),
    },
  ],

});
