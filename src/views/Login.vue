<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-blue-900 mb-6">Iniciar Sesión</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <div>
          <label class="block text-gray-700 font-bold mb-2">Soy un:</label>
          <select v-model="rol" class="w-full px-4 py-2 border rounded-lg bg-gray-50">
            <option value="admin">Administrador / Dueño</option>
            <option value="cliente">Cliente / Deportista</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg" placeholder="usuario@gym.com" />
        </div>
        
        <div>
          <label class="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-lg" placeholder="********" />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center font-bold">
          {{ error }}
        </div>

        <button type="submit" class="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition" :disabled="cargando">
          {{ cargando ? 'Verificando...' : 'Ingresar' }}
        </button>
      </form>
      
      <div class="mt-4 text-center">
        <router-link to="/" class="text-sm text-gray-500 hover:text-blue-700">← Volver al inicio</router-link>
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
const rol = ref('cliente'); // Por defecto cliente
const error = ref('');
const cargando = ref(false);
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  cargando.value = true;
  
  // Definimos la URL según el rol seleccionado
  let endpoint = '';
  if (rol.value === 'admin') endpoint = '/administradores/login';
  if (rol.value === 'cliente') endpoint = '/clientes/login';
  if (rol.value === 'entrenador') endpoint = '/entrenadores/login';

  try {
    const response = await api.post(endpoint, {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      // Guardamos usuario y rol
      const datosUsuario = { ...response.data, rol: rol.value };
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));

      // Redirección inteligente
      if (rol.value === 'admin') router.push('/admin');
      if (rol.value === 'cliente') router.push('/perfil'); // <-- Nueva vista
      if (rol.value === 'entrenador') router.push('/entrenador'); // <-- Nueva vista
    }
  } catch (err) {
    console.error(err);
    error.value = 'Credenciales incorrectas.';
  } finally {
    cargando.value = false;
  }
};
</script>