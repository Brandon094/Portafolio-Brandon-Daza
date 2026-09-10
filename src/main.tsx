import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/global.css'

// Registro dinámico para evitar errores de importación si el plugin no está listo
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    if (confirm('Nueva actualización disponible. ¿Desea recargar?')) {
      window.location.reload()
    }
  },
  onOfflineReady() {
    console.log('Aplicación lista para trabajar sin conexión.')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
