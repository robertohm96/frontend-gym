<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    
    <nav class="bg-blue-900 text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="font-black text-xl tracking-widest uppercase">Perfect Body <span class="text-blue-400">Gym</span></div>
        <router-link to="/" class="text-sm font-bold hover:text-blue-300 transition">← Volver al Inicio</router-link>
      </div>
    </nav>

    <div class="py-20 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 mb-4">Invierte en Ti</h1>
          <p class="text-xl text-gray-500">Elige el plan que se adapte a tus objetivos.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:scale-105 transition duration-300 relative z-10">
            <h3 class="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4">Pago Diario</h3>
            <div class="flex items-baseline mb-8">
              <span class="text-5xl font-black text-gray-900">$3.000</span>
              <span class="text-gray-500 ml-2">/ día</span>
            </div>
            
            <ul class="space-y-4 mb-8">
              <li class="flex items-center gap-3 text-gray-700">
                <span class="text-green-500 text-xl">✓</span> Acceso a zona de musculación
              </li>
              <li class="flex items-center gap-3 text-gray-700">
                <span class="text-green-500 text-xl">✓</span> Acceso a máquinas generales
              </li>
              <li class="flex items-center gap-3 text-gray-700">
                <span class="text-green-500 text-xl">✓</span> Casilleros disponibles
              </li>
              <li class="flex items-center gap-3 text-gray-400">
                <span class="text-gray-300 text-xl">✕</span> Sin uso de caminadoras (Costo extra)
              </li>
            </ul>

            <router-link to="/login" class="block w-full py-4 text-center font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
              EMPEZAR HOY
            </router-link>
          </div>

          <div class="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-10 shadow-2xl border border-blue-500/30 transform md:scale-110 relative z-20">
            <div class="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-2xl">MÁS POPULAR</div>
            
            <h3 class="text-blue-400 font-bold uppercase tracking-wider text-sm mb-4">Suscripción Mensual</h3>
            <div class="flex items-baseline mb-8">
              <span class="text-6xl font-black">$80.000</span>
              <span class="text-gray-400 ml-2">/ mes</span>
            </div>
            
            <ul class="space-y-4 mb-8">
              <li class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">✓</span>
                <span class="font-bold">Acceso Ilimitado a todo el gimnasio</span>
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="text-blue-500 text-xl">✓</span> Uso de caminadoras SIN CARGO extra
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="text-blue-500 text-xl">✓</span> Rutinas Personalizadas por Entrenador
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="text-blue-500 text-xl">✓</span> Seguimiento de progreso
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="text-blue-500 text-xl">✓</span> Acceso rápido con QR
              </li>
            </ul>

            <router-link to="/registro-cliente" class="block w-full py-4 text-center font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition">
              SUSCRIBIRME AHORA
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>