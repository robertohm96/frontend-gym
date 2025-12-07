<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    
    <nav class="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">👤</div>
          <div>
            <h1 class="font-bold text-lg leading-tight">{{ usuario.nombre }}</h1>
            <p class="text-xs text-blue-200 uppercase tracking-wider font-semibold">{{ usuario.tipoCliente }}</p>
          </div>
        </div>
        <button @click="logout" class="bg-red-500/20 hover:bg-red-500/40 text-red-100 px-4 py-2 rounded-lg text-sm font-bold transition border border-red-500/30">
          Cerrar Sesión
        </button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 py-8">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1 space-y-6">
          
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-gray-100">
            <div class="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-full bg-white opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 10px 10px;"></div>
              
              <h2 class="text-white font-black text-xl tracking-tight uppercase relative z-10">Mi Pase de Acceso</h2>
              <p class="text-blue-100 text-xs mt-1 relative z-10">Escanea este código al entrar</p>
            </div>
            
            <div class="p-8 flex flex-col items-center">
              <div class="p-4 border-4 border-dashed border-gray-200 rounded-2xl bg-gray-50 mb-4 transition-transform hover:scale-105 duration-300">
                <img 
                  v-if="usuario.idCliente"
                  :src="`http://localhost:8080/api/clientes/${usuario.idCliente}/qr`" 
                  alt="QR Personal"
                  class="w-48 h-48 mix-blend-multiply"
                />
              </div>
              
              <div class="bg-gray-100 px-4 py-1 rounded-full mb-4">
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wide">ID: #{{ usuario.idCliente }}</p>
              </div>

              <button 
                @click="descargarQR"
                class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 hover:underline transition"
              >
                <span>⬇️</span> Descargar Imagen QR
              </button>
            </div>

            <div v-if="usuario.tipoCliente === 'SUSCRIPTOR'" class="border-t border-gray-100 p-4 bg-blue-50/30">
              <div v-if="suscripcionActiva">
                <p class="text-gray-500 text-xs font-bold uppercase mb-1">Tu Plan Vence:</p>
                <p class="text-blue-800 font-black text-lg">{{ formatearFecha(suscripcionActiva.fechaFin) }}</p>
                <div class="mt-2 flex items-center justify-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-green-700 text-xs font-bold uppercase">Suscripción Activa</span>
                </div>
              </div>
              <div v-else>
                <p class="text-red-500 font-bold text-sm flex items-center justify-center gap-2">
                  <span>⚠️</span> Sin suscripción activa
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div class="bg-gray-900 p-4 text-center border-b border-gray-800">
              <h3 class="text-white font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="bgPunto"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3" :class="bgPunto"></span>
                </span>
                Estado del Gimnasio
              </h3>
            </div>
            
            <div class="p-6 text-center">
              <div class="flex items-center justify-center gap-4 mb-2">
                <div class="text-5xl font-black tracking-tighter" :class="colorEstado">
                  {{ ocupacion }}
                </div>
              </div>
              
              <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Personas Entrenando</p>
              
              <div class="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000" :class="bgPunto" :style="{ width: `${Math.min(ocupacion * 2, 100)}%` }"></div>
              </div>

              <div class="inline-block px-4 py-2 rounded-lg bg-gray-50 border border-gray-100 transition-colors duration-500">
                <span class="font-bold text-sm" :class="colorEstado">{{ mensajeEstado }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="md:col-span-2">
          
          <div class="flex gap-6 mb-6 border-b border-gray-200">
            <button 
              @click="pestana = 'historial'"
              class="pb-3 px-1 font-bold text-sm transition-all relative hover:text-blue-600"
              :class="pestana === 'historial' ? 'text-blue-600' : 'text-gray-400'"
            >
              HISTORIAL & PAGOS
              <div v-if="pestana === 'historial'" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full transition-all"></div>
            </button>

            <button 
              v-if="usuario.tipoCliente === 'SUSCRIPTOR'"
              @click="pestana = 'rutinas'"
              class="pb-3 px-1 font-bold text-sm transition-all relative hover:text-blue-600"
              :class="pestana === 'rutinas' ? 'text-blue-600' : 'text-gray-400'"
            >
              MIS RUTINAS
              <div v-if="pestana === 'rutinas'" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full transition-all"></div>
            </button>
          </div>

          <div v-if="pestana === 'historial'" class="space-y-8 animate-fade-in-up">
            
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 class="font-bold text-gray-700 flex items-center gap-2">
                  <span>💳</span> Historial de Pagos
                </h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                  <thead class="text-gray-400 bg-white border-b border-gray-50 text-xs uppercase tracking-wider">
                    <tr>
                      <th class="px-6 py-3 font-semibold">Fecha</th>
                      <th class="px-6 py-3 font-semibold">Concepto</th>
                      <th class="px-6 py-3 text-right font-semibold">Monto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="pago in pagos" :key="pago.idPago" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 text-gray-600 font-medium">{{ formatearFecha(pago.fecha) }}</td>
                      <td class="px-6 py-4">
                        <span class="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">{{ pago.concepto }}</span>
                      </td>
                      <td class="px-6 py-4 text-right font-bold text-gray-800">${{ pago.monto }}</td>
                    </tr>
                    <tr v-if="pagos.length === 0">
                      <td colspan="3" class="text-center py-8 text-gray-400 text-sm">No hay pagos registrados</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h3 class="font-bold text-gray-700 flex items-center gap-2">
                  <span>📍</span> Registro de Accesos
                </h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                  <thead class="text-gray-400 bg-white border-b border-gray-50 text-xs uppercase tracking-wider">
                    <tr>
                      <th class="px-6 py-3 font-semibold">Fecha</th>
                      <th class="px-6 py-3 font-semibold">Entrada</th>
                      <th class="px-6 py-3 font-semibold">Salida</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="asis in asistencias" :key="asis.idAsistencia" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 text-gray-600 font-medium">
                        {{ new Date(asis.entrada).toLocaleDateString('es-CO', {timeZone: 'America/Bogota'}) }}
                      </td>
                      <td class="px-6 py-4 text-green-600 font-bold">
                        {{ new Date(asis.entrada).toLocaleTimeString('es-CO', {hour: '2-digit', minute:'2-digit', timeZone: 'America/Bogota'}) }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 font-medium">
                        {{ asis.salida ? new Date(asis.salida).toLocaleTimeString('es-CO', {hour: '2-digit', minute:'2-digit', timeZone: 'America/Bogota'}) : '--:--' }}
                      </td>
                    </tr>
                    <tr v-if="asistencias.length === 0">
                      <td colspan="3" class="text-center py-8 text-gray-400 text-sm">No has registrado asistencia aún</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <div v-if="pestana === 'rutinas'" class="space-y-6 animate-fade-in-up">
            <div v-if="rutinas.length === 0" class="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📋</div>
              <h3 class="text-gray-800 font-bold text-lg mb-1">Sin rutinas asignadas</h3>
              <p class="text-gray-500 text-sm">Habla con un entrenador para obtener tu plan.</p>
            </div>

            <div v-for="rutina in rutinas" :key="rutina.idRutina" class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div class="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    {{ new Date(rutina.fechaAsignacion).getDate() }}
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 text-sm">Plan de Entrenamiento</h3>
                    <p class="text-xs text-gray-500">{{ formatearFecha(rutina.fechaAsignacion) }}</p>
                  </div>
                </div>
                <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold border border-purple-200">
                  Entrenador: {{ rutina.entrenador ? rutina.entrenador.nombre : 'Staff' }}
                </span>
              </div>
              <div class="p-6">
                <p class="text-gray-600 whitespace-pre-line leading-relaxed text-sm">{{ rutina.descripcion }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import Swal from 'sweetalert2';

const router = useRouter();
const usuario = ref({});
const pestana = ref('historial');

const rutinas = ref([]);
const pagos = ref([]);
const asistencias = ref([]);
const suscripcionActiva = ref(null);

const ocupacion = ref(0);
let interval = null;

const formatearFecha = (fecha) => {
  if (!fecha) return '-';
  const opciones = { 
    timeZone: 'America/Bogota', 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  if (Array.isArray(fecha)) {
    return new Date(fecha[0], fecha[1]-1, fecha[2]).toLocaleDateString('es-CO', opciones);
  }
  return new Date(fecha).toLocaleDateString('es-CO', opciones);
};

onMounted(async () => {
  const storedUser = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');

  if (!storedUser || !token) {
    router.push('/login');
    return;
  }

  usuario.value = JSON.parse(storedUser);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  await cargarDatosCliente();
  
  fetchOcupacion();
  interval = setInterval(fetchOcupacion, 10000);
});

onUnmounted(() => clearInterval(interval));

const cargarDatosCliente = async () => {
  const id = usuario.value.idCliente;
  try {
    if (usuario.value.tipoCliente === 'SUSCRIPTOR') {
        const resRutinas = await api.get(`/rutinas/cliente/${id}`);
        rutinas.value = resRutinas.data;
        
        const resSusc = await api.get(`/suscripciones/cliente/${id}`);
        suscripcionActiva.value = resSusc.data.find(s => s.estado === 'ACTIVA') || null;
    }

    const resPagos = await api.get(`/pagos/cliente/${id}`);
    pagos.value = resPagos.data;

    const resAsis = await api.get(`/asistencias/cliente/${id}`);
    asistencias.value = resAsis.data;

  } catch (error) {
    console.error("Error cargando datos", error);
  }
};

const fetchOcupacion = async () => {
  try {
    const res = await api.get('/asistencias/ocupacion');
    ocupacion.value = res.data;
  } catch (error) {
    console.error("Error ocupación");
  }
};

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

const mensajeEstado = computed(() => {
  if (ocupacion.value < 20) return 'Espacio Libre';
  if (ocupacion.value < 40) return 'Afluencia Media';
  return 'Gimnasio Lleno';
});

const descargarQR = async () => {
  try {
    const response = await api.get(`/clientes/${usuario.value.idCliente}/qr`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `QR-Acceso-${usuario.value.nombre}.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    console.error(e);
    Swal.fire('Error', 'No se pudo descargar el QR', 'error');
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>