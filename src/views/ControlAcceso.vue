<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    
    <router-link to="/admin" class="absolute top-6 left-6 z-20 bg-gray-800/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-700 transition">
      ← Salir
    </router-link>

    <div class="w-full max-w-md relative z-10">
      
      <div class="text-center mb-6">
        <h1 class="text-2xl font-black text-white tracking-widest uppercase flex items-center justify-center gap-2">
          <span class="animate-pulse text-red-500">●</span> Terminal de Acceso
        </h1>
        <p class="text-gray-400 text-xs">Apunta la cámara al código QR del cliente</p>
      </div>

      <div class="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 relative min-h-[300px]">
        <div id="reader" class="w-full h-full"></div>
        
        <div class="absolute inset-0 pointer-events-none border-[30px] border-black/30 rounded-3xl"></div>
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,1)] animate-scan pointer-events-none"></div>
      </div>

      <div v-if="mensajeRespuesta" 
           class="mt-6 p-6 rounded-2xl text-center transform transition-all duration-300 shadow-xl border-t-4"
           :class="estado === 'exito' ? 'bg-green-900/80 border-green-500' : 'bg-red-900/80 border-red-500'"
      >
        <div class="text-5xl mb-2">{{ estado === 'exito' ? '✅' : '⛔' }}</div>
        <h2 class="text-2xl font-black text-white uppercase tracking-tight">{{ tituloEstado }}</h2>
        <p class="text-white/90 font-medium text-lg mt-1">{{ mensajeRespuesta }}</p>
      </div>

      <div class="mt-8 border-t border-gray-800 pt-6">
        <p class="text-gray-500 text-xs text-center mb-2 uppercase tracking-wide font-bold">¿Falla la cámara? Ingreso Manual</p>
        <form @submit.prevent="procesarCodigo(codigoManual)" class="flex gap-2">
          <input 
            v-model="codigoManual" 
            type="text" 
            placeholder="Escribe el ID aquí..." 
            class="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 focus:outline-none focus:border-blue-500 transition"
          />
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 rounded-xl transition shadow-lg shadow-blue-900/50"
            :disabled="cargando"
          >
            ENTRAR
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Html5QrcodeScanner } from "html5-qrcode";
import api from '../services/api';

const codigoManual = ref('');
const estado = ref('espera'); // espera, exito, error
const mensajeRespuesta = ref('');
const tituloEstado = ref('');
const cargando = ref(false);
let scanner = null;
let audioExito = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg'); // Sonido simple
let audioError = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

// --- Lógica de Procesamiento ---
const procesarCodigo = async (codigo) => {
  if (cargando.value || !codigo) return;
  
  cargando.value = true;
  // Pausar scanner visualmente si se quiere, o dejarlo correr
  
  try {
    // 1. Llamar al Backend
    const response = await api.post('/asistencias/escanear', null, {
      params: { qrCode: codigo }
    });

    // 2. Éxito
    const asistencia = response.data;
    const nombre = asistencia.cliente ? asistencia.cliente.nombre : 'Cliente';
    const accion = asistencia.estado === 'DENTRO' ? 'BIENVENIDO' : 'HASTA LUEGO';
    
    estado.value = 'exito';
    tituloEstado.value = accion;
    mensajeRespuesta.value = nombre;
    audioExito.play().catch(() => {}); // Sonar beep (si el navegador deja)

  } catch (error) {
    // 3. Error
    estado.value = 'error';
    tituloEstado.value = 'ACCESO DENEGADO';
    audioError.play().catch(() => {});
    
    if (error.response && error.response.data) {
      mensajeRespuesta.value = typeof error.response.data === 'string' 
        ? error.response.data 
        : 'Código no válido.';
    } else {
      mensajeRespuesta.value = 'Error de conexión.';
    }
  } finally {
    cargando.value = false;
    codigoManual.value = '';
    
    // Limpiar mensaje después de 3 segundos para el siguiente
    setTimeout(() => {
      mensajeRespuesta.value = '';
      estado.value = 'espera';
    }, 3000);
  }
};

// --- Configuración del Escáner ---
const onScanSuccess = (decodedText, decodedResult) => {
  // Para evitar lecturas múltiples muy rápidas del mismo código
  if (!cargando.value) {
    console.log(`Código escaneado: ${decodedText}`);
    procesarCodigo(decodedText);
  }
};

onMounted(() => {
  // Configuración de la librería html5-qrcode
  scanner = new Html5QrcodeScanner(
    "reader",
    { 
      fps: 10, // Cuadros por segundo
      qrbox: { width: 250, height: 250 }, // Zona de escaneo
      aspectRatio: 1.0
    },
    /* verbose= */ false
  );
  
  scanner.render(onScanSuccess, (error) => {

  });
});

onUnmounted(() => {
  if (scanner) {
    scanner.clear().catch(error => console.error("Error al limpiar scanner", error));
  }
});
</script>

<style>
/* Animación del láser rojo */
@keyframes scan {
  0% { top: 10%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}
.animate-scan {
  animation: scan 2s linear infinite;
}

#reader__dashboard_section_csr span { display: none !important; }
</style>