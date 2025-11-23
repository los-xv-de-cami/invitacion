/**
 * Script de prueba SIMPLIFICADO para diagnosticar el problema
 * Úsalo si el formulario principal no funciona
 */

// Función simple de prueba que se puede ejecutar directamente
function testSimple() {
  try {
    // Test 1: Conectar con Google Sheets
    const sheet = SpreadsheetApp.openById('1lInvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM');
    Logger.log('✅ Conexión exitosa con Google Sheets');
    Logger.log('Nombre del archivo: ' + sheet.getName());
    
    // Test 2: Buscar la hoja
    let hoja = sheet.getSheetByName('Confirmaciones');
    if (!hoja) {
      Logger.log('⚠️ Hoja "Confirmaciones" no encontrada');
      Logger.log('Hojas disponibles: ' + sheet.getSheets().map(s => s.getName()).join(', '));
      return false;
    }
    Logger.log('✅ Hoja "Confirmaciones" encontrada');
    
    // Test 3: Intentar escribir datos de prueba
    const testData = ['TEST-' + Date.now(), 'Usuario Test', 'test@test.com', '1234567890', 'Si', '', '', 'Test observa', new Date()];
    const ultimaFila = hoja.getLastRow() + 1;
    hoja.getRange(ultimaFila, 1, 1, testData.length).setValues([testData]);
    Logger.log('✅ Datos de prueba escritos exitosamente');
    Logger.log('Fila escrita: ' + ultimaFila);
    
    return true;
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return false;
  }
}

/**
 * Función de prueba para simular el envío del formulario
 */
function testFormSubmission() {
  const testData = {
    nombre: 'Usuario Test',
    telefono: '1234567890', 
    email: 'test@test.com',
    observaciones: 'Prueba desde Apps Script',
    asistire: 'Si'
  };

  try {
    const result = doPost({ postData: { contents: JSON.stringify(testData) } });
    const content = result.getContent();
    Logger.log('Respuesta del doPost: ' + content);
    
    // Parsear la respuesta JSON
    const parsed = JSON.parse(content);
    if (parsed.status === 'success') {
      Logger.log('✅ Formulario funcionando correctamente');
      Logger.log('ID generado: ' + parsed.idInvitado);
    } else {
      Logger.log('❌ Error en formulario: ' + parsed.message);
    }
    
    return parsed;
  } catch (error) {
    Logger.log('❌ Error ejecutando doPost: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return { status: 'error', message: error.toString() };
  }
}

/**
 * Función para mostrar estadísticas actuales
 */
function showCurrentStats() {
  try {
    const sheet = SpreadsheetApp.openById('1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM');
    const hoja = sheet.getSheetByName('Confirmaciones');
    
    if (!hoja) {
      Logger.log('❌ Hoja "Confirmaciones" no encontrada');
      return;
    }
    
    const ultimaFila = hoja.getLastRow();
    Logger.log('📊 Estadísticas actuales:');
    Logger.log('- Total de filas con datos: ' + (ultimaFila - 1));
    
    if (ultimaFila > 1) {
      const datos = hoja.getDataRange().getValues();
      let confirmaciones = 0;
      let negativas = 0;
      
      for (let i = 1; i < datos.length; i++) {
        const asistencia = datos[i][4]; // Columna E
        if (asistencia === 'Si') confirmaciones++;
        else if (asistencia === 'No') negativas++;
      }
      
      Logger.log('- Confirmaciones: ' + confirmaciones);
      Logger.log('- No asistirán: ' + negativas);
      Logger.log('- Porcentaje confirmación: ' + Math.round((confirmaciones / (confirmaciones + negativas)) * 100) + '%');
    }
  } catch (error) {
    Logger.log('❌ Error obteniendo estadísticas: ' + error.toString());
  }
}
