<template>
  <div class="font-sans antialiased text-gray-900 bg-black">
    
    <!-- Navbar con efecto glassmorphism -->
    <nav class="fixed w-full z-50 top-0 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="relative">
          <div class="absolute inset-0 bg-blue-500 blur-xl opacity-50"></div>
          <div class="relative text-white font-black text-2xl tracking-widest uppercase">
            Perfect Body <span class="text-blue-400">Gym</span>
          </div>
        </div>
        <div class="space-x-4">
          <router-link 
            to="/login" 
            class="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wide border border-white/20"
          >
            Acceso Miembros
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section con parallax y gradientes animados -->
    <header class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background con overlay animado -->
      <div class="absolute inset-0 z-0">
        <img :src="bgImage" alt="Gym Background" class="w-full h-full object-contain object-center scale-60 transition-transform duration-[20000ms] ease-in-out hover:scale-95" />
        <div class="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-black opacity-90"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <!-- Efectos de luz animados -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div class="relative z-10 text-center px-4 max-w-6xl mx-auto mt-20 opacity-0 translate-y-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <!-- Badge animado -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 mb-8 animate-pulse">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span class="text-blue-300 text-sm font-semibold">GIMNASIO INTELIGENTE</span>
        </div>

        <h1 class="text-6xl md:text-8xl font-black text-white mb-8 leading-none">
          <span class="inline-block">TRANSFORMA</span><br>
          <span class="inline-block">TU </span>
          <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600">
            CUERPO
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
          Lorica, Córdoba. Entrena con tecnología QR, monitoreo en tiempo real y equipos de última generación.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link 
            to="/registro-cliente"
            class="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              EMPEZAR AHORA
              <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>
          
          <router-link 
            to="/login"
            class="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-bold rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:border-white"
          >
            YA TENGO CUENTA
          </router-link>
        </div>

        <!-- Stats decorativos -->
        <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20">
          <div class="text-center">
            <div class="text-4xl font-black text-blue-400 mb-2">500+</div>
            <div class="text-gray-400 text-sm uppercase tracking-wider">Miembros</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-black text-cyan-400 mb-2">24/7</div>
            <div class="text-gray-400 text-sm uppercase tracking-wider">Acceso</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-black text-purple-400 mb-2">100%</div>
            <div class="text-gray-400 text-sm uppercase tracking-wider">Equipado</div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div class="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </header>

    <!-- Status Card Flotante con efecto 3D -->
    <div class="relative z-30 -mt-32 px-4 pb-32">
      <div class="max-w-5xl mx-auto">
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-2xl hover:scale-[1.02]">
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            
            <!-- Status Info -->
            <div class="flex-1 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Estado en Vivo</span>
              </div>
              
              <h2 class="text-4xl font-black text-white flex items-center justify-center md:justify-start gap-4 mb-2">
                <span class="relative flex h-5 w-5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="bgPunto"></span>
                  <span class="relative inline-flex rounded-full h-5 w-5" :class="bgPunto"></span>
                </span>
                {{ mensajeEstado }}
              </h2>
              <p class="text-gray-500 text-sm">Actualización automática cada 10 segundos</p>
            </div>

            <!-- Divider -->
            <div class="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

            <!-- Ocupación Display -->
            <div class="flex-1 text-center">
              <div class="relative inline-block">
                <div class="absolute inset-0 blur-2xl opacity-50" :class="bgPunto"></div>
                <span class="relative text-7xl font-black tabular-nums tracking-tighter bg-clip-text text-transparent bg-gradient-to-br" :class="gradientEstado">
                  {{ ocupacion }}
                </span>
                <div class="absolute -top-3 -right-8 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" :class="badgeEstado">
                  Live
                </div>
              </div>
              <p class="text-gray-400 font-semibold mt-3 text-lg">Personas Entrenando</p>
              
              <!-- Barra de progreso -->
              <div class="mt-4 w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="barraEstado"
                  :style="{ width: `${Math.min((ocupacion / 60) * 100, 100)}%` }"
                ></div>
              </div>
              <p class="text-gray-600 text-xs mt-2">Capacidad: 60 personas</p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Features Section con cards mejoradas -->
    <section class="py-24 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      
      <!-- Background decorativo -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-black text-white mb-6">
            ¿Por qué <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Perfect Body?</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología de vanguardia para una experiencia de entrenamiento superior
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Card 1 -->
          <div class="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/50">
                ⚡
              </div>
              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">Acceso Instantáneo QR</h3>
              <p class="text-gray-400 leading-relaxed">
                Tu smartphone es tu llave. Código QR único para entrada rápida y segura. Adiós a las tarjetas físicas.
              </p>
            </div>

            <!-- Efecto decorativo -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>

          <!-- Card 2 -->
          <div class="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-green-500/50">
                📊
              </div>
              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">Monitoreo en Tiempo Real</h3>
              <p class="text-gray-400 leading-relaxed">
                Consulta la ocupación antes de salir. Entrena cómodo evitando horas pico. Datos actualizados cada 10 segundos.
              </p>
            </div>

            <div class="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>

          <!-- Card 3 -->
          <div class="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-purple-500/50">
                💪
              </div>
              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">Entrenadores Certificados</h3>
              <p class="text-gray-400 leading-relaxed">
                Rutinas personalizadas en tu perfil. Seguimiento profesional y asesoría experta para alcanzar tus metas.
              </p>
            </div>

            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg_width=%2760%27_height=%2760%27_viewBox=%270_0_60_60%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg_fill=%27none%27_fill-rule=%27evenodd%27%3E%3Cg_fill=%27%23ffffff%27_fill-opacity=%271%27%3E%3Cpath_d=%27M36_34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6_34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6_4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 class="text-5xl md:text-6xl font-black text-white mb-6">
          Comienza Tu Transformación Hoy
        </h2>
        <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Únete a cientos de personas que ya están alcanzando sus objetivos
        </p>
        <router-link 
          to="/registro-cliente"
          class="inline-block px-12 py-6 bg-white text-blue-600 font-black rounded-full text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          REGISTRARME GRATIS
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-white py-16 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h4 class="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              PERFECT BODY GYM
            </h4>
            <p class="text-gray-400 mb-4">Lorica, Córdoba, Colombia</p>
            <p class="text-gray-500 text-sm">El gimnasio más moderno de la región</p>
          </div>

          <div>
  <h5 class="font-bold text-lg mb-4 text-white">Enlaces Rápidos</h5>
  <div class="space-y-2">
    <router-link to="/planes" class="block text-gray-400 hover:text-blue-400 transition-colors duration-300">
      Planes y Precios
    </router-link>
    <router-link to="/horarios" class="block text-gray-400 hover:text-blue-400 transition-colors duration-300">
      Horarios
    </router-link>
    <router-link to="/ubicacion" class="block text-gray-400 hover:text-blue-400 transition-colors duration-300">
      Ubicación
    </router-link>
  </div>
