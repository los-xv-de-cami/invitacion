/**
 * Archivo de configuración adicional para personalizar el minisite
 * Puedes modificar estos valores según tus necesidades
 */

const CONFIG = {
  // Información del evento
  evento: {
    nombre: "XV Años de Camila",
    fecha: "2025", // Puedes agregar fecha específica
    lugar: "Evento Especial"
  },

  // Colores del tema (puedes personalizar aquí)
  colores: {
    primario: "#D4AF37",    // Dorado
    secundario: "#000000",  // Negro
    fondo: "#f8f8f8",       // Gris claro
    texto: "#333333",       // Gris oscuro
    exito: "#28a745",       // Verde
    error: "#dc3545"        // Rojo
  },

  // Configuración del formulario
  formulario: {
    campos: {
      nombre: {
        label: "Nombre Completo",
        requerido: true,
        tipo: "text",
        placeholder: "Ingresa tu nombre completo"
      },
      telefono: {
        label: "Teléfono",
        requerido: true,
        tipo: "tel",
        placeholder: "123 456 7890"
      },
      email: {
        label: "Correo Electrónico",
        requerido: true,
        tipo: "email",
        placeholder: "tu@email.com"
      },
      observaciones: {
        label: "Observaciones (opcional)",
        requerido: false,
        tipo: "textarea",
        placeholder: "Alguna alergia, preferencia alimentaria o comentario especial..."
      }
    },
    
    asistencia: {
      pregunta: "¿Asistiré al evento?",
      opciones: [
        { valor: "Si", texto: "Sí, confirmo mi asistencia" },
        { valor: "No", texto: "No podré asistir" }
      ]
    }
  },

  // Mensajes personalizados
  mensajes: {
    exito: {
      titulo: "¡Confirmación Exitosa!",
      descripcion: "Tu confirmación de asistencia ha sido registrada correctamente."
    },
    error: {
      campoRequerido: "Por favor, completa todos los campos obligatorios.",
      emailInvalido: "Por favor, ingresa un correo electrónico válido.",
      envioError: "Hubo un error al enviar tu confirmación. Por favor, intenta nuevamente."
    },
    cargando: {
      enviando: "Enviando..."
    }
  },

  // Configuración de Google Sheets
  googleSheets: {
    id: "1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM",
    columnas: {
      idInvitado: "A",
      nombre: "B", 
      email: "C",
      telefono: "D",
      asistencia: "E",
      observaciones: "H",
      fechaRegistro: "I"
    }
  },

  // Configuración de validaciones
  validaciones: {
    telefono: {
      formato: "### ### ####", // Formato de visualización
      minimoDigitos: 10
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },

  // Configuración de efectos visuales
  efectos: {
    animacionEntrada: true,
    autoCerrarModal: 3000, // 3 segundos
    transiciones: true
  }
};

// Función para aplicar configuración personalizada
function aplicarConfiguracion() {
  // Aplicar colores personalizados
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --color-primario: ${CONFIG.colores.primario};
      --color-secundario: ${CONFIG.colores.secundario};
      --color-fondo: ${CONFIG.colores.fondo};
      --color-texto: ${CONFIG.colores.texto};
      --color-exito: ${CONFIG.colores.exito};
      --color-error: ${CONFIG.colores.error};
    }
  `;
  document.head.appendChild(style);

  // Actualizar textos dinámicamente si es necesario
  document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar lógica para actualizar textos dinámicamente
    // basado en la configuración
  });
}

// Función para validar configuración
function validarConfiguracion() {
  const errores = [];
  
  if (!CONFIG.googleSheets.id) {
    errores.push("ID de Google Sheets no configurado");
  }
  
  if (!CONFIG.evento.nombre) {
    errores.push("Nombre del evento no configurado");
  }
  
  if (errores.length > 0) {
    console.warn("Configuración con problemas:", errores);
    return false;
  }
  
  return true;
}

// Aplicar configuración al cargar
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    aplicarConfiguracion();
    validarConfiguracion();
  });
}