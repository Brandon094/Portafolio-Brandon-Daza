# Protocolo de Seguridad v6.5

Este ecosistema implementa un modelo de seguridad de **Mínimo Privilegio**, protegiendo la integridad de los activos y la privacidad de los leads capturados.

---

## 1. Firebase Security Rules (RTDB)

Se aplican reglas granulares para restringir el acceso según el estado de autenticación. Estas reglas deben ser inyectadas directamente en la consola de Firebase.

```json
{
  "rules": {
    "projects": {
      ".read": true,
      ".write": "auth != null"
    },
    "leads": {
      ".read": "auth != null",
      ".write": true
    },
    "analytics": {
      ".read": true,
      ".write": true
    },
    "academy": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

---

## 2. Protección de Capa de Aplicación (AuthGuard)

El sistema utiliza un **Higher Order Component (HOC)** para blindar las rutas administrativas.

### Componente: `src/components/atoms/AuthGuard.tsx`
- **Intercepción:** Antes de montar componentes como `AdminPage`, el `AuthGuard` verifica el token JWT mediante el hook `useAuth`.
- **Redirección Atómica:** Si el estado de `user` es nulo, se dispara un `<Navigate to="/login" replace />` instantáneo.
- **Ciclo de Vida:** Maneja un estado de `loading` (spinner) para evitar el parpadeo de datos privados durante la sincronización inicial con Firebase Auth.

---

## 3. Sanitización y Prevención de Inyecciones

1.  **Protección XSS Nativa:** React escapa automáticamente todos los strings antes de renderizarlos en el DOM, neutralizando intentos de inyección de scripts a través del formulario de contacto.
2.  **Validación de Tipo Estricta:** El uso de TypeScript en todo el proyecto garantiza que los datos inyectados a la base de datos coincidan exactamente con la estructura definida en el `Diccionario de Datos`.
3.  **Seguridad en Enlaces:** Todas las salidas a URLs externas en los modales y tarjetas utilizan `rel="noopener noreferrer"` para prevenir ataques de secuestro de ventana (Tabnabbing).

---

**Estado del Sistema:** SEGURO | **Ref:** CHOPCODE_SEC_v4.5
