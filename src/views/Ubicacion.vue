<template>
  <div class="min-h-screen bg-gray-50 font-sans flex flex-col">
    
    <nav class="bg-blue-900 text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="font-black text-xl tracking-widest uppercase">Perfect Body <span class="text-blue-400">Gym</span></div>
        <router-link to="/" class="text-sm font-bold hover:text-blue-300 transition">← Volver al Inicio</router-link>
      </div>
    </nav>

    <div class="flex-grow relative">
      <div class="absolute inset-0 z-0">
        <iframe 
          width="100%" 
          height="100%" 
          style="border:0" 
          loading="lazy" 
          allowfullscreen 
          referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=9.231190,-75.814268&z=17&output=embed">
        </iframe>
      </div>

      <div class="absolute bottom-0 md:top-20 md:left-20 md:bottom-auto w-full md:w-96 bg-white/90 backdrop-blur-md p-8 shadow-2xl md:rounded-3xl border border-white/20 z-10">
        <h1 class="text-3xl font-black text-gray-900 mb-6 uppercase">Ubicación</h1>
        
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl shrink-0">📍</div>
            <div>
              <h3 class="font-bold text-gray-800">Dirección Principal</h3>
              <p class="text-gray-600">Cra. 25 #7A-82 P2</p>
              <p class="text-gray-600">Santa Cruz de Lorica, Córdoba</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl shrink-0">📱</div>
            <div>
              <h3 class="font-bold text-gray-800">Contacto</h3>
              <p class="text-gray-600">+57 300 123 4567</p>
            </div>
          </div>

          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=9.231190,-75.814268" 
            target="_blank"
            class="block w-full py-3 bg-blue-600 text-white font-bold text-center rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            CÓMO LLEGAR
          </a>
        </div>
      </div>
    </div>
  </div>
</template>