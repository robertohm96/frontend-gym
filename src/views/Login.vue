<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-blue-900 mb-6">Acceso Administrativo</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@perfectbody.com"
          />
        </div>
        
        <div>
          <label class="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center font-semibold">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition duration-300"
          :disabled="cargando"
        >
          {{ cargando ? 'Verificando...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <div class="mt-4 text-center">
        <router-link to="/" class="text-sm text-gray-500 hover:text-blue-700">
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
    // Consumimos el endpoint que creamos en AdministradorControlador.java
    const response = await api.post('/administradores/login', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      // Guardamos los datos del admin en localStorage para saber quién es
      localStorage.setItem('usuario', JSON.stringify(response.data));
      // Redirigimos al Dashboard
      router.push('/admin');
    }
  } catch (err) {
    console.error(err);
    error.value = 'Credenciales incorrectas. Intenta de nuevo.';
  } finally {
    cargando.value = false;
  }
};
</script>