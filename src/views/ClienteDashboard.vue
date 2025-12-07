<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
      <h1 class="text-2xl font-bold text-blue-900 mb-2">Mi Pase de Acceso</h1>
      <p class="text-gray-500 mb-6">Hola, {{ usuario.nombre }}</p>

      <div class="bg-gray-100 p-4 rounded-lg inline-block border-2 border-dashed border-gray-300">
        <img 
          v-if="usuario.idCliente"
          :src="`http://localhost:8080/api/clientes/${usuario.idCliente}/qr`" 
          alt="Tu Código QR"
          class="w-64 h-64"
        />
      </div>
      
      <p class="mt-4 text-sm text-gray-600">
        Muestra este código en la entrada para registrar tu asistencia.
      </p>

      <div class="mt-8 border-t pt-4">
        <h3 class="font-bold text-left mb-2">Mi Plan:</h3>
        <div class="bg-blue-50 p-3 rounded text-left flex justify-between items-center">
          <span class="font-bold text-blue-800">{{ usuario.tipoCliente }}</span>
          <span class="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Activo</span>
        </div>
      </div>

      <button @click="logout" class="mt-8 text-red-500 font-bold hover:underline">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const usuario = ref({});
const router = useRouter();

onMounted(() => {
  const storedUser = localStorage.getItem('usuario');
  if (storedUser) {
    usuario.value = JSON.parse(storedUser);
    // Seguridad básica: si no es cliente, sácalo
    if (usuario.value.rol !== 'cliente') router.push('/login');
  } else {
    router.push('/login');
  }
});

const logout = () => {
  localStorage.removeItem('usuario');
  router.push('/login');
};
</script>