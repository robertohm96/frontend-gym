import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

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
    path: '/registro-cliente',
    name: 'RegistroCliente',
    component: () => import('../views/RegistroCliente.vue')
  },


  { 
    path: '/admin', 
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u && u.rol === 'ADMIN') next(); else next('/login');
    }
  },


  {
    path: '/admin/acceso',
    name: 'ControlAcceso',
    component: () => import('../views/ControlAcceso.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u && u.rol === 'ADMIN') next(); else next('/login');
    }
  },
  

  { 
    path: '/perfil', 
    name: 'ClienteDashboard',
    component: () => import('../views/ClienteDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u && u.rol === 'CLIENTE') next(); else next('/login');
    }
  },


  { 
    path: '/entrenador', 
    name: 'EntrenadorDashboard',
    component: () => import('../views/EntrenadorDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u && u.rol === 'ENTRENADOR') next(); else next('/login');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;