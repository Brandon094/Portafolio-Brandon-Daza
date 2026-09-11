# Especificación de Arquitectura de Software v7.5

## 1. Visión General
El sistema es una **Progressive Web App (PWA)** de grado industrial, diseñada para la visualización técnica y el marketing estratégico de activos digitales. La arquitectura v7.5 introduce el concepto de **Functional Preview Strategy**, separando la imagen promocional (Banner) de las capturas de auditoría interna.

---

## 2. Patrones de Diseño Arquitectónico

### 2.1 MVVM (Model-View-ViewModel)
- **Model:** Firebase Realtime Database para latencia mínima.
- **ViewModel:** Hooks personalizados que encapsulan la lógica de sincronización y analíticas.
- **View:** Componentes atómicos (React 18) encargados de la representación visual.

### 2.2 Functional Preview Pattern
Las tarjetas de proyecto (`ProjectCard`) implementan un patrón de previsualización estática:
- **Feature Graphic:** Muestra el gráfico de funciones principal.
- **Internal Gallery:** Reservada para el `ProjectModal`, optimizando la carga inicial de la galería.

---

## 3. Arquitectura de Datos y Estado

### 3.1 Gestión de Activos (Projects)
La base de datos gestiona dos tipos de activos visuales por proyecto:
1. `featureGraphic`: Imagen de portada de alta fidelidad (16:9).
2. `images[]`: Array de capturas de pantalla de la interfaz real para inspección profunda.

### 3.2 Telemetría en Tiempo Real
Sincronización bidireccional entre el cliente y el Centro de Mando v4.5, permitiendo el monitoreo de señales globales instantáneamente.

---

## 4. Ingeniería de Performance y UX

### 4.1 Visual Depth Protocol (Modales)
El `ProjectModal` implementa un protocolo de visualización adaptativa:
- **Object Contain:** Garantiza que las capturas móviles (verticales) no se recorten.
- **Blur Ambient Background:** Capa secundaria desenfocada que rellena el espacio negativo del modal según el color de la captura activa.

### 4.2 Scanner Engine
Uso de animaciones CSS (`keyframes scan`) y SVG dinámicos para simular un análisis técnico sobre los gráficos de funciones en las tarjetas.

---

## 5. Infraestructura y Despliegue

### 5.1 Despliegue en Firebase Hosting
Optimizado para una distribución global mediante CDN con HTTPS y Service Workers activos para soporte offline.

**Arquitecto Responsable:** Brandon Daza  
**Empresa:** ChopCode Solutions  
**Fecha:** Septiembre 2026
