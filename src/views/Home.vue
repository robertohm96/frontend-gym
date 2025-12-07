<template>
  <div class="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
    
    <nav class="absolute w-full z-30 top-0 px-6 py-6 flex justify-between items-center">
      <div class="text-white font-black text-2xl tracking-widest uppercase drop-shadow-md">
        Perfect Body <span class="text-blue-400">Gym</span>
      </div>
      <router-link 
        to="/login" 
        class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-blue-900 transition text-sm uppercase tracking-wide"
      >
        Área Miembros
      </router-link>
    </nav>

    <header class="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="bgImage" alt="Fondo Gym" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-black/30"></div>
      </div>

      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
          TRANSFORMA TU <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            CUERPO Y MENTE
          </span>
        </h1>
        <p class="text-lg md:text-2xl text-gray-200 mb-12 font-light max-w-2xl mx-auto drop-shadow-md">
          Tecnología de punta, acceso QR y control de afluencia en tiempo real en Lorica, Córdoba.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          
          <router-link 
            to="/registro-cliente"
            class="group relative px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-lg shadow-blue-600/50 overflow-hidden transition-all hover:scale-105 hover:shadow-blue-500/70"
          >
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
            <span>¡REGÍSTRATE GRATIS!</span>
          </router-link>

          <router-link 
            to="/login"
            class="px-8 py-4 bg-transparent border-2 border-white/50 text-white text-lg font-bold rounded-full hover:bg-white hover:text-gray-900 transition hover:border-white backdrop-blur-sm"
          >
            Ya tengo cuenta
          </router-link>
        </div>
      </div>
    </header>

    <div class="relative z-20 -mt-24 px-4 pb-20">
      <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-2 md:p-8 flex flex-col md:flex-row items-center border-b-8" :class="borderEstado">
        
        <div class="flex-1 text-center md:text-left p-6">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="bgPunto"></span>
              <span class="relative inline-flex rounded-full h-3 w-3" :class="bgPunto"></span>
            </span>
            <h3 class="text-gray-500 font-bold uppercase text-xs tracking-wider">Estado en Vivo</h3>
          </div>
          
          <h2 class="text-3xl font-black text-gray-800">
            {{ mensajeEstado }}
          </h2>
          <p class="text-gray-400 text-sm mt-1">Actualizado hace unos segundos</p>
        </div>

        <div class="hidden md:block w-px h-24 bg-gray-200 mx-4"></div>

        <div class="flex-1 text-center p-4">
           <div class="inline-flex flex-col items-center">
             <span class="text-7xl font-black tabular-nums tracking-tighter leading-none" :class="colorEstado">
               {{ ocupacion }}
             </span>
             <span class="text-gray-500 font-bold uppercase text-sm mt-2">Personas Entrenando</span>
           </div>
        </div>

      </div>
    </div>

    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div class="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div class="text-4xl mb-4">📱</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Acceso QR</h3>
          <p class="text-gray-600">Entra y sal sin contacto usando tu código personal generado en la web.</p>
        </div>
        <div class="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Sin Esperas</h3>
          <p class="text-gray-600">Revisa la ocupación antes de venir y optimiza tu tiempo de entrenamiento.</p>
        </div>
        <div class="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div class="text-4xl mb-4">💪</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Plan Personalizado</h3>
          <p class="text-gray-600">Tus rutinas asignadas por entrenadores aparecen directo en tu perfil.</p>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-8 border-t border-gray-800 mt-auto">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-center md:text-left">
          <h4 class="font-black text-xl">PERFECT BODY GYM</h4>
          <p class="text-gray-400 text-sm">Lorica, Córdoba, Colombia</p>
        </div>
        <div class="text-gray-500 text-sm">
          © 2025 Todos los derechos reservados.
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import api from '../services/api';
// Asegúrate que la imagen está en esta ruta exacta
import bgImage from '../assets/perfectbody.png';

const ocupacion = ref(0);
let interval = null;

const fetchOcupacion = async () => {
  try {
    const res = await api.get('/asistencias/ocupacion');
    ocupacion.value = res.data;
  } catch (error) {
    console.error("Esperando conexión...");
  }
};

// --- Colores Dinámicos ---
const colorEstado = computed(() => {
  if (ocupacion.value < 20) return 'text-green-500';
  if (ocupacion.value < 40) return 'text-yellow-500';
  return 'text-red-500';
});

const bgPunto = computed(() => {
  if (ocupacion.value < 20) return 'bg-green-500';
  if (ocupacion.value < 40) return 'bg-yellow-500';
  return 'bg-red-500';
});

const borderEstado = computed(() => {
  if (ocupacion.value < 20) return 'border-b-green-500';
  if (ocupacion.value < 40) return 'border-b-yellow-500';
  return 'border-b-red-500';
});

const mensajeEstado = computed(() => {
  if (ocupacion.value < 20) return 'Espacio Libre';
  if (ocupacion.value < 40) return 'Afluencia Media';
  return 'Gimnasio Lleno';
});

onMounted(() => {
  fetchOcupacion();
  interval = setInterval(fetchOcupacion, 5000); 
});

onUnmounted(() => clearInterval(interval));
</script>

<style>
/* Animación de brillo para el botón de registro */
@keyframes shine {
  100% { transform: translateX(100%); }
}
.animate-shine {
  animation: shine 2s infinite;
}
</style>