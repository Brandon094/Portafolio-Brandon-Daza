# Esquema NoSQL (Firebase Realtime Database)

El sistema utiliza una base de datos documental jerárquica en tiempo real, optimizada para la sincronización de señales y la gestión de activos.

---

## Estructura del Árbol JSON

```json
{
  "projects": {
    "project_id_01": {
      "title": "Ruta-Go - Smart Mobility",
      "description": "...",
      "images": ["/img/..."],
      "featureGraphic": "/img/...",
      "keyPoints": ["..."],
      "technologies": ["..."],
      "status": "completed",
      "progress": 100,
      "liveUrl": "...",
      "playStoreUrl": "..."
    }
  },
  "leads": {
    "-Nklm...unique_id": {
      "name": "Cliente Potential",
      "email": "cliente@empresa.com",
      "message": "...",
      "timestamp": 169435...
    }
  },
  "analytics": {
    "global": {
      "totalVisits": 1250
    },
    "projectViews": {
      "rutago": 450,
      "yaya": 320
    }
  },
  "academy": {
    "courses": {
      "py-01": {
        "title": "Python Engine",
        "status": "coming_soon",
        "..." : "..."
      }
    }
  }
}
```

---

## Decisiones de Diseño NoSQL

1.  **Desnormalización Estratégica:** Las analíticas de clics se almacenan fuera del objeto `project` para evitar escrituras masivas en el nodo de contenido estático, optimizando la lectura para los visitantes.
2.  **Identificadores Atómicos:** Se utilizan IDs manuales descriptivos para proyectos (ej: `rutago`) para facilitar la referenciación en analíticas, mientras que los leads usan IDs autogenerados por Firebase para garantizar la concurrencia.
3.  **Sincronización Bidireccional:** El uso de `onValue` en el frontend permite que el panel administrativo sea una "Single Source of Truth" reactiva.

---

**Arquitecto Responsable:** Brandon Daza
