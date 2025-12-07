<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800">
    
    <nav class="bg-blue-900 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">🏋️‍♂️</div>
        <div>
          <h1 class="font-bold text-lg leading-tight">{{ usuario.nombre }}</h1>
          <p class="text-xs text-blue-200 uppercase tracking-wider font-semibold">Panel de Entrenador</p>
        </div>
      </div>
      <button @click="logout" class="bg-red-500/20 hover:bg-red-500/40 text-red-100 px-4 py-2 rounded-lg text-sm font-bold transition border border-red-500/30">
        Cerrar Sesión
      </button>
    </nav>

    <main class="max-w-7xl mx-auto p-6">
      
      <div class="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h2 class="text-3xl font-black text-gray-800">Gestión de Atletas</h2>
          <p class="text-gray-500 mt-1">Asigna y actualiza los planes de entrenamiento.</p>
        </div>
        <div class="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 text-blue-800 font-bold text-sm">
          {{ clientesSuscriptores.length }} Suscriptores Activos
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="cliente in clientesSuscriptores" :key="cliente.idCliente" 
             class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group relative overflow-hidden">
          
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-6xl select-none">💪</div>
          
          <div class="relative z-10">
            <h3 class="font-bold text-xl text-gray-900 mb-1">{{ cliente.nombre }}</h3>
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-4">ID: #{{ cliente.idCliente }}</p>
            
            <div class="space-y-2 mb-6">
               <p class="text-sm text-gray-600 flex items-center gap-2">
                 <span>📧</span> {{ cliente.email }}
               </p>
               <p class="text-sm text-gray-600 flex items-center gap-2">
                 <span>📱</span> {{ cliente.telefono }}
               </p>
            </div>

            <button @click="abrirGestionRutinas(cliente)" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition flex justify-center items-center gap-2">
              <span>📋</span> GESTIONAR RUTINAS
            </button>
          </div>
        </div>
      </div>

      <div v-if="clientesSuscriptores.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <div class="text-4xl mb-4">🔍</div>
        <p class="text-gray-500 font-medium">No hay clientes con suscripción activa en este momento.</p>
      </div>

    </main>

    <div v-if="mostrarModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        
        <div class="bg-gray-900 p-6 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 class="font-bold text-xl">Plan de Entrenamiento</h3>
            <p class="text-gray-400 text-sm">Cliente: <span class="text-white font-bold">{{ clienteSeleccionado.nombre }}</span></p>
          </div>
          <button @click="cerrarModal" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">✕</button>
        </div>

        <div class="flex-1 flex overflow-hidden">
          
          <div class="w-1/2 p-6 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>✏️</span> {{ editandoId ? 'Editar Rutina Existente' : 'Crear Nueva Rutina' }}
            </h4>
            
            <form @submit.prevent="guardarRutina" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción del Plan</label>
                <textarea 
                  v-model="formRutina.descripcion" 
                  rows="12"
                  required
                  placeholder="Ej: Lunes: Pecho y Tríceps...&#10;Martes: Espalda y Bíceps..."
                  class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none text-sm leading-relaxed"
                ></textarea>
              </div>
              
              <div class="flex gap-3">
                <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition">
                  {{ editandoId ? '💾 ACTUALIZAR' : '➕ ASIGNAR' }}
                </button>
                <button v-if="editandoId" type="button" @click="cancelarEdicion" class="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition">
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <div class="w-1/2 p-6 overflow-y-auto bg-white">
            <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📚</span> Historial de Rutinas
            </h4>

            <div v-if="rutinasCliente.length === 0" class="text-center py-10 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
              Sin rutinas asignadas aún.
            </div>

            <div class="space-y-4">
              <div v-for="rutina in rutinasCliente" :key="rutina.idRutina" 
                   class="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition group relative">
                
                <div class="flex justify-between items-start mb-2">
                  <span class="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
                    {{ new Date(rutina.fechaAsignacion).toLocaleDateString() }}
                  </span>
                  <button @click="cargarParaEditar(rutina)" class="text-xs font-bold text-blue-600 hover:underline">
                    Editar ✏️
                  </button>
                </div>
                
                <p class="text-sm text-gray-600 whitespace-pre-line line-clamp-4 group-hover:line-clamp-none transition-all">
                  {{ rutina.descripcion }}
                </p>
                <div class="mt-2 pt-2 border-t border-gray-100">
                  <span class="text-[10px] text-gray-400 uppercase font-bold">Por: {{ rutina.entrenador ? rutina.entrenador.nombre : 'Staff' }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const usuario = ref({});
const clientes = ref([]);

// Estado para el modal y rutinas
const mostrarModal = ref(false);
const clienteSeleccionado = ref(null);
const rutinasCliente = ref([]);
const formRutina = ref({ descripcion: '' });
const editandoId = ref(null);

onMounted(async () => {
  const userStored = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');
  
  if (!userStored || !token) { router.push('/login'); return; }
  
  usuario.value = JSON.parse(userStored);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  await cargarClientes();
});

// Filtrar solo los que son SUSCRIPTORES (los de plan diario no llevan rutina)
const clientesSuscriptores = computed(() => {
  return clientes.value.filter(c => c.tipoCliente === 'SUSCRIPTOR');
});

const cargarClientes = async () => {
  try {
    const res = await api.get('/clientes');
    clientes.value = res.data;
  } catch (e) {
    console.error(e);
    if(e.response && e.response.status === 403) logout();
  }
};

const abrirGestionRutinas = async (cliente) => {
  clienteSeleccionado.value = cliente;
  await cargarRutinas(cliente.idCliente);
  cancelarEdicion(); // Limpiar formulario
  mostrarModal.value = true;
};

const cargarRutinas = async (idCliente) => {
  try {
    const res = await api.get(`/rutinas/cliente/${idCliente}`);
    // Ordenar por fecha descendente (la más nueva primero)
    rutinasCliente.value = res.data.sort((a, b) => new Date(b.fechaAsignacion) - new Date(a.fechaAsignacion));
  } catch (e) {
    console.error("Error cargando rutinas", e);
  }
};

const guardarRutina = async () => {
  if (!formRutina.value.descripcion.trim()) return;

  const payload = {
    descripcion: formRutina.value.descripcion,
    cliente: { idCliente: clienteSeleccionado.value.idCliente },
    entrenador: { idEntrenador: usuario.value.idEntrenador } // ¡Importante! Enlazar al entrenador actual
  };

  try {
    if (editandoId.value) {
      // ACTUALIZAR
      await api.put(`/rutinas/${editandoId.value}`, payload);
      alert('Rutina actualizada correctamente');
    } else {
      // CREAR NUEVA
      await api.post('/rutinas', payload);
      alert('Rutina asignada correctamente');
    }
    
    // Recargar lista y limpiar
    await cargarRutinas(clienteSeleccionado.value.idCliente);
    cancelarEdicion();

  } catch (e) {
    console.error(e);
    alert('Error al guardar la rutina');
  }
};

const cargarParaEditar = (rutina) => {
  editandoId.value = rutina.idRutina;
  formRutina.value.descripcion = rutina.descripcion;
};

const cancelarEdicion = () => {
  editandoId.value = null;
  formRutina.value = { descripcion: '' };
};

const cerrarModal = () => {
  mostrarModal.value = false;
  clienteSeleccionado.value = null;
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>

<style>
.animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>