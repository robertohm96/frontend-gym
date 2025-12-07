<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    
    <nav class="bg-blue-900 text-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">👤</div>
          <div>
            <h1 class="font-bold text-lg leading-tight">{{ usuario.nombre }}</h1>
            <p class="text-xs text-blue-200 uppercase tracking-wider">{{ usuario.tipoCliente }}</p>
          </div>
        </div>
        <button @click="logout" class="bg-red-500/20 hover:bg-red-500/40 text-red-100 px-4 py-2 rounded-lg text-sm font-bold transition">
          Salir
        </button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 py-8">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden text-center sticky top-8">
            <div class="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
              <h2 class="text-white font-black text-xl tracking-tight uppercase">Mi Pase de Acceso</h2>
              <p class="text-blue-100 text-xs mt-1">Escanea para entrar/salir</p>
            </div>
            
            <div class="p-8 flex flex-col items-center">
              <div class="p-4 border-4 border-dashed border-gray-200 rounded-2xl bg-gray-50 mb-4">
                <img 
                  v-if="usuario.idCliente"
                  :src="`http://localhost:8080/api/clientes/${usuario.idCliente}/qr`" 
                  alt="QR Personal"
                  class="w-48 h-48 mix-blend-multiply"
                />
              </div>
              <p class="text-xs text-gray-400 font-medium uppercase tracking-wide">ID: #{{ usuario.idCliente }}</p>
            </div>

            <div v-if="usuario.tipoCliente === 'SUSCRIPTOR'" class="border-t border-gray-100 p-4 bg-blue-50/50">
              <div v-if="suscripcionActiva">
                <p class="text-gray-500 text-xs font-bold uppercase mb-1">Suscripción Vence:</p>
                <p class="text-blue-800 font-bold text-lg">{{ suscripcionActiva.fechaFin }}</p>
                <span class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">ACTIVA</span>
              </div>
              <div v-else>
                <p class="text-red-500 font-bold text-sm">Sin suscripción activa</p>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          
          <div class="flex gap-4 mb-6 border-b border-gray-200 pb-1">
            <button 
              @click="pestana = 'rutinas'"
              class="pb-3 px-2 font-bold text-sm transition-colors relative"
              :class="pestana === 'rutinas' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
            >
              MIS RUTINAS
              <div v-if="pestana === 'rutinas'" class="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
            </button>
            <button 
              @click="pestana = 'historial'"
              class="pb-3 px-2 font-bold text-sm transition-colors relative"
              :class="pestana === 'historial' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
            >
              HISTORIAL & PAGOS
              <div v-if="pestana === 'historial'" class="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
            </button>
          </div>

          <div v-if="pestana === 'rutinas'" class="space-y-6 animate-fade-in-up">
            <div v-if="rutinas.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div class="text-4xl mb-3">📋</div>
              <h3 class="text-gray-800 font-bold">Sin rutinas asignadas</h3>
              <p class="text-gray-500 text-sm">Pide a tu entrenador que te asigne un plan.</p>
            </div>

            <div v-for="rutina in rutinas" :key="rutina.idRutina" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-gray-800">Plan Asignado: {{ rutina.fechaAsignacion }}</h3>
                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold">
                  Entrenador: {{ rutina.entrenador ? rutina.entrenador.nombre : 'Staff' }}
                </span>
              </div>
              <div class="p-6">
                <p class="text-gray-600 whitespace-pre-line">{{ rutina.descripcion }}</p>
              </div>
            </div>
          </div>

          <div v-if="pestana === 'historial'" class="space-y-8 animate-fade-in-up">
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 class="font-bold text-gray-700">Historial de Pagos</h3>
              </div>
              <table class="w-full text-sm text-left">
                <thead class="text-gray-500 bg-gray-50/50">
                  <tr>
                    <th class="px-6 py-3">Fecha</th>
                    <th class="px-6 py-3">Concepto</th>
                    <th class="px-6 py-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="pago in pagos" :key="pago.idPago">
                    <td class="px-6 py-3 text-gray-600">{{ pago.fecha }}</td>
                    <td class="px-6 py-3 font-medium text-gray-800">{{ pago.concepto }}</td>
                    <td class="px-6 py-3 text-right font-bold text-green-600">${{ pago.monto }}</td>
                  </tr>
                  <tr v-if="pagos.length === 0">
                    <td colspan="3" class="text-center py-6 text-gray-400">No hay pagos registrados</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 class="font-bold text-gray-700">Registro de Asistencia</h3>
              </div>
              <table class="w-full text-sm text-left">
                <thead class="text-gray-500 bg-gray-50/50">
                  <tr>
                    <th class="px-6 py-3">Fecha</th>
                    <th class="px-6 py-3">Hora Entrada</th>
                    <th class="px-6 py-3">Hora Salida</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="asis in asistencias" :key="asis.idAsistencia">
                    <td class="px-6 py-3 text-gray-600">{{ new Date(asis.entrada).toLocaleDateString() }}</td>
                    <td class="px-6 py-3 text-blue-600 font-medium">{{ new Date(asis.entrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</td>
                    <td class="px-6 py-3 text-gray-500">
                      {{ asis.salida ? new Date(asis.salida).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--' }}
                    </td>
                  </tr>
                  <tr v-if="asistencias.length === 0">
                    <td colspan="3" class="text-center py-6 text-gray-400">No has registrado asistencia aún</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const usuario = ref({});
const pestana = ref('rutinas'); // Pestaña activa por defecto

const rutinas = ref([]);
const pagos = ref([]);
const asistencias = ref([]);
const suscripcionActiva = ref(null);

onMounted(async () => {
  const storedUser = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');

  if (!storedUser || !token) {
    router.push('/login');
    return;
  }

  usuario.value = JSON.parse(storedUser);
  // Re-aplicar token por si se recargó la página
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  await cargarDatosCliente();
});

const cargarDatosCliente = async () => {
  const id = usuario.value.idCliente;
  try {
    // 1. Obtener Rutinas
    const resRutinas = await api.get(`/rutinas/cliente/${id}`);
    rutinas.value = resRutinas.data;

    // 2. Obtener Pagos (Endpoint Nuevo)
    const resPagos = await api.get(`/pagos/cliente/${id}`);
    pagos.value = resPagos.data;

    // 3. Obtener Asistencias (Endpoint Nuevo)
    const resAsis = await api.get(`/asistencias/cliente/${id}`);
    asistencias.value = resAsis.data;

    // 4. Buscar Suscripción Activa (Si aplica)
    if (usuario.value.tipoCliente === 'SUSCRIPTOR') {
      const resSusc = await api.get(`/suscripciones/cliente/${id}`);
      // Filtramos la que esté ACTIVA
      suscripcionActiva.value = resSusc.data.find(s => s.estado === 'ACTIVA') || null;
    }

  } catch (error) {
    console.error("Error cargando datos del perfil", error);
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
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