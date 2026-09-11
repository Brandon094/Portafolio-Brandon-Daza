/**
 * @file Project.ts
 * @description Interfaz central para el modelo de 'Proyecto' en el portafolio.
 * Este archivo define la estructura de datos que viaja desde Firebase hasta los componentes visuales.
 * Es una parte vital de la Capa de Dominio, actuando como el "Contrato de Datos" entre la lógica
 * de negocio y la presentación.
 *
 * Brandon, esta definición clara permite que cualquier desarrollador entienda inmediatamente
 * qué es un "Proyecto" en tu ecosistema digital.
 */

export interface Project {
  id: string; // ID único para identificación y ruteo
  title: string; // Nombre público del proyecto
  description: string; // Resumen ejecutivo del software desarrollado
  images: string[]; // Carrusel de capturas de pantalla o previews
  featureGraphic?: string; // Imagen promocional de alta calidad o gráfico de funciones
  keyPoints: string[]; // Lista de características destacadas o logros técnicos
  technologies: string[]; // Stack tecnológico utilizado (e.g. Kotlin, Firebase)
  status: 'completed' | 'in_progress'; // Estado actual del ciclo de vida del desarrollo
  progress?: number; // Porcentaje de avance para proyectos activos
  liveUrl?: string; // Enlace a la versión web en vivo (si aplica)
  playStoreUrl?: string; // Enlace directo a la distribución en Google Play (si aplica)
}
