<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h2 class="text-3xl font-black text-gray-900 tracking-tight uppercase">
        Únete al Equipo
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Empieza tu transformación hoy mismo
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl shadow-gray-200 sm:rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden">
        
        <div v-if="registroExitoso" class="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span class="text-4xl">🎉</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido a bordo!</h3>
          <p class="text-gray-500 mb-8 px-4">
            Tu cuenta ha sido creada exitosamente. <br>
            <span class="text-blue-600 font-bold block mt-2">Redirigiendo al login...</span>
          </p>
          <router-link 
            to="/login"
            class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-500/30 block"
          >
            IR A INICIAR SESIÓN AHORA
          </router-link>
        </div>

        <form v-else @submit.prevent="registrarUsuario" class="space-y-5">
          
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
            <input 
              v-model="formulario.nombre" 
              type="text" 
              required 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              v-model="formulario.email" 
              type="email" 
              required 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
              <input 
                v-model="formulario.telefono" 
                type="tel" 
                required 
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="300..."
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
              <input 
                v-model="formulario.password" 
                type="password" 
                required 
                minlength="6"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="******"
              />
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-lg bg-red-50 p-3 border border-red-100 flex items-start gap-2">
            <span class="text-red-500 mt-0.5">⚠️</span>
            <p class="text-sm font-medium text-red-800">{{ errorMsg }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="cargando"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all"
          >
            {{ cargando ? 'Registrando...' : 'CREAR CUENTA' }}
          </button>

          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              ¿Ya tienes cuenta?
              <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Inicia sesión aquí
              </router-link>
            </p>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const cargando = ref(false);
const errorMsg = ref('');
const registroExitoso = ref(false);

const formulario = ref({
  nombre: '',
  email: '',
  password: '',
  telefono: '',
  tipoCliente: 'DIARIO'
});

const registrarUsuario = async () => {
  cargando.value = true;
  errorMsg.value = '';

  try {
    await api.post('/clientes', formulario.value);
    
    // Activar pantalla de éxito
    registroExitoso.value = true;
    
    // REDIRECCIÓN AUTOMÁTICA EN 3 SEGUNDOS
    setTimeout(() => {
      router.push('/login');
    }, 3000);
    
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      errorMsg.value = 'Este correo electrónico ya está registrado. Intenta con otro o inicia sesión.';
    } else {
      errorMsg.value = 'Hubo un problema técnico. Por favor intenta de nuevo más tarde.';
    }
  } finally {
    cargando.value = false;
  }
};
</script>