# Diccionario de Datos v6.5

Este documento define las estructuras de datos (Interfaces) utilizadas en el ecosistema, garantizando la integridad técnica y el tipado estricto en todo el proyecto.

---

## 1. Entidad: `Project` (Proyecto)
Define la estructura de un activo tecnológico en el repositorio.

| Propiedad | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único generado por Firebase. | Sí |
| `title` | `string` | Nombre del proyecto. Formato sugerido: "Nombre - Subtítulo". | Sí |
| `description`| `string` | Análisis abstracto y funcional del sistema. | Sí |
| `images` | `string[]` | Array de URLs (locales o remotas) de capturas de pantalla. | Sí |
| `featureGraphic`| `string` | URL del banner promocional o gráfico de funciones. | No |
| `keyPoints` | `string[]` | Pilares de ingeniería y decisiones arquitectónicas. | Sí |
| `technologies`| `string[]` | Stack tecnológico utilizado (ej: React, Kotlin). | Sí |
| `status` | `enum` | Estado del despliegue: `'completed' \| 'in_progress'`. | Sí |
| `progress` | `number` | Porcentaje de avance del vector de construcción (0-100). | No |
| `liveUrl` | `string` | Enlace directo al despliegue web en producción. | No |
| `playStoreUrl`| `string` | Enlace directo al nodo en la tienda Google Play. | No |

---

## 2. Entidad: `Course` (Curso Academy)
Define la estructura del contenido educativo en ChopCode Academy.

| Propiedad | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único del curso. | Sí |
| `title` | `string` | Título académico del programa. | Sí |
| `category` | `enum` | Área técnica: `'frontend' \| 'backend' \| 'mobile' \| 'logic' \| 'ai'`. | Sí |
| `language` | `enum` | Lenguaje core: `'python' \| 'javascript' \| 'kotlin' \| etc`. | Sí |
| `description`| `string` | Resumen ejecutivo del programa educativo. | Sí |
| `level` | `enum` | Nivel de dificultad: `'beginner' \| 'intermediate' \| 'advanced'`. | Sí |
| `duration` | `string` | Tiempo estimado de finalización (ej: "12 Horas"). | Sí |
| `lessonsCount`| `number` | Cantidad de unidades temáticas inyectadas. | Sí |
| `status` | `enum` | Estado del curso: `'active' \| 'coming_soon'`. | Sí |

---

## 3. Entidad: `Lead` (Señal de Contacto)
Estructura de los datos capturados en el terminal de Handshake.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `name` | `string` | Identificador del remitente (Nombre o Empresa). |
| `email` | `string` | Ruta de retorno para respuesta técnica. |
| `message` | `string` | Payload del desafío técnico o visión estratégica. |
| `timestamp` | `number` | Marca de tiempo del servidor (Unix). |

---

**Sello de Calidad:** ChopCode Solutions - Engineering Division.
