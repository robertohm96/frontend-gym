<template>
  <div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
    <h1 class="text-4xl font-bold text-blue-900 mb-8">Perfect Body Gym</h1>
    
    <div class="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">Estado de Ocupación</h2>
      
      <div class="text-6xl font-black mb-4" :class="colorEstado">
        {{ ocupacion }}
      </div>
      
      <p class="text-gray-600 uppercase tracking-widest font-bold">
        Personas entrenando ahora
      </p>

      <div class="mt-6 p-4 rounded-lg" :class="bgEstado">
        <span class="text-white font-bold">{{ mensajeEstado }}</span>
      </div>
    </div>

    <router-link to="/login" class="mt-8 text-blue-600 hover:underline">
      Acceso para Administradores
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import api from '../services/api';

const ocupacion = ref(0);
let interval = null;

const fetchOcupacion = async () => {
  try {
    const res = await api.get('/asistencias/ocupacion');
    ocupacion.value = res.data;
  } catch (error) {
    console.error("Error al obtener ocupación", error);
    // Valor simulado por si el backend está apagado
    ocupacion.value = 0; 
  }
};

const colorEstado = computed(() => {
  if (ocupacion.value < 20) return 'text-green-500';
  if (ocupacion.value < 40) return 'text-yellow-500';
  return 'text-red-500';
});

const bgEstado = computed(() => {
  if (ocupacion.value < 20) return 'bg-green-500';
  if (ocupacion.value < 40) return 'bg-yellow-500';
  return 'bg-red-500';
});

const mensajeEstado = computed(() => {
  if (ocupacion.value < 20) return 'Baja - ¡Es un buen momento!';
  if (ocupacion.value < 40) return 'Media - Afluencia normal';
  return 'Alta - Gimnasio casi lleno';
});

onMounted(() => {
  fetchOcupacion();
  interval = setInterval(fetchOcupacion, 30000);
});

onUnmounted(() => clearInterval(interval));
</script>