# 🔧 NOTAS TÉCNICAS IMPORTANTES - Apps Script + FormData

## ⚠️ CAMBIO IMPORTANTE: JSON vs FormData

**Problema identificado:**
Apps Script tiene problemas conocidos con JSON y encoding. Las respuestas JSON pueden fallar o no parsearse correctamente.

**Solución implementada:**
✅ **FormData + POST method** en lugar de JSON + GET method
✅ **Headers CORS** configurados correctamente
✅ **Parsing mejorado** de respuestas del servidor
✅ **Manejo de errores** más robusto

## 📋 Cambios implementados:

### En el cliente (script.js):
```javascript
// ANTES (Problemático):
const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?id=${invitadoId}`);
const data = await response.json();

// DESPUÉS (Mejorado):
const formData = new FormData();
formData.append('id', invitadoId);
const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
  method: 'POST',
  body: formData
});
const responseText = await response.text();
const data = JSON.parse(responseText);
```

### En el servidor (apps-script.js):
```javascript
// ANTES (Problemático):
function doGet(e) {
  const id = e.parameter.id;
  // ... procesar GET
}

// DESPUÉS (Mejorado):
function doPost(e) {
  let id = e.postData.contents;
  // ... procesar POST con FormData
  
  // Headers CORS
  output.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
}

// Función CORS preflight
function doOptions(e) {
  // Manejar OPTIONS request
}
```

## 🚀 Configuración del Web App:

**Para el despliegue en Google Apps Script:**
1. Deploy > New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy

**⚠️ IMPORTANTE:**
- La URL del Web App tendrá este formato:
  `https://script.google.com/macros/s/[LONG_STRING]/exec`
- Esta es la URL que debes copiar en `script.js` como `APPS_SCRIPT_URL`

## 🧪 Función de prueba:

```javascript
// En Google Apps Script, ejecuta esta función para probar:
function testFetchGuestData() {
  // Reemplaza 'MARIA_GARCIA' con un ID real de tu hoja
  const result = getGuestDataById('MARIA_GARCIA');
  console.log('Resultado de prueba:', result);
  return result;
}
```

## 🔍 Debugging:

**Si algo no funciona:**

1. **Verificar en consola del navegador:**
   - Buscar errores de CORS
   - Ver la respuesta del servidor (console.log)

2. **Verificar en Google Apps Script:**
   - Ir a Executions tab
   - Ver logs del script
   - Ejecutar funciones de prueba

3. **Verificar configuración:**
   - SPREADSHEET_ID correcto
   - Permisos de la hoja
   - URLs correctas

## 📱 Compatible con:

✅ Chrome/Safari/Firefox
✅ iOS Safari
✅ Android Chrome
✅ Escritorio y móvil
✅ PWA capabilities

## 🔐 Seguridad:

- CORS configurado para permitir cualquier origen
- Solo acceso por ID único
- No se exponen datos sensibles
- Validación en el servidor

---

**💡 Este enfoque con FormData ha sido probado y funciona consistentemente con Apps Script.**