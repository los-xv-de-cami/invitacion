# Panel de Administración - Generador de Enlaces

## 📋 **Descripción**

El Panel de Administración permite gestionar y generar enlaces personalizados para los invitados que confirmaron asistencia al evento. Solo muestra invitados con "Si" en la columna E (Asistencia) de tu Google Sheet.

## 🔧 **Configuración**

### 1. **Actualizar Google Apps Script**
- Abre tu proyecto en Google Apps Script
- Reemplaza el código con el nuevo `apps-script.js` que incluye la función `getAllGuests`
- Asegúrate de que el `SPREADSHEET_ID` esté configurado correctamente

### 2. **Verificar Columna de Asistencia**
- La columna E debe tener el encabezado "Asistencia"
- Los valores deben ser exactamente "Si" (mayúscula)
- Cualquier otro valor será excluido de la lista

### 3. **Subir Archivos a GitHub**
- Sube `admin.html` a tu repositorio
- Sube el `apps-script.js` actualizado a Google Apps Script

## 🌐 **Acceso**

- **Panel de Administración**: `https://los-xv-de-cami.github.io/sistema-boletos/admin.html`
- **Página Principal**: `https://los-xv-de-cami.github.io/sistema-boletos/`
- **Invitaciones Individuales**: `https://los-xv-de-cami.github.io/sistema-boletos/invitacion.html?id=ID_INVITADO`

## 🎯 **Funcionalidades**

### 📊 **Dashboard de Estadísticas**
- Total de invitados
- Confirmados (con "Si" en asistencia)
- Pendientes (sin confirmar)

### 🔍 **Búsqueda y Filtrado**
- Buscar invitados por nombre
- Lista automática solo con confirmados

### 📋 **Gestión de Enlaces**
- **Copiar enlace individual**: Click en el ícono de copiar junto al nombre
- **Vista detallada**: Click en el ícono de enlace para ver modal con:
  - URL completa del invitado
  - Código QR escaneable
  - Botones para copiar y probar enlace

### 📥 **Exportación Masiva**
- Botón "Exportar Enlaces" genera archivo CSV
- Incluye: Nombre, Mesa, Acompañantes, Enlace completo
- Perfecto para crear listas de distribución

## 📱 **Cómo Usar**

### Para cada invitado confirmado:
1. **Buscar o navegar** en la lista de confirmados
2. **Copiar enlace**: Click en 📋 junto al nombre
3. **Enviar por WhatsApp/Email** con mensaje personalizado
4. **Opcional**: Probar enlace antes de enviar

### Para envío masivo:
1. Click **"Exportar Enlaces"**
2. Descargar archivo CSV
3. Usar para listas de distribución masiva

## 💡 **Mensaje Sugerido para WhatsApp**

```
¡Hola {NOMBRE}! 👋

Aquí está tu invitación personalizada para los XV Años de Camila:

{NOMBRE}, te esperamos el Sábado 14 de Febrero, 2026 a las 7:00 PM en el Salón D'Luz.

📅 Sábado 14 de Febrero, 2026
🕰️ 7:00 PM  
📍 Salón D'Luz
🍽️ Mesa {MESA}

[ENLACE_PERSONALIZADO]

¡No olvides guardar este enlace! Te esperamos con mucho cariño 💖
```

## ⚙️ **Configuración Técnica**

- **URL Google Apps Script**: Configurada en el código
- **Filtro de Asistencia**: Solo muestra filas con "Si" en columna E
- **CORS**: Compatible con navegadores modernos
- **Responsive**: Funciona en móviles y tablets

## 🔄 **Actualizaciones en Tiempo Real**

- Click "Actualizar" para recargar datos desde Google Sheets
- Los cambios en la hoja se reflejan automáticamente
- Sin necesidad de recargar la página completa

## 🚨 **Solución de Problemas**

### Error "Error al cargar datos"
- Verifica que el `SPREADSHEET_ID` esté correcto
- Asegúrate de que el Web App esté desplegado con permisos correctos
- Verifica que la columna E existe y tiene "Asistencia" como encabezado

### No aparecen invitados confirmados
- Verifica que los valores en columna E sean exactamente "Si" (mayúscula)
- Asegúrate de que los invitados tengan ID y Nombre completos
- Click "Actualizar" para recargar

### Enlaces no funcionan
- Verifica que la URL de GitHub Pages sea correcta
- Confirma que los IDs en la hoja coincidan exactamente
- Prueba con el enlace de prueba

## 📞 **Soporte**

Si tienes problemas con el panel, verifica:
1. ✅ Google Apps Script actualizado y desplegado
2. ✅ Columna E con "Asistencia" y valores "Si"
3. ✅ Todos los invitados tienen ID y Nombre
4. ✅ GitHub Pages actualizado con `admin.html`