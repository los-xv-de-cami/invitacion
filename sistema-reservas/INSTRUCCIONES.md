# Instrucciones de Configuración del Minisite de Confirmación de Asistencia

## 📋 Resumen del Proyecto

Este minisite permite a los invitados confirmar su asistencia a los XV Años de Camila. Los datos se almacenan automáticamente en Google Sheets y se integran con Google Apps Script para una gestión eficiente.

## 🛠️ Configuración paso a paso

### 1. Preparar Google Apps Script

1. **Crear nuevo proyecto en Apps Script:**
   - Ve a [script.google.com](https://script.google.com/)
   - Haz clic en "Nuevo proyecto"
   - Reemplaza el contenido de `Code.gs` con el código del archivo `Code.js`

2. **Configurar el ID de la hoja:**
   - En el archivo `Code.js`, asegúrate de que la variable `SHEET_ID` tenga el valor correcto:
   ```javascript
   const SHEET_ID = '1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM';
   ```

3. **Permisos y autorización:**
   - Guarda el proyecto
   - Apps Script te pedirá permisos para acceder a Google Sheets
   - Autoriza todos los permisos solicitados

### 2. Desplegar como aplicación web

1. **Crear despliegue:**
   - Haz clic en "Implementar" → "Nueva implementación"
   - Tipo: "Aplicación web"
   - Descripción: "Minisite Confirmación de Asistencia - XV Años Camila"
   
2. **Configurar acceso:**
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquier persona"

3. **Copiar la URL:**
   - Copia la URL de la aplicación web desplegada
   - Esta URL la necesitarás para actualizar en `script.js`

### 3. Configurar Google Sheets

1. **Información importante:**
   - **Nombre del archivo:** "Confirmaciones XV Años de Camila" 
   - **Nombre de la hoja:** "Confirmaciones"
   - **ID del archivo:** 1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM (ya configurado en el código)

2. **Estructura de columnas:**
   Tu hoja debe tener las siguientes columnas (el script las creará automáticamente si no existen):
   - **A:** ID_Invitado (se genera automáticamente)
   - **B:** Nombre
   - **C:** Email  
   - **D:** Telefono
   - **E:** Asistencia (Si/No)
   - **F-G:** Reservado para futuras funcionalidades
   - **H:** Observaciones
   - **I:** Fecha de registro

3. **El script creará automáticamente los encabezados si no existen**

### 4. Actualizar el JavaScript

1. **Editar `script.js`:**
   - Busca la línea con `fetch()` (aproximadamente línea 40)
   - Reemplaza la URL con tu URL de Google Apps Script:
   ```javascript
   fetch('TU_URL_DE_APPS_SCRIPT', {
   ```

2. **Formato de URL esperado:**
   ```
   https://script.google.com/macros/s/TU_TOKEN_ID/exec
   ```

### 5. Subir archivos al servidor

Sube estos archivos a tu servidor web:
- `index.html`
- `styles.css` 
- `script.js`
- `logo-camila.png` (el logo que proporcionaste)

## 🎨 Características del diseño

### Colores principales:
- **Negro (#000000):** Header y elementos principales
- **Dorado (#D4AF37):** Acentos, títulos y botón principal
- **Blanco (#FFFFFF):** Fondo del formulario y texto
- **Gris claro (#f8f8f8):** Fondo general

### Tipografía:
- **Títulos:** Playfair Display (serif elegante)
- **Contenido:** Open Sans (sans-serif legible)

### Funcionalidades:
- ✅ Formulario responsive (móvil y escritorio)
- ✅ Validación en tiempo real
- ✅ Integración automática con Google Sheets
- ✅ Modal de confirmación
- ✅ Efectos visuales y animaciones
- ✅ Formateo automático del número de teléfono

## 📊 Estructura de datos en Google Sheets

| Columna | Campo | Descripción |
|---------|-------|-------------|
| A | ID_Invitado | ID único generado automáticamente |
| B | Nombre | Nombre completo del invitado |
| C | Email | Correo electrónico |
| D | Telefono | Número de teléfono |
| E | Asistencia | "Si" o "No" |
| F | (vacío) | Reservado para futuras funcionalidades |
| G | (vacío) | Reservado para futuras funcionalidades |
| H | Observaciones | Campo opcional con comentarios |
| I | Fecha_Registro | Timestamp automático |

## 🔧 Funciones adicionales disponibles

El script incluye funciones extra que puedes activar:

### Estadísticas automáticas:
```javascript
function obtenerEstadisticas() {
  // Retorna: total, confirmaciones, negativas, porcentajeConfirmacion
}
```

### Envío de emails de confirmación:
```javascript
function enviarEmailConfirmacion(email, nombre, asistencia) {
  // Envía email automático con confirmación
}
```

## 🐛 Solución de problemas

### Error "Script function not found":
- Asegúrate de que el archivo se llame exactamente `Code.gs`
- Verifica que la función `doPost` esté presente

### Error de permisos:
- Revisa y autoriza nuevamente los permisos en Apps Script
- Verifica que tengas acceso a la hoja de Google Sheets

### Los datos no se guardan:
- Confirma que el ID de la hoja sea correcto
- Verifica que la URL en `script.js` sea la correcta
- Revisa la consola del navegador para errores

## 📱 Testing en diferentes dispositivos

El sitio es completamente responsive y se adapta a:
- 📱 Teléfonos móviles (320px+)
- 📟 Tablets (768px+)  
- 💻 Computadoras de escritorio (1024px+)

## 🎯 Próximos pasos sugeridos

1. **Personalizar el contenido** en `index.html` si es necesario
2. **Configurar envío de emails** automáticos
3. **Agregar analytics** para rastrear visitas
4. **Implementar recordatorios** automáticos para invitados que no han confirmado

## 📞 Soporte

Si encuentras algún problema durante la configuración, verifica:
- Que todos los archivos estén en el servidor
- Que las URLs sean correctas
- Que los permisos en Apps Script estén autorizados
- Que la hoja de Google Sheets tenga el ID correcto

¡El minisite está listo para usar! 🎉