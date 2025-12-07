import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

// Definimos las rutas de la aplicación
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    // Cargamos este componente solo cuando se necesita (Lazy loading)
    component: () => import('../views/AdminDashboard.vue'),
    // Protección básica: Si no hay usuario guardado, manda al login
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('usuario')) {
        next('/login');
      } else {
        next();
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;