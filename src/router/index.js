import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function guardMyRoute(to, from, next) {
  let isAuthenticated = false;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access_token) isAuthenticated = true;
  else isAuthenticated = false;

  if(isAuthenticated) {
      next();
  } else {
      next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    beforeEnter: guardMyRoute,
    component: () => import('../components/Dashboard.vue'),
  },
  {
    path: '/rate/:rate',
    name: 'Rate',
    beforeEnter: guardMyRoute,
    component: () => import('../components/Single.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
