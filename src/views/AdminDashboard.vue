<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-blue-900 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 class="text-xl font-bold">Panel Administrativo - Perfect Body Gym</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm">Hola, {{ usuario.nombre }}</span>
        <button 
          @click="logout" 
          class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>

    <main class="p-8 max-w-7xl mx-auto">
      
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 class="text-gray-500 text-sm font-bold uppercase">Total Clientes</h3>
          <p class="text-4xl font-black text-gray-800">{{ reportes.total_clientes || 0 }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 class="text-gray-500 text-sm font-bold uppercase">Transacciones</h3>
          <p class="text-4xl font-black text-gray-800">{{ reportes.total_transacciones || 0 }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
          <h3 class="text-gray-500 text-sm font-bold uppercase">Entrenando Ahora</h3>
          <p class="text-4xl font-black text-gray-800">{{ reportes.clientes_entrenando_ahora || 0 }}</p>
        </div>
      </section>

      <section class="bg-white rounded-xl shadow overflow-hidden">
        <div class="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 class="text-lg font-bold text-gray-700">Listado de Clientes</h2>
          <button 
            @click="mostrarFormulario = !mostrarFormulario"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-sm"
          >
            {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Cliente' }}
          </button>
        </div>

        <div v-if="mostrarFormulario" class="p-6 bg-blue-50 border-b">
          <form @submit.prevent="registrarCliente" class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input v-model="nuevoCliente.nombre" placeholder="Nombre Completo" required class="p-2 border rounded" />
            <input v-model="nuevoCliente.email" placeholder="Email" type="email" required class="p-2 border rounded" />
            <input v-model="nuevoCliente.telefono" placeholder="Teléfono" class="p-2 border rounded" />
            <select v-model="nuevoCliente.tipoCliente" class="p-2 border rounded">
              <option value="DIARIO">Pago Diario</option>
              <option value="SUSCRIPTOR">Suscriptor Mensual</option>
            </select>
            <button type="submit" class="bg-green-600 text-white font-bold py-2 rounded md:col-span-4 hover:bg-green-700">
              Guardar Cliente
            </button>
          </form>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-gray-600 text-sm uppercase">
                <th class="p-4">ID</th>
                <th class="p-4">Nombre</th>
                <th class="p-4">Tipo</th>
                <th class="p-4">Código QR</th> <th class="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="cliente in clientes" :key="cliente.idCliente" class="hover:bg-gray-50">
                <td class="p-4 font-bold text-gray-500">#{{ cliente.idCliente }}</td>
                <td class="p-4">
                  <div class="font-bold text-gray-800">{{ cliente.nombre }}</div>
                  <div class="text-xs text-gray-500">{{ cliente.email }}</div>
                </td>
                <td class="p-4">
                  <span :class="cliente.tipoCliente === 'SUSCRIPTOR' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'" class="px-2 py-1 rounded text-xs font-bold">
                    {{ cliente.tipoCliente }}
                  </span>
                </td>
                <td class="p-4">
                   <img 
                    :src="`http://localhost:8080/api/clientes/${cliente.idCliente}/qr`" 
                    class="w-12 h-12 border rounded p-1 hover:scale-150 transition bg-white cursor-pointer"
                    title="Clic para descargar/ver grande"
                    @click="verQrGrande(cliente.idCliente)"
                   />
                </td>
                <td class="p-4">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-bold mr-2">Ver Perfil</button>
                </td>
              </tr>
              <tr v-if="clientes.length === 0">
                <td colspan="5" class="p-8 text-center text-gray-500">No hay clientes registrados aún.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const usuario = ref({});
const reportes = ref({});
const clientes = ref([]);
const mostrarFormulario = ref(false);

const nuevoCliente = ref({
  nombre: '',
  email: '',
  telefono: '',
  tipoCliente: 'DIARIO'
});

// Cargar datos al entrar
onMounted(async () => {
  // 1. Verificar Usuario Local
  const userStored = localStorage.getItem('usuario');
  if (userStored) {
    usuario.value = JSON.parse(userStored);
  }

  await cargarDashboard();
});

const cargarDashboard = async () => {
  try {
    // 2. Obtener Reportes Generales
    const resReporte = await api.get('/reportes/dashboard');
    reportes.value = resReporte.data;

    // 3. Obtener Lista de Clientes
    const resClientes = await api.get('/clientes');
    clientes.value = resClientes.data;
  } catch (error) {
    console.error("Error cargando dashboard:", error);
    if (error.response && error.response.status === 401) logout();
  }
};

const registrarCliente = async () => {
  try {
    await api.post('/clientes', nuevoCliente.value);
    alert('Cliente registrado con éxito');
    mostrarFormulario.value = false;
    nuevoCliente.value = { nombre: '', email: '', telefono: '', tipoCliente: 'DIARIO' };
    await cargarDashboard(); // Recargar la tabla
  } catch (error) {
    alert('Error al registrar: ' + error.message);
  }
};

const verQrGrande = (id) => {
    window.open(`http://localhost:8080/api/clientes/${id}/qr`, '_blank');
};

const logout = () => {
  localStorage.removeItem('usuario');
  router.push('/login');
};
</script>