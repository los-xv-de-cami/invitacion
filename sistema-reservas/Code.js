/**
 * Google Apps Script para minisite de confirmación de asistencia
 * Conecta el formulario web con Google Sheets
 * 
 * CONFIGURACIÓN:
 * 1. Crear un nuevo proyecto en https://script.google.com/
 * 2. Reemplazar el ID de la hoja en SHEET_ID
 * 3. Configurar el despliegue como aplicación web
 */

const SHEET_ID = '1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM';
const SHEET_NAME = 'Confirmaciones'; // Nombre de la hoja en tu Google Sheets

/**
 * Función principal que maneja las solicitudes POST del formulario
 */
function doPost(e) {
  try {
    // Verificar que se recibieron datos
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'No se recibieron datos'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Validar campos requeridos
    const requiredFields = ['nombre', 'telefono', 'email', 'asistire'];
    for (let field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return ContentService
          .createTextOutput(JSON.stringify({
            status: 'error',
            message: `El campo ${field} es obligatorio`
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Generar ID único para el invitado
    const idInvitado = generarIDUnico();
    
    // Preparar los datos para insertar
    const filaDatos = [
      idInvitado,                   // Columna A: ID_Invitado (índice 0)
      data.nombre.trim(),          // Columna B: Nombre (índice 1)
      data.email.trim(),           // Columna C: Email (índice 2)
      data.telefono.trim(),        // Columna D: Telefono (índice 3)
      data.asistire.trim(),        // Columna E: Asistencia (índice 4)
      '',                          // Columna F: (vacío)
      '',                          // Columna G: (vacío)
      data.observaciones || '',    // Columna H: Observaciones (índice 7)
      new Date()                   // Columna I: Fecha de registro (índice 8)
    ];

    // Insertar en la hoja de cálculo
    const resultado = insertarEnHoja(filaDatos);

    if (resultado.exito) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          message: 'Confirmación registrada exitosamente',
          idInvitado: idInvitado
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error(resultado.error);
    }

  } catch (error) {
    console.error('Error en doPost:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error interno del servidor: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Genera un ID único para cada invitado
 */
function generarIDUnico() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `INV-${timestamp}-${random}`;
}

/**
 * Inserta los datos en la hoja de cálculo
 */
function insertarEnHoja(datos) {
  try {
    // Abrir la hoja de cálculo
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Si no existe la hoja, crearla
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Crear encabezados
      const encabezados = [
        'ID_Invitado', 'Nombre', 'Email', 'Telefono', 'Asistencia', '', '', 'Observaciones', 'Fecha_Registro'
      ];
      sheet.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, encabezados.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#D4AF37');
      headerRange.setFontColor('white');
      headerRange.setHorizontalAlignment('center');
    }

    // Insertar los datos en la siguiente fila disponible
    const ultimaFila = sheet.getLastRow() + 1;
    sheet.getRange(ultimaFila, 1, 1, datos.length).setValues([datos]);

    // Formatear la fila recién agregada
    const nuevaFila = sheet.getRange(ultimaFila, 1, 1, datos.length);
    nuevaFila.setVerticalAlignment('middle');
    nuevaFila.setHorizontalAlignment('left');
    
    // Aplicar formato condicional según asistencia
    const asistenciaCell = sheet.getRange(ultimaFila, 5); // Columna E
    if (datos[4] === 'Si') {
      asistenciaCell.setBackground('#d4edda'); // Verde claro
      asistenciaCell.setFontColor('#155724');
    } else if (datos[4] === 'No') {
      asistenciaCell.setBackground('#f8d7da'); // Rojo claro
      asistenciaCell.setFontColor('#721c24');
    }

    // Ajustar ancho de columnas
    sheet.autoResizeColumns(1, datos.length);

    return { exito: true };

  } catch (error) {
    console.error('Error al insertar en hoja:', error);
    return { 
      exito: false, 
      error: error.toString() 
    };
  }
}

/**
 * Maneja solicitudes GET (opcional, para pruebas)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      message: 'API de confirmación de asistencia activa',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Función para obtener estadísticas de confirmaciones (opcional)
 */
function obtenerEstadisticas() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        total: 0,
        confirmaciones: 0,
        negativas: 0,
        porcentajeConfirmacion: 0
      };
    }

    const datos = sheet.getDataRange().getValues();
    let confirmaciones = 0;
    let negativas = 0;

    // Contar confirmaciones (omitir encabezados)
    for (let i = 1; i < datos.length; i++) {
      const asistencia = datos[i][4]; // Columna E
      if (asistencia === 'Si') {
        confirmaciones++;
      } else if (asistencia === 'No') {
        negativas++;
      }
    }

    const total = confirmaciones + negativas;
    const porcentajeConfirmacion = total > 0 ? (confirmaciones / total) * 100 : 0;

    return {
      total: total,
      confirmaciones: confirmaciones,
      negativas: negativas,
      porcentajeConfirmacion: Math.round(porcentajeConfirmacion * 100) / 100
    };

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { error: error.toString() };
  }
}

/**
 * Función para enviar email de confirmación (opcional)
 */
function enviarEmailConfirmacion(email, nombre, asistencia) {
  const asunto = asistencia === 'Si' 
    ? 'Confirmación Recibida - XV Años de Camila'
    : 'Información Recibida - XV Años de Camila';
    
  const cuerpo = asistencia === 'Si' 
    ? `Hola ${nombre},

¡Gracias por confirmar tu asistencia a los XV Años de Camila!

Hemos registrado exitosamente tu confirmación. Será un honor contar con tu presencia en esta celebración tan especial.

Te mantendremos informado sobre los detalles del evento.

¡Nos vemos pronto!
    
XV Años de Camila`
    : `Hola ${nombre},

Hemos recibido tu información sobre no poder asistir a los XV Años de Camila.

Lamentamos que no puedas acompañarnos, pero agradecemos que nos hayas hecho saber.

Te enviaremos algunas fotos del evento para que puedas ser parte de esta celebración de otra manera.

¡Gracias por todo!

XV Años de Camila`;

  try {
    GmailApp.sendEmail(email, asunto, cuerpo);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
}