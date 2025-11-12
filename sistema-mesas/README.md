# Minisite para Asignación de Mesas de Evento

Sistema completo para gestionar la asignación de mesas de eventos con sincronización en tiempo real con Google Sheets.

## 📋 Características

- **25 mesas** con capacidad máxima de 10 personas cada una
- **Drag & Drop** intuitivo para asignar invitados
- **Sincronización en tiempo real** con Google Sheets
- **Múltiples usuarios** pueden trabajar simultáneamente
- **Gestión automática de acompañantes**
- **Interfaz moderna y responsive**

## 🚀 Configuración

### Paso 1: Google Sheets

1. **Preparar tu hoja de cálculo** con las columnas:
   - A: ID alfanumérico
   - B: Nombre
   - C: Email
   - D: Teléfono
   - E: Asistencia (si/no)
   - F: Acompañantes (separados por comas)
   - K: Asignación de mesa (se llenará automáticamente)

2. **Obtener el ID de la hoja**:
   - El ID está en la URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copiar solo la parte del ID

### Paso 2: Google Apps Script

1. **Crear nuevo proyecto**:
   - Ir a [Google Apps Script](https://script.google.com/)
   - Crear nuevo proyecto
   - Borrar el código por defecto

2. **Configurar el código**:
   - Copiar el contenido de `apps-script.js` en el editor
   - Reemplazar `SPREADSHEET_ID` con tu ID real:
     ```javascript
     const SPREADSHEET_ID = 'tu_id_real_aqui';
     ```

3. **Configurar permisos**:
   - Ir a `Servicios` > Habilitar `Google Sheets API`
   - Guardar el proyecto (Ctrl+S)

4. **Desplegar como Web App**:
   - Click en `Implementar` > `Nueva implementación`
   - Tipo: `Aplicación web`
   - Ejecutar como: `Yo`
   - Quién tiene acceso: `Cualquier persona` (o según tus necesidades)
   - Click `Implementar`
   - **Copiar la URL del Web App** (la necesitarás en el frontend)

### Paso 3: Frontend

1. **Configurar la URL**:
   - Abrir `script.js`
   - Reemplazar `APPS_SCRIPT_URL`:
     ```javascript
     const APPS_SCRIPT_URL = 'tu_web_app_url_aqui';
     ```

2. **Subir archivos**:
   - Subir `index.html`, `styles.css`, y `script.js` a un servidor web
   - O usar cualquier servicio de hosting estático (Netlify, Vercel, GitHub Pages)

## 🎯 Cómo Usar

### Interfaz Principal

- **Panel izquierdo**: Lista de invitados pendientes de asignar
- **Área central**: Grid de 25 mesas con su estado de ocupación
- **Header**: Título y botón de guardar cambios

### Asignar Invitados

1. **Drag & Drop simple**:
   - Tomar una tarjeta de invitado del panel izquierdo
   - Soltarla sobre una mesa disponible
   - La mesa mostrará la asignación inmediatamente

2. **Mover entre mesas**:
   - Arrastrar una tarjeta desde una mesa a otra
   - Solo se permite si hay espacio disponible

3. **Validaciones automáticas**:
   - Máximo 10 personas por mesa (incluyendo acompañantes)
   - No se permiten asignaciones que excedan la capacidad
   - Alertas visuales para mesas completas

### Gestionar Acompañantes

- Los acompañantes se muestran como `+X acompañante(s)` en cada tarjeta
- Al asignar una persona, todos sus acompañantes van juntos
- El contador de capacidad considera a todos automáticamente

### Guardar Cambios

- Click en `Guardar Cambios` en el header
- El botón cambia a `Guardando...` durante el proceso
- Estado `Guardado` indica éxito
- Las asignaciones se escriben en la **columna K** de tu Google Sheet

### Sincronización Multi-Usuario

- Los datos se actualizan automáticamente cada 30 segundos
- Cada usuario ve los cambios de otros en tiempo real
- Las asignaciones se guardan instantáneamente al hacer clic en "Guardar"

## 🛠️ Funciones Avanzadas

### Códigos de Google Apps Script

```javascript
// Función de prueba para verificar configuración
function testConnection() {
  const response = handleLoadGuests();
  Logger.log('Respuesta de prueba:', response.getContent());
}

// Limpiar todas las asignaciones (usar con cuidado)
function clearAllAssignments() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  const range = sheet.getRange('K:K');
  range.clearContent();
  return createResponse({ success: true, message: 'Todas las asignaciones han sido eliminadas' });
}

// Obtener estadísticas de ocupación
function getOccupancyStats() {
  // Retorna estadísticas detalladas de ocupación
}
```

## 🔧 Personalización

### Modificar Capacidades

Para cambiar el número de mesas o capacidad:

```javascript
// En script.js, cambiar estas líneas:
const state = {
    guests: [],
    assignments: new Map(),
    tables: Array.from({ length: 25 }, (_, i) => ({ // Cambiar 25 por el número deseado
        number: i + 1,
        guests: [],
        capacity: 10 // Cambiar 10 por la capacidad deseada
    }))
};
```

### Cambiar Colores

En `styles.css`, modificar las variables CSS:

```css
:root {
    --primary-500: #0057FF;    /* Color principal */
    --success-500: #16A34A;    /* Color de éxito */
    --error-500: #DC2626;      /* Color de error */
    /* etc. */
}
```

## 📱 Responsive

El sitio funciona en:
- **Desktop**: Layout completo con panel lateral
- **Tablet**: Layout de dos columnas ajustado
- **Mobile**: Layout de una columna con grid de mesas

## 🐛 Solución de Problemas

### Error "No se recibieron datos"
- Verificar que la URL del Web App sea correcta
- Comprobar que Google Apps Script esté desplegado correctamente

### Asignaciones no se guardan
- Verificar que el SPREADSHEET_ID sea correcto
- Comprobar que la hoja tenga permisos de edición
- Revisar que las columnas A, B, E, F, K existan

### Drag & Drop no funciona
- Verificar que la página se cargue desde un servidor (no file://)
- Comprobar la consola del navegador para errores JavaScript

## 📞 Soporte

Para problemas o mejoras:
1. Revisar la consola del navegador (F12)
2. Verificar los logs de Google Apps Script
3. Comprobar que todos los archivos estén subidos correctamente

---

**Creado por MiniMax Agent** - Sistema completo para gestión de eventos