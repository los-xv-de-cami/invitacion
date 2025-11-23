# 🔧 Configuración de Google Sheets - INFORMACIÓN IMPORTANTE

## ✅ Datos de tu archivo de Google Sheets

**Antes de continuar, verifica que tu Google Sheets tenga exactamente estos datos:**

### 📊 Información del Archivo:
- **Nombre del archivo:** `Confirmaciones XV Años de Camila`
- **Nombre de la hoja:** `Confirmaciones`
- **ID del archivo:** `1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM`

### 🔑 ID del archivo (enlace):
Si accedes a tu Google Sheets, la URL será algo así:
```
https://docs.google.com/spreadsheets/d/1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM/edit
```

El ID del archivo es la parte que está entre `/d/` y `/edit`.

### 📋 En el código de Google Apps Script:
```javascript
const SHEET_ID = '1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM';
const SHEET_NAME = 'Confirmaciones'; // ¡Este debe ser el nombre EXACTO de tu hoja!
```

## ⚠️ Verificación Importante:

1. **Nombre de la hoja:** 
   - Debe ser exactamente `Confirmaciones` (sin espacios extra, sin mayúsculas diferentes)
   - Si tu hoja se llama diferente, edita `SHEET_NAME` en el código

2. **Permisos:**
   - El script necesita permiso para acceder a tu hoja
   - Cuando despliegues, Google te pedirá autorización

3. **Hoja no encontrada:**
   - Si el script dice que no encuentra la hoja, verifica el nombre exacto
   - Puede que tenga espacios adicionales al principio o final

## 🚨 Solución de Problemas:

**Error "Sheet not found":**
- Verifica que el nombre de la hoja sea exactamente `Confirmaciones`
- Asegúrate de que la hoja esté en el archivo correcto (ID correcto)

**Error "Permission denied":**
- Autoriza los permisos cuando Google lo solicite
- Asegúrate de que tengas acceso al archivo de Google Sheets

¡Con esta configuración, el minisite funcionará perfectamente! 🎉