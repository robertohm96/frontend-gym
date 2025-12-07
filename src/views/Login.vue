<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-black/80 z-10"></div>
        </div>

    <div class="relative z-20 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
      
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-gray-800 uppercase tracking-tighter">Bienvenido</h2>
        <p class="text-gray-500 text-sm mt-1">Ingresa tus credenciales para acceder</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div>
          <label class="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
            placeholder="ejemplo@correo.com" 
          />
        </div>
        
        <div>
          <label class="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
            placeholder="••••••••" 
          />
        </div>

        <div v-if="error" class="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
          <span class="text-red-500 text-xl">⚠️</span>
          <p class="text-red-600 text-sm font-bold">{{ error }}</p>
        </div>

        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="cargando"
        >
          <span v-if="cargando" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validando...
          </span>
          <span v-else>INICIAR SESIÓN</span>
        </button>
      </form>
      
      <div class="mt-6 text-center pt-6 border-t border-gray-100">
        <p class="text-sm text-gray-500 mb-2">¿Aún no eres miembro?</p>
        <router-link to="/registro-cliente" class="text-blue-600 font-bold hover:text-blue-800 hover:underline transition">
          Regístrate Gratis Aquí
        </router-link>
      </div>
      
      <div class="mt-4 text-center">
        <router-link to="/" class="text-xs text-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-1">
          ← Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const email = ref('');
const password = ref('');
const error = ref('');
const cargando = ref(false);
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  cargando.value = true;
  
  try {
    // CORRECCIÓN PRINCIPAL: Apuntamos SIEMPRE al AuthController
    // Ya no usamos /clientes/login ni /administradores/login
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      const datosRespuesta = response.data;
      
      // Guardamos TODO en localStorage (Token + Datos usuario)
      localStorage.setItem('token', datosRespuesta.token); // Guardamos el token aparte por comodidad
      localStorage.setItem('usuario', JSON.stringify({
        ...datosRespuesta.usuario,
        rol: datosRespuesta.rol
      }));

      api.defaults.headers.common['Authorization'] = `Bearer ${datosRespuesta.token}`;

      const rol = datosRespuesta.rol;
      if (rol === 'ADMIN') router.push('/admin');
      else if (rol === 'CLIENTE') router.push('/perfil');
      else if (rol === 'ENTRENADOR') router.push('/entrenador'); // (Si existe la ruta)
      else router.push('/'); // Fallback
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 403) {
      error.value = 'Contraseña o correo incorrectos.';
    } else {
      error.value = 'Error de conexión con el servidor.';
    }
  } finally {
    cargando.value = false;
  }
};
</script>