</div>

          <div>
            <h5 class="font-bold text-lg mb-4 text-white">Síguenos</h5>
            <div class="flex gap-4">
              <a href="https://www.instagram.com/perfectbodygymlorica/" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/perfectbodygymlorica/" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div class="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2025 Perfect Body Gym. Todos los derechos reservados. | Diseño Moderno & Tecnología Avanzada
        </div>

      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import api from '../services/api';
import bgImage from '../assets/perfectbody.png';

const ocupacion = ref(0);
let interval = null;

const fetchOcupacion = async () => {
  try {
    const res = await api.get('/asistencias/ocupacion');
    ocupacion.value = res.data;
  } catch (error) {
    console.error("Error obteniendo ocupación");
  }
};

const colorEstado = computed(() => {
  if (ocupacion.value < 20) return 'text-green-400';
  if (ocupacion.value < 40) return 'text-yellow-400';
  return 'text-red-400';
});

const bgPunto = computed(() => {
  if (ocupacion.value < 20) return 'bg-green-500';
  if (ocupacion.value < 40) return 'bg-yellow-500';
  return 'bg-red-500';
});

const gradientEstado = computed(() => {
  if (ocupacion.value < 20) return 'from-green-400 to-emerald-400';
  if (ocupacion.value < 40) return 'from-yellow-400 to-orange-400';
  return 'from-red-400 to-pink-400';
});

const badgeEstado = computed(() => {
  if (ocupacion.value < 20) return 'bg-green-500/20 text-green-400 border border-green-500/30';
  if (ocupacion.value < 40) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  return 'bg-red-500/20 text-red-400 border border-red-500/30';
});

const barraEstado = computed(() => {
  if (ocupacion.value < 20) return 'bg-gradient-to-r from-green-500 to-emerald-500';
  if (ocupacion.value < 40) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
  return 'bg-gradient-to-r from-red-500 to-pink-500';
});

const mensajeEstado = computed(() => {
  if (ocupacion.value < 20) return 'Libre para Entrenar';
  if (ocupacion.value < 40) return 'Afluencia Moderada';
  return 'Gimnasio Lleno';
});

onMounted(() => {
  fetchOcupacion();
  interval = setInterval(fetchOcupacion, 10000);
});

onUnmounted(() => clearInterval(interval));
</script>