<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800">
    
    <nav class="bg-blue-900 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-black tracking-tight hidden md:block">PANEL ADMINISTRATIVO</h1>
        
        <router-link 
          to="/admin/acceso"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-green-500/20 border border-green-400"
        >
          <span class="text-lg">📷</span>
          TERMINAL DE ACCESO
        </router-link>
      </div>

      <div class="flex items-center gap-4">
        <div class="text-right hidden md:block">
          <p class="text-sm font-bold">{{ usuario.nombre }}</p>
          <p class="text-xs text-blue-200">Administrador</p>
        </div>
        <button 
          @click="logout" 
          class="bg-red-500/20 hover:bg-red-600 text-white p-2 rounded-lg transition border border-red-500/30"
          title="Cerrar Sesión"
        >
          🚪
        </button>
      </div>
    </nav>

    <main class="p-6 max-w-7xl mx-auto">
      
      <div class="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 rounded-t-lg font-bold text-sm transition-all relative top-[1px]"
          :class="activeTab === tab.id 
            ? 'bg-white text-blue-700 border-x border-t border-gray-200 shadow-sm' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'"
        >
          {{ tab.name }}
        </button>
      </div>

      <div v-if="activeTab === 'dashboard'" class="animate-fade-in-up">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Clientes</p>
              <p class="text-4xl font-black text-gray-800 mt-2">{{ reportes.total_clientes || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">👥</div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Entrenando Ahora</p>
              <p class="text-4xl font-black text-green-600 mt-2">{{ reportes.clientes_entrenando_ahora || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">💪</div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Pagos Registrados</p>
              <p class="text-4xl font-black text-purple-600 mt-2">{{ reportes.total_transacciones || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl">💳</div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'clientes'" class="animate-fade-in-up">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 class="font-bold text-gray-700 text-lg">Base de Datos de Clientes</h2>
            <span class="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold border border-blue-200">
              {{ clientes.length }} Registrados
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-gray-500 uppercase bg-white border-b">
                <tr>
                  <th class="px-6 py-4">Cliente</th>
                  <th class="px-6 py-4">Membresía</th>
                  <th class="px-6 py-4">Código QR</th>
                  <th class="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="c in clientes" :key="c.idCliente" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="font-bold text-gray-900">{{ c.nombre }}</div>
                    <div class="text-xs text-gray-500">{{ c.email }} • {{ c.telefono }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="c.tipoCliente === 'SUSCRIPTOR' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-600 border-gray-200'" class="px-3 py-1 rounded-full text-xs font-bold border">
                      {{ c.tipoCliente }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <img 
                      :src="`http://localhost:8080/api/clientes/${c.idCliente}/qr`" 
                      class="w-10 h-10 border rounded p-1 bg-white cursor-pointer hover:scale-[4] hover:shadow-xl transition z-10 relative"
                      title="Clic para ampliar"
                      @click="verQr(c.idCliente)"
                    />
                  </td>
                  <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button 
                      @click="abrirModalPago(c)"
                      class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-bold border border-green-200 transition flex items-center gap-1"
                    >
                      💲 Pagar
                    </button>
                    <button 
                      @click="eliminarCliente(c.idCliente)" 
                      class="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-bold border border-red-200 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'personal'" class="animate-fade-in-up">
        <div class="flex justify-end mb-6">
          <button @click="mostrarFormEntrenador = !mostrarFormEntrenador" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition">
            {{ mostrarFormEntrenador ? 'Cancelar' : '+ Nuevo Entrenador' }}
          </button>
        </div>
        <div v-if="mostrarFormEntrenador" class="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 shadow-inner">
          <h3 class="font-bold text-blue-900 mb-4">Contratar Entrenador</h3>
          <form @submit.prevent="crearEntrenador" class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input v-model="nuevoEntrenador.nombre" placeholder="Nombre Completo" required class="p-3 border border-blue-200 rounded-lg" />
            <input v-model="nuevoEntrenador.email" type="email" placeholder="Correo" required class="p-3 border border-blue-200 rounded-lg" />
            <input v-model="nuevoEntrenador.password" type="password" placeholder="Contraseña" required class="p-3 border border-blue-200 rounded-lg" />
            <input v-model="nuevoEntrenador.especialidad" placeholder="Especialidad" class="p-3 border border-blue-200 rounded-lg" />
            <button type="submit" class="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 md:col-span-4 transition shadow-md">Guardar</button>
          </form>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="e in entrenadores" :key="e.idEntrenador" class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🏋️</div>
              <button @click="eliminarEntrenador(e.idEntrenador)" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition">🗑️</button>
            </div>
            <h3 class="font-bold text-lg text-gray-900">{{ e.nombre }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ e.email }}</p>
            <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">{{ e.especialidad || 'General' }}</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'maquinas'" class="animate-fade-in-up">
        <div class="flex justify-end mb-6">
          <button @click="mostrarFormMaquina = !mostrarFormMaquina" class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition">
            {{ mostrarFormMaquina ? 'Cancelar' : '+ Nueva Máquina' }}
          </button>
        </div>
        <div v-if="mostrarFormMaquina" class="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-8 shadow-inner">
          <h3 class="font-bold text-purple-900 mb-4">Registrar Equipo</h3>
          <form @submit.prevent="crearMaquina" class="flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1 w-full">
              <label class="block text-xs font-bold text-purple-800 mb-1">Nombre</label>
              <input v-model="nuevaMaquina.nombre" class="w-full p-3 border border-purple-200 rounded-lg" required placeholder="Ej: Caminadora" />
            </div>
            <div class="flex-1 w-full">
              <label class="block text-xs font-bold text-purple-800 mb-1">Estado</label>
              <select v-model="nuevaMaquina.estado" class="w-full p-3 border border-purple-200 rounded-lg bg-white">
                <option value="DISPONIBLE">Disponible</option>
                <option value="MANTENIMIENTO">En Mantenimiento</option>
              </select>
            </div>
            <button type="submit" class="w-full md:w-auto bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 shadow-md transition">Agregar</button>
          </form>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 border-b text-gray-500 uppercase text-xs">
              <tr>
                <th class="p-4">Nombre</th>
                <th class="p-4">Tipo</th>
                <th class="p-4">Estado</th>
                <th class="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in maquinas" :key="m.idMaquina" class="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td class="p-4 font-bold text-gray-800">{{ m.nombre }}</td>
                <td class="p-4 text-gray-500">{{ m.tipo || 'General' }}</td>
                <td class="p-4">
                  <span :class="m.estado === 'DISPONIBLE' ? 'text-green-700 bg-green-100 border-green-200' : 'text-red-700 bg-red-100 border-red-200'" class="px-3 py-1 rounded-full text-xs font-bold border">
                    {{ m.estado }}
                  </span>
                </td>
                <td class="p-4 text-right space-x-3">
                  <button @click="cambiarEstadoMaquina(m)" class="text-blue-600 font-bold text-xs hover:underline">Cambiar Estado</button>
                  <button @click="eliminarMaquina(m.idMaquina)" class="text-red-500 font-bold text-xs hover:text-red-700">Borrar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <div v-if="mostrarModalPago" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        <div class="bg-gradient-to-r from-green-600 to-green-500 p-5 text-white flex justify-between items-center">
          <h3 class="font-bold text-lg flex items-center gap-2"><span>💸</span> Registrar Pago</h3>
          <button @click="cerrarModalPago" class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition">✕</button>
        </div>

        <div class="p-6 bg-gray-50">
          <div class="flex items-center justify-between mb-6 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <div>
              <p class="text-xs text-gray-500 uppercase font-bold">Cliente</p>
              <p class="text-gray-900 font-bold text-lg">{{ clienteSeleccionado.nombre }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500 uppercase font-bold">ID</p>
              <p class="text-gray-900 font-mono">#{{ clienteSeleccionado.idCliente }}</p>
            </div>
          </div>

          <form @submit.prevent="procesarPago" class="space-y-5">
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Tipo de Servicio</label>
              <select v-model="formPago.concepto" @change="actualizarMonto" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm transition font-medium">
                <option value="DIARIO">🎟️ Visita Diaria ($3.000)</option>
                <option value="MENSUAL">⭐ Mensualidad ($80.000)</option>
              </select>
            </div>

            <div v-if="formPago.concepto === 'DIARIO'" class="animate-fade-in">
              <label class="flex items-center gap-3 p-3 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                <input type="checkbox" v-model="usarMaquinaExtra" @change="actualizarMonto" class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span class="text-sm font-bold text-blue-800">Incluir Máquina Extra (+$3.000)</span>
              </label>
            </div>

            <div v-if="usarMaquinaExtra && formPago.concepto === 'DIARIO'" class="animate-fade-in">
              <label class="block text-sm font-bold text-gray-700 mb-2">Seleccionar Máquina</label>
              <select v-model="formPago.idMaquina" class="w-full p-3 border border-gray-300 rounded-xl bg-white shadow-sm">
                <option :value="null" disabled>-- Elige máquina --</option>
                <option v-for="m in maquinas" :key="m.idMaquina" :value="m.idMaquina">
                  {{ m.nombre }} ({{ m.tipo }})
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Total a Cobrar</label>
              <div class="relative">
                <span class="absolute left-4 top-3 text-gray-500 text-lg font-bold">$</span>
                <input v-model="formPago.monto" type="number" class="w-full pl-8 p-3 border border-gray-300 rounded-xl font-mono font-black text-2xl text-green-700 bg-white shadow-inner focus:ring-2 focus:ring-green-500" readonly />
              </div>
            </div>

            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 transition transform hover:scale-[1.02] flex justify-center items-center gap-2">
              <span>CONFIRMAR PAGO</span>
              <span>➞</span>
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const usuario = ref({});
const activeTab = ref('dashboard');

// Datos
const reportes = ref({});
const clientes = ref([]);
const entrenadores = ref([]);
const maquinas = ref([]);

// Estado Formularios
const mostrarFormEntrenador = ref(false);
const mostrarFormMaquina = ref(false);
const nuevoEntrenador = ref({ nombre: '', email: '', password: '', especialidad: '' });
const nuevaMaquina = ref({ nombre: '', tipo: 'Fuerza', estado: 'DISPONIBLE' });

// Estado Pago
const mostrarModalPago = ref(false);
const clienteSeleccionado = ref({});
const usarMaquinaExtra = ref(false); 
const formPago = ref({ idCliente: null, concepto: 'DIARIO', monto: 3000, idMaquina: null });

const tabs = [
  { id: 'dashboard', name: '📊 Resumen' },
  { id: 'clientes', name: '👥 Clientes' },
  { id: 'personal', name: '🏋️ Personal' },
  { id: 'maquinas', name: '⚙️ Inventario' }
];

onMounted(async () => {
  const userStored = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');
  
  if (!userStored || !token) { router.push('/login'); return; }
  
  usuario.value = JSON.parse(userStored);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  await cargarTodo();
});

const cargarTodo = async () => {
  try {
    const [rep, cli, ent, maq] = await Promise.all([
      api.get('/reportes/dashboard'),
      api.get('/clientes'),
      api.get('/entrenadores'),
      api.get('/maquinas')
    ]);
    reportes.value = rep.data;
    clientes.value = cli.data;
    entrenadores.value = ent.data;
    maquinas.value = maq.data;
  } catch (e) {
    if (e.response && (e.response.status === 401 || e.response.status === 403)) logout();
  }
};

const verQr = (id) => window.open(`http://localhost:8080/api/clientes/${id}/qr`, '_blank');
const eliminarCliente = async (id) => {
  if(!confirm('¿Eliminar cliente permanentemente?')) return;
  try { await api.delete(`/clientes/${id}`); await cargarTodo(); } catch(e) { alert('Error al eliminar'); }
};

const abrirModalPago = (c) => {
  clienteSeleccionado.value = c;
  usarMaquinaExtra.value = false;
  formPago.value = { idCliente: c.idCliente, concepto: 'DIARIO', monto: 3000, idMaquina: null };
  mostrarModalPago.value = true;
};
const cerrarModalPago = () => mostrarModalPago.value = false;

const actualizarMonto = () => {
  if (formPago.value.concepto === 'DIARIO') {
    formPago.value.monto = 3000 + (usarMaquinaExtra.value ? 3000 : 0);
  } else if (formPago.value.concepto === 'MENSUAL') {
    formPago.value.monto = 80000;
    usarMaquinaExtra.value = false;
  }
};

const procesarPago = async () => {
  if (usarMaquinaExtra.value && !formPago.value.idMaquina) {
    alert("Por favor selecciona qué máquina usará."); return;
  }

  try {
    if (formPago.value.concepto === 'DIARIO' && usarMaquinaExtra.value) {
       await api.post('/pagos', { 
         idCliente: formPago.value.idCliente, 
         concepto: 'DIARIO', 
         monto: 3000 
       });
       await api.post('/pagos', { 
         idCliente: formPago.value.idCliente, 
         concepto: 'EXTRA', 
         monto: 3000,
         idMaquina: formPago.value.idMaquina 
       });
    } else {
       await api.post('/pagos', formPago.value);
    }
    
    alert('✅ Pago registrado con éxito');
    cerrarModalPago();
    await cargarTodo(); 
  } catch(e) {
    console.error(e);
    alert('Error al procesar pago');
  }
};

const crearEntrenador = async () => {
  try { await api.post('/entrenadores', nuevoEntrenador.value); mostrarFormEntrenador.value = false; await cargarTodo(); } catch(e) { alert('Error'); }
};
const eliminarEntrenador = async (id) => {
  if(!confirm('¿Despedir entrenador?')) return;
  try { await api.delete(`/entrenadores/${id}`); await cargarTodo(); } catch(e) { alert('Error'); }
};

const crearMaquina = async () => {
  try { await api.post('/maquinas', nuevaMaquina.value); mostrarFormMaquina.value = false; await cargarTodo(); } catch(e) { alert('Error'); }
};
const cambiarEstadoMaquina = async (m) => {
  const nuevo = m.estado === 'DISPONIBLE' ? 'MANTENIMIENTO' : 'DISPONIBLE';
  try { await api.put(`/maquinas/${m.idMaquina}`, { ...m, estado: nuevo }); await cargarTodo(); } catch(e) { alert('Error'); }
};
const eliminarMaquina = async (id) => {
  if(!confirm('¿Borrar máquina?')) return;
  try { await api.delete(`/maquinas/${id}`); await cargarTodo(); } catch(e) { alert('Error'); }
};


const logout = () => { 
  localStorage.clear(); 
  router.push('/'); 
};
</script>

<style>
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>