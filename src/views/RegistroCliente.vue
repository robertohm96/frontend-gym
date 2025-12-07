<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Únete a Perfect Body Gym
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Inicia sesión aquí
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        
        <form @submit.prevent="registrarUsuario" class="space-y-6">
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <div class="mt-1">
              <input 
                v-model="formulario.nombre" 
                type="text" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ej. Juan Pérez"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <div class="mt-1">
              <input 
                v-model="formulario.email" 
                type="email" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="juan@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Teléfono / Celular</label>
            <div class="mt-1">
              <input 
                v-model="formulario.telefono" 
                type="tel" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="300 123 4567"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Contraseña</label>
            <div class="mt-1">
              <input 
                v-model="formulario.password" 
                type="password" 
                required 
                minlength="6"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ errorMsg }}</h3>
              </div>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="cargando"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ cargando ? 'Creando cuenta...' : 'Registrarme' }}
            </button>
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

const formulario = ref({
  nombre: '',
  email: '',
  password: '',
  telefono: '',
  tipoCliente: 'DIARIO' // Valor por defecto obligatorio para que el backend no falle
});

const registrarUsuario = async () => {
  cargando.value = true;
  errorMsg.value = '';

  try {
    // Enviamos los datos al backend (ClienteControlador)
    await api.post('/clientes', formulario.value);
    
    // Si sale bien, redirigimos al login con un mensaje (o alerta)
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    router.push('/login');
    
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      errorMsg.value = 'Este correo ya está registrado.';
    } else {
      errorMsg.value = 'Ocurrió un error al registrar. Intenta nuevamente.';
    }
  } finally {
    cargando.value = false;
  }
};
</script>