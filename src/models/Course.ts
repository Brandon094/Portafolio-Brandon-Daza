/**
 * @file Course.ts
 * @description Definición de la interfaz 'Course' que representa el modelo de datos para la academia.
 * Dentro de los patrones Clean Architecture y DDD (Domain-Driven Design), este archivo pertenece a la
 * capa de Dominio (Modelos/Entidades), garantizando que las estructuras de datos esenciales de tu negocio
 * estén desacopladas de cualquier framework o interfaz gráfica.
 *
 * Brandon, como Fundador y Arquitecto, definir contratos tipados estrictos en TypeScript es una excelente
 * práctica para asegurar la robustez de los datos en toda la aplicación.
 */

export interface Course {
  id: string; // Identificador único del curso
  title: string; // Título o nombre principal del curso
  // Categoría del curso que limita las opciones a tecnologías clave de tu ecosistema
  category: 'frontend' | 'backend' | 'mobile' | 'logic' | 'ai';
  // Lenguaje de programación principal que se enseña en el curso
  language: 'python' | 'javascript' | 'html' | 'css' | 'kotlin' | 'java' | 'logic';
  description: string; // Resumen educativo detallado
  level: 'beginner' | 'intermediate' | 'advanced'; // Curva de aprendizaje del estudiante
  duration: string; // e.g. "12 Horas" - Representación legible del tiempo requerido
  lessonsCount: number; // Número total de lecciones o módulos incluidos
  status: 'active' | 'coming_soon'; // Control de visibilidad y disponibilidad comercial
  thumbnail?: string; // Ruta de imagen opcional para la portada del curso
}
