import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes = [
  // --- RUTA PÚBLICA: INICIO ---
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  
  // --- RUTA PÚBLICA: LOGIN ---
  { 
    path: '/login', 
    name: 'Login', 
    component: Login 
  },

  // RUTA PÚBLICA: REGISTRO
  {
    path: '/registro-cliente',
    name: 'RegistroCliente',
    component: () => import('../views/RegistroCliente.vue')
  },

  // RUTA PROTEGIDA: PANEL ADMINISTRADOR
  { 
    path: '/admin', 
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
    
      if (u && u.rol === 'ADMIN') next(); else next('/login');
    }
  },

  // RUTA PROTEGIDA: TERMINAL DE ACCESO (ESCÁNER)
  {
    path: '/admin/acceso',
    name: 'ControlAcceso',
    component: () => import('../views/ControlAcceso.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u && u.rol === 'ADMIN') next(); else next('/login');
    }
  },
  
  // RUTA PROTEGIDA: PERFIL CLIENTE
  { 
    path: '/perfil', 
    name: 'ClienteDashboard',
    component: () => import('../views/ClienteDashboard.vue'),
    beforeEnter: (to, from, next) => {
      const u = JSON.parse(localStorage.getItem('usuario'));
      // Verificamos rol en MAYÚSCULAS
      if (u && u.rol === 'CLIENTE') next(); else next('/login');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;