# Especificación de Arquitectura de Software v5.5

## 1. Visión General
El sistema está diseñado como una **Progressive Web App (PWA)** de alto rendimiento, optimizada para la narrativa inmersiva y la gestión de datos en tiempo real. Se fundamenta en la separación estricta de responsabilidades y la eficiencia en el renderizado de gráficos 2D/3D.

---

## 2. Patrones de Diseño Arquitectónico

### 2.1 MVVM (Model-View-ViewModel)
Para garantizar la escalabilidad y mantenibilidad, se implementó el patrón MVVM utilizando las capacidades modernas de React:
- **Model:** Entidades de datos tipadas en TypeScript (`src/models/`) y persistencia NoSQL en **Firebase Realtime Database**.
- **ViewModel:** Encapsulado en **Custom Hooks** (`src/hooks/`). Estos actúan como mediadores, manejando la lógica de negocio, suscripciones a bases de datos y cálculos de telemetría.
- **View:** Componentes funcionales de React estructurados bajo **Atomic Design**, encargados exclusivamente de la representación visual.

### 2.2 Atomic Design (Diseño Atómico)
La interfaz se descompone en componentes granulares:
- **Atoms:** Componentes base (Botones, Inputs, Badges, Controladores de Scroll).
- **Molecules:** Combinaciones de átomos (Formularios de contacto, Chips de infraestructura).
- **Organisms:** Secciones complejas y autónomas (Navbar, ProjectCard, ScrollStory).
- **Templates/Pages:** Estructuras de layout y rutas de la SPA.

---

## 3. Arquitectura de Datos y Estado

### 3.1 Persistencia Realtime
- **Protocolo:** WebSockets (vía Firebase SDK).
- **Sincronización:** Los cambios en los proyectos o mensajes recibidos en el panel administrativo se reflejan instantáneamente en todos los clientes conectados sin recarga de página.
- **Estrategia Híbrida:** 
    - **RTDB:** Latencia mínima para la suite "Go" y analíticas.
    - **Local Storage:** Persistencia de preferencias de UI y caché de Service Workers.

### 3.2 Seguridad y Acceso
- **Autenticación:** Firebase Auth (Identity Platform).
- **Protección de Rutas:** Implementación de un componente `AuthGuard` de alto nivel que intercepta el ciclo de vida de React para prevenir el acceso no autorizado al Centro de Mando.

---

## 4. Ingeniería de Performance y UX

### 4.1 Pipeline de Animación (GPU Accelerated)
El sistema de **Scrollytelling 3D** utiliza interpolación de valores de scroll mapeados a propiedades CSS aceleradas:
- **Transformaciones:** Uso de `translate3d` y `scale` para forzar el uso de la GPU.
- **Optimización de Memoria:** Factor de escala limitado a 15x para evitar la fragmentación de la memoria en dispositivos móviles.
- **Hardware Hints:** Propiedad `will-change` aplicada estratégicamente para preparar las capas de renderizado del navegador.

### 4.2 Asset Strategy (Estilo Stealth)
- **Zero-HTTP Artifacts:** Uso de **Data URIs (Base64)** para texturas críticas (Grainy Noise), eliminando latencia de red y errores 404.
- **Adaptive Blur:** Filtros de desenfoque dinámicos calculados según la potencia del dispositivo detectado.

---

## 5. Infraestructura y Despliegue

### 5.1 Capacidades PWA
- **Manifest:** Definición de identidad standalone para instalación nativa.
- **Service Workers:** Estrategia de **Stale-While-Revalidate** para asegurar que la app funcione sin conexión a internet manteniendo los datos actualizados al detectar señal.

### 5.2 CI/CD Pipeline
- **Build Engine:** Vite (Optimización Rollup).
- **Hosting:** Firebase Global CDN con soporte para **HTTP/2 y SSL Automático**.
- **Versioning:** Gestión de versiones semántica integrada en el "Centro de Mando".

---

**Arquitecto Responsable:** Brandon Daza  
**Empresa:** ChopCode Solutions  
**Fecha:** Septiembre 2026
