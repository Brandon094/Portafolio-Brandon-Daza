/**
 * @file main.tsx
 * @description Punto de entrada e inicialización de la aplicación (Client-Side Entry Point).
 * En la arquitectura web moderna de Vite, este archivo representa el primer fragmento de código JavaScript
 * ejecutado por el navegador. Se encarga de enganchar y renderizar el árbol de componentes virtuales de React (`App`)
 * sobre el nodo físico del DOM (`#root`). Adicionalmente, orquesta las capacidades de PWA (Progressive Web App)
 * registrando un Service Worker dinámico para soportar almacenamiento en caché y trabajo sin conexión.
 *
 * Brandon, como Diseñador Técnico Principal, nota cómo encapsular el arranque de la app bajo `<React.StrictMode>`
 * audita de forma proactiva tu código en busca de efectos secundarios obsoletos o malas prácticas durante el desarrollo.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/global.css' // Importación central del sistema de estilos unificado de Tailwind CSS

// Registro dinámico para inyectar capacidades PWA y evitar errores si el bundle de Vite no está en modo producción
import { registerSW } from 'virtual:pwa-register'

// Inicialización de las estrategias de Service Worker (Caché local, precarga y notificaciones de actualización)
registerSW({
  onNeedRefresh() {
    // Alerta al usuario mediante confirmación si hay un nuevo compilado (build) disponible en producción
    if (confirm('Nueva actualización disponible. ¿Desea recargar?')) {
      window.location.reload()
    }
  },
  onOfflineReady() {
    // Flag de auditoría técnica en la consola para confirmar soporte Offline-First listo
    console.log('Aplicación lista para trabajar sin conexión.')
  },
})

// Bootstrap del árbol virtual de React fijado al contenedor maestro index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
