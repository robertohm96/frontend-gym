<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="absolute inset-0 bg-black/80 z-10"></div>

    <div class="relative z-20 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
      
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-gray-800 uppercase tracking-tighter">Bienvenido</h2>
        <p class="text-gray-500 text-sm mt-1">Ingresa tus credenciales</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div>
          <label class="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="tu@correo.com" 
          />
        </div>
        
        <div>
          <label class="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="••••••••" 
          />
        </div>

        <div v-if="error" class="p-4 rounded-lg bg-red-100 border-l-4 border-red-500 text-red-700">
          <p class="font-bold">Error</p>
          <p class="text-sm">{{ error }}</p>
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
          :disabled="cargando"
        >
          <span v-if="cargando">Conectando con servidor...</span>
          <span v-else>INICIAR SESIÓN</span>
        </button>
      </form>
      
      <div class="mt-6 text-center pt-6 border-t border-gray-100">
        <router-link to="/registro-cliente" class="text-blue-600 font-bold hover:underline">
          ¿No tienes cuenta? Regístrate aquí
        </router-link>
      </div>
      
      <div class="mt-4 text-center">
        <router-link to="/" class="text-xs text-gray-400 hover:text-gray-600">
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
  
  console.log("Intentando login con:", email.value); // Debug en consola (F12)

  try {
    // Petición al backend
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    console.log("Respuesta recibida:", response); // Debug en consola

    if (response.status === 200) {
      const datos = response.data;
      
      // Guardar sesión
      localStorage.setItem('token', datos.token);
      localStorage.setItem('usuario', JSON.stringify({
        ...datos.usuario,
        rol: datos.rol
      }));

      // Configurar token para futuras peticiones
      api.defaults.headers.common['Authorization'] = `Bearer ${datos.token}`;

      // Redirección
      if (datos.rol === 'ADMIN') router.push('/admin');
      else if (datos.rol === 'CLIENTE') router.push('/perfil');
      else if (datos.rol === 'ENTRENADOR') router.push('/entrenador');
      else router.push('/');
    }
  } catch (err) {
    console.error("Error en login:", err); // Ver error real en consola
    
    if (err.code === "ERR_NETWORK") {
      error.value = "No se pudo conectar con el servidor. ¿El Backend está corriendo?";
    } else if (err.response && err.response.status === 403) {
      error.value = "Correo o contraseña incorrectos.";
    } else {
      error.value = "Error técnico: " + (err.message || "Desconocido");
    }
  } finally {
    cargando.value = false; // Esto asegura que el botón se desbloquee
  }
};
</script>