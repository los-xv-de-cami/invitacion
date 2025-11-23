# Ejemplo de Datos en Google Sheets

## 📊 Estructura de Datos Resultante

Después de que los invitados completen el formulario, los datos se almacenarán en tu hoja de Google Sheets con el siguiente formato:

| ID_Invitado | Nombre | Email | Telefono | Asistencia |  |  | Observaciones | Fecha_Registro |
|-------------|--------|-------|----------|------------|---|---|---------------|----------------|
| INV-1731912345-1234 | María González | maria@email.com | 123 456 7890 | Si |  |  | Alérgica a frutos secos | 18/11/2025 14:30 |
| INV-1731912456-5678 | Carlos Rodríguez | carlos@email.com | 987 654 3210 | Si |  |  | - | 18/11/2025 14:45 |
| INV-1731912567-9012 | Ana Martínez | ana@email.com | 555 123 4567 | No |  |  | Viaje programado | 18/11/2025 15:00 |

*Nota: Las columnas F y G están reservadas para futuras funcionalidades.*

## 📈 Funciones de Análisis Automático

### Script para obtener estadísticas (ejecutar en Apps Script):

```javascript
function obtenerReporteCompleto() {
  const stats = obtenerEstadisticas();
  
  console.log('=== REPORTE DE CONFIRMACIONES ===');
  console.log(`Total de respuestas: ${stats.total}`);
  console.log(`Confirmaciones: ${stats.confirmaciones}`);
  console.log(`No asistirán: ${stats.negativas}`);
  console.log(`Porcentaje de confirmación: ${stats.porcentajeConfirmacion}%`);
  
  return stats;
}

// Ejecutar esta función en la consola de Apps Script
```

### Función para exportar datos a CSV:

```javascript
function exportarACSV() {
  // Asegúrate de que la hoja tenga el nombre correcto: "Confirmaciones"
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  // Crear CSV
  const csvContent = values.map(row => 
    row.map(field => `"${field}"`).join(',')
  ).join('\n');
  
  // Crear blob y descargar
  const blob = Utilities.newBlob(csvContent, 'text/csv', 'confirmaciones.csv');
  
  return blob;
}
```

## 📧 Templates de Email Automático

### Email de Confirmación (Asistirán):

```
Asunto: Confirmación Recibida - XV Años de Camila

Hola [NOMBRE],

¡Gracias por confirmar tu asistencia a los XV Años de Camila!

Hemos registrado exitosamente tu confirmación. Será un honor contar con tu presencia en esta celebración tan especial.

Detalles del evento:
- Fecha: [FECHA_DEL_EVENTO]
- Lugar: [LUGAR_DEL_EVENTO]
- Horario: [HORARIO]

Te mantendremos informado sobre los detalles adicionales.

¡Nos vemos pronto!

XV Años de Camila
```

### Email de Registro Negativo:

```
Asunto: Información Recibida - XV Años de Camila

Hola [NOMBRE],

Hemos recibido tu información sobre no poder asistir a los XV Años de Camila.

Lamentamos que no puedas acompañarnos, pero agradecemos que nos hayas hecho saber.

Te enviaremos algunas fotos del evento para que puedas ser parte de esta celebración de otra manera.

¡Gracias por todo!

XV Años de Camila
```

## 🎨 Formateo Condicional en Google Sheets

### Configuración recomendada:

1. **Columna E (Asistencia):**
   - Si valor = "Si" → Fondo verde claro (#d4edda)
   - Si valor = "No" → Fondo rojo claro (#f8d7da)

2. **Formato de fechas:**
   - Formato: DD/MM/YYYY HH:MM

3. **Encabezados:**
   - Fondo dorado (#D4AF37)
   - Texto blanco
   - Negrita

## 📱 Vista Móvil Optimizada

El formulario se adapta automáticamente a dispositivos móviles con:

- ✅ Campos más grandes para facilitar la entrada
- ✅ Botones fáciles de presionar
- ✅ Texto legible sin zoom
- ✅ Validación en tiempo real

## 🔍 Funciones de Monitoreo

### Script para ver últimas confirmaciones:

```javascript
function verUltimasConfirmaciones(limite = 10) {
  // La hoja debe llamarse exactamente "Confirmaciones"
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    console.log('No hay confirmaciones aún.');
    return;
  }
  
  const startRow = Math.max(2, lastRow - limite + 1);
  const range = sheet.getRange(startRow, 1, lastRow - startRow + 1, 9);
  const data = range.getValues();
  
  console.log('=== ÚLTIMAS CONFIRMACIONES ===');
  data.forEach((row, index) => {
    console.log(`${index + 1}. ${row[1]} - ${row[4]} - ${row[8]}`);
  });
}
```

### Recordatorio para invitados sin respuesta:

```javascript
function invitarPendientes() {
  // Esta función podría enviar recordatorios a quienes no han respondido
  // (requiere una columna adicional para tracking de recordatorios)
}
```

## 📊 Dashboard de Estadísticas en Tiempo Real

Puedes crear un dashboard adicional en otra hoja con:

1. **Métricas principales:**
   - Total de invitados únicos
   - Confirmaciones recibidas
   - Porcentaje de respuesta
   - Porcentaje de confirmación

2. **Gráficos automáticos:**
   - Gráfico de barras: Confirmaciones vs No asistencia
   - Gráfico de línea: Evolución de confirmaciones en el tiempo
   - Gráfico circular: Porcentaje de confirmación

3. **Tablas dinámicas:**
   - Lista de confirmados
   - Lista de negativas
   - Invitados con observaciones especiales

## 🚀 Automatizaciones Adicionales

### Google Apps Script puede:

1. **Enviar recordatorios automáticos** a los 7 y 3 días antes del evento
2. **Generar lista de invitados confirmados** para el día del evento
3. **Enviar confirmaciones por email** inmediatamente después del registro
4. **Crear reportes diarios** con estadísticas actualizadas
5. **Notificar al organizador** cuando se alcanza cierto número de confirmaciones

## 📝 Notas Importantes

- Los datos se almacenan de forma segura en Google Sheets
- Cada invitado recibe un ID único para evitar duplicados
- Los timestamps se guardan automáticamente
- Las observaciones se pueden usar para planificar catering especial
- El sistema maneja múltiples idiomas si es necesario

¡El minisite está completamente funcional y listo para usar! 🎉