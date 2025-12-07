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
      </div>

      <div class="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 relative">
        <div id="reader" style="width: 100%; min-height: 300px; background-color: black;"></div>
        
        <div v-if="!cargando" class="absolute inset-0 pointer-events-none border-[30px] border-black/30 rounded-3xl"></div>
        <div v-if="!cargando" class="absolute top-1/2 left-0 w-full h-0.5 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,1)] animate-scan pointer-events-none"></div>

        <div v-if="cameraError" class="absolute inset-0 flex items-center justify-center bg-gray-900/90 text-white p-6 text-center z-50">
          <div>
            <p class="text-red-400 font-bold text-lg mb-2">⚠ Error de Cámara</p>
            <p class="text-sm text-gray-400">{{ cameraError }}</p>
            <button @click="iniciarScanner" class="mt-4 bg-white text-black px-4 py-2 rounded font-bold text-sm">Reintentar</button>
          </div>
        </div>
      </div>

      <div v-if="mensajeRespuesta" 
           class="mt-6 p-6 rounded-2xl text-center transform transition-all duration-300 shadow-xl border-t-4 animate-fade-in-up"
           :class="estado === 'exito' ? 'bg-green-900/90 border-green-500' : 'bg-red-900/90 border-red-500'"
      >
        <div class="text-5xl mb-2">{{ estado === 'exito' ? '✅' : '⛔' }}</div>
        <h2 class="text-2xl font-black text-white uppercase tracking-tight">{{ tituloEstado }}</h2>
        <p class="text-white/90 font-medium text-lg mt-1">{{ mensajeRespuesta }}</p>
      </div>

      <div class="mt-8 border-t border-gray-800 pt-6">
        <p class="text-gray-500 text-xs text-center mb-2 uppercase tracking-wide font-bold">Ingreso Manual</p>
        <form @submit.prevent="procesarCodigo(codigoManual)" class="flex gap-2">
          <input 
            v-model="codigoManual" 
            type="text" 
            placeholder="ID del cliente..." 
            class="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 focus:outline-none focus:border-blue-500 transition"
            :disabled="cargando"
          />
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 rounded-xl transition shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode } from "html5-qrcode";
import api from '../services/api';

const codigoManual = ref('');
const estado = ref('espera');
const mensajeRespuesta = ref('');
const tituloEstado = ref('');
const cargando = ref(false); // Esta variable actúa como "semáforo"
const cameraError = ref('');
let html5QrCode = null;

// Sonidos (Opcional)
const audioExito = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
const audioError = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const procesarCodigo = async (codigo) => {
  // 1. SEMÁFORO: Si ya estamos procesando uno, ignoramos cualquier otro código
  if (cargando.value || !codigo) return;
  
  cargando.value = true; // Bloqueamos el escáner temporalmente

  try {
    const response = await api.post('/asistencias/escanear', null, {
      params: { qrCode: codigo }
    });

    const asistencia = response.data;
    const nombre = asistencia.cliente ? asistencia.cliente.nombre : 'Cliente';
    const accion = asistencia.estado === 'DENTRO' ? 'BIENVENIDO' : 'HASTA LUEGO';
    
    estado.value = 'exito';
    tituloEstado.value = accion;
    mensajeRespuesta.value = nombre;
    audioExito.play().catch(()=>{});

  } catch (error) {
    estado.value = 'error';
    tituloEstado.value = 'ACCESO DENEGADO';
    if (error.response && error.response.data) {
        mensajeRespuesta.value = typeof error.response.data === 'string' ? error.response.data : 'Código no válido.';
    } else {
        mensajeRespuesta.value = 'Error de conexión o código desconocido.';
    }
    audioError.play().catch(()=>{});
  } finally {
    codigoManual.value = '';
    
    // 2. ENFRIAMIENTO: Esperamos 3 segundos antes de permitir escanear otro
    setTimeout(() => {
      mensajeRespuesta.value = '';
      estado.value = 'espera';
      cargando.value = false; // ¡AQUÍ DESBLOQUEAMOS EL ESCÁNER!
    }, 3000);
  }
};

const iniciarScanner = async () => {
  cameraError.value = '';
  
  try {
    // Permisos explícitos
    await navigator.mediaDevices.getUserMedia({ video: true });

    html5QrCode = new Html5Qrcode("reader");
    
    await html5QrCode.start(
      { facingMode: "environment" }, 
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      (decodedText) => {
          // Callback de éxito: Solo procesa si no estamos ocupados
          if (!cargando.value) {
            console.log("QR Detectado:", decodedText);
            procesarCodigo(decodedText);
          }
      },
      (errorMessage) => {
          // Ignorar errores de "no QR found" en cada frame
      }
    );

  } catch (err) {
    console.error("Error cámara:", err);
    cameraError.value = "No se pudo iniciar la cámara. Verifica permisos.";
  }
};

onMounted(() => {
  iniciarScanner();
});

onUnmounted(async () => {
  if (html5QrCode) {
    try {
      await html5QrCode.stop();
      await html5QrCode.clear();
    } catch (e) {
      console.error("Error al limpiar scanner", e);
    }
  }
});
</script>

<style>
@keyframes scan {
  0% { top: 10%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}
.animate-scan {
  animation: scan 2s linear infinite;
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>