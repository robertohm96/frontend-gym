<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    
    <nav class="bg-blue-900 text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="font-black text-xl tracking-widest uppercase">Perfect Body <span class="text-blue-400">Gym</span></div>
        <router-link to="/" class="text-sm font-bold hover:text-blue-300 transition">← Volver al Inicio</router-link>
      </div>
    </nav>

    <main class="flex-grow flex items-center justify-center p-6">
      <div class="max-w-4xl w-full">
        
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase">Horarios de Entrenamiento</h1>
          <p class="text-xl text-gray-500">Entrena a tu ritmo, en el momento que prefieras.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 text-blue-600">📅</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Lunes a Viernes</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span class="font-bold text-gray-700">Mañana</span>
                <span class="text-blue-600 font-black">5:00 AM - 11:00 AM</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span class="font-bold text-gray-700">Tarde/Noche</span>
                <span class="text-blue-600 font-black">2:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 backdrop-blur-sm">⚡</div>
            <h2 class="text-2xl font-bold mb-6">Sábados</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <span class="font-bold text-blue-100">Jornada Única</span>
                <span class="text-white font-black">5:00 AM - 11:00 AM</span>
              </div>
            </div>
            
            <p class="mt-8 text-sm text-blue-200">Domingos y Festivos: Cerrado por descanso muscular 💪</p>
          </div>

        </div>
      </div>
    </main>

    <footer class="bg-gray-900 text-white py-8 text-center text-sm text-gray-500">
      <p>© 2025 Perfect Body Gym</p>
    </footer>
  </div>
</template>