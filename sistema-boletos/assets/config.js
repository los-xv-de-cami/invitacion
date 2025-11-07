/**
 * Archivo de Configuración - Sistema de Boletos Quinceañera
 * 
 * INSTRUCCIONES:
 * 1. Actualiza los valores según tu evento
 * 2. No cambies las claves (keys) de los objetos
 * 3. Guarda este archivo y los cambios se aplicarán automáticamente
 */

const EVENT_CONFIG = {
    // ========================================
    // INFORMACIÓN DEL EVENTO
    // ========================================
    eventName: "XV Años de Camila",
    eventDate: "2025-12-15", // Formato: YYYY-MM-DD
    eventTime: "19:00", // Formato: HH:MM
    eventLocation: "Salón de Eventos Los Rosales",
    eventAddress: "Av. Principal 123, Ciudad, Estado",
    
    // ========================================
    // CAPACIDAD Y MESAS
    // ========================================
    maxGuests: 250,           // Capacidad máxima total
    tablesCount: 25,          // Número de mesas disponibles
    guestsPerTable: 10,       // Personas por mesa
    
    // ========================================
    // COLORES DEL TEMA
    // ========================================
    colors: {
        primary: "#D4AF37",        // Dorado principal
        primaryDark: "#B8941F",    // Dorado oscuro
        secondary: "#2C3E50",      // Azul oscuro
        success: "#27AE60",        // Verde para confirmaciones
        warning: "#F39C12",        // Amarillo para pendientes
        danger: "#E74C3C",         // Rojo para rechazos
        textPrimary: "#2C3E50",    // Texto principal
        textSecondary: "#6C757D"   // Texto secundario
    },
    
    // ========================================
    // CONFIGURACIÓN DE EMAILS
    // ========================================
    email: {
        from: "camila@quinceañera.com",      // Email de origen
        adminEmail: "admin@quinceañera.com", // Email del administrador
        fromName: "XV Años de Camila",       // Nombre que aparece en emails
        replyTo: "info@quinceañera.com"      // Email para respuestas
    },
    
    // ========================================
    // GOOGLE SHEETS Y APPS SCRIPT
    // ========================================
    sheets: {
        spreadsheetId: "",     // ACTUALIZAR: ID de tu Google Sheets
        sheetName: "Confirmaciones",
        scriptUrl: ""          // ACTUALIZAR: URL del Web App de Apps Script
    },
    
    // ========================================
    // CONFIGURACIÓN DE BOLETOS
    // ========================================
    tickets: {
        includeQR: true,           // Incluir código QR
        includePhoto: true,        // Incluir foto de la quinceañera
        includeTable: true,        // Mostrar mesa asignada
        includeEventInfo: true,    // Información del evento
        includeLogo: true,         // Logo en el boleto
        qrSize: 120,              // Tamaño del QR en píxeles
        ticketWidth: 400,         // Ancho del boleto en píxeles
        ticketHeight: 600         // Alto del boleto en píxeles
    },
    
    // ========================================
    // CONFIGURACIÓN DEL FORMULARIO
    // ========================================
    form: {
        requirePhone: true,        // Teléfono obligatorio
        requireName: true,         // Nombre obligatorio
        maxCompanions: 9,         // Máximo acompañantes permitidos
        allowDietaryRestrictions: true,     // Permitir restricciones alimentarias
        allowSpecialNeeds: true,            // Permitir necesidades especiales
        confirmationMessage: "Gracias por confirmar tu asistencia. Recibirás un correo de confirmación pronto.",
        ticketDeliveryMessage: "Los boletos electrónicos serán enviados unos días antes del evento."
    },
    
    // ========================================
    // CONFIGURACIÓN DE LA GALERÍA (Opcional)
    // ========================================
    gallery: {
        enabled: false,            // Habilitar galería de fotos
        photos: [],                // Array de URLs de fotos
        allowGuestUploads: false,  // Permitir que invitados suban fotos
        moderationRequired: true   // Moderación de fotos de invitados
    },
    
    // ========================================
    // REDES SOCIALES (Opcional)
    // ========================================
    social: {
        hashtag: "#XVAnosDeCamila",     // Hashtag del evento
        instagram: "",                  // URL de Instagram
        facebook: "",                   // URL de Facebook
        tiktok: "",                     // URL de TikTok
        tiktokUser: "@camila_xv"        // Usuario de TikTok
    },
    
    // ========================================
    // CONFIGURACIÓN AVANZADA
    // ========================================
    advanced: {
        autoAssignTables: true,         // Habilitar asignación automática
        requireTableAssignment: true,   // Requerir asignación de mesa
        sendReminderEmails: true,       // Enviar recordatorios por email
        reminderDays: [7, 3, 1],        // Días antes del evento para recordatorios
        showPublicStats: false,         // Mostrar estadísticas públicas
        enableGuestList: true,          // Habilitar lista de invitados
        enableLiveCheckIn: true         // Habilitar check-in en vivo
    },
    
    // ========================================
    // MENSAJES PERSONALIZADOS
    // ========================================
    messages: {
        welcome: "¡Estás invitado a celebrar conmigo mis XV Años!",
        invitation: "Te invitamos a acompañarnos en este día tan especial.",
        confirmationThanks: "¡Gracias por confirmar tu asistencia!",
        ticketDelivery: "Recibe tus boletos electrónicos días antes del evento.",
        finalMessage: "¡Esperamos verte en mi celebración!",
        
        // Mensajes para administración
        adminNewGuest: "Nueva confirmación recibida",
        adminGuestDeclined: "Invitado confirmó que no asistirá",
        adminTableAssigned: "Mesa asignada exitosamente",
        adminTicketsGenerated: "Boletos generados correctamente"
    },
    
    // ========================================
    // RESTRICCIONES ALIMENTARIAS PERSONALIZADAS
    // ========================================
    dietaryOptions: [
        { value: "vegetariano", label: "Vegetariano" },
        { value: "vegano", label: "Vegano" },
        { value: "sin-gluten", label: "Sin gluten" },
        { value: "sin-lactosa", label: "Sin lactosa" },
        { value: "diabetes", label: "Diabetes" },
        { value: "alergia-nueces", label: "Alergia a nueces" },
        { value: "alergia-mariscos", label: "Alergia a mariscos" },
        { value: "halal", label: "Alimentación Halal" },
        { value: "kosher", label: "Alimentación Kosher" },
        { value: "otra", label: "Otra (especificar)" }
    ]
};

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Actualiza automáticamente la configuración
 * Esta función debe llamarse al cargar las páginas
 */
function applyEventConfig() {
    // Aplicar colores CSS
    const root = document.documentElement;
    if (root) {
        Object.entries(EVENT_CONFIG.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
    }
    
    // Actualizar textos del evento
    const elements = {
        'event-name': EVENT_CONFIG.eventName,
        'event-date': formatEventDate(EVENT_CONFIG.eventDate),
        'event-time': EVENT_CONFIG.eventTime,
        'event-location': EVENT_CONFIG.eventLocation
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

/**
 * Formatea la fecha del evento para mostrar
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatEventDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Obtiene el tiempo restante hasta el evento
 * @returns {Object} Objeto con días, horas, minutos
 */
function getTimeUntilEvent() {
    const eventDateTime = new Date(`${EVENT_CONFIG.eventDate}T${EVENT_CONFIG.eventTime}:00`);
    const now = new Date();
    const diff = eventDateTime - now;
    
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, expired: true };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes, expired: false };
}

/**
 * Calcula estadísticas del evento
 * @param {Array} guests - Array de invitados
 * @returns {Object} Estadísticas calculadas
 */
function calculateEventStats(guests) {
    if (!guests || guests.length === 0) {
        return {
            totalInvitations: 0,
            confirmed: 0,
            declined: 0,
            pending: 0,
            totalGuests: 0,
            tablesNeeded: 0,
            dietaryRestrictions: {}
        };
    }
    
    const confirmed = guests.filter(g => g.estado === 'confirmado');
    const declined = guests.filter(g => g.estado === 'no_asistira');
    const pending = guests.filter(g => g.estado === 'pendiente');
    
    const totalGuests = confirmed.reduce((sum, g) => {
        return sum + parseInt(g.num_acompanantes) + 1;
    }, 0);
    
    const tablesNeeded = Math.ceil(totalGuests / EVENT_CONFIG.guestsPerTable);
    
    // Contar restricciones alimentarias
    const dietaryRestrictions = {};
    guests.forEach(guest => {
        if (guest.restricciones_alimentarias) {
            const restrictions = guest.restricciones_alimentarias.split(', ');
            restrictions.forEach(restriction => {
                const clean = restriction.trim();
                dietaryRestrictions[clean] = (dietaryRestrictions[clean] || 0) + 1;
            });
        }
    });
    
    return {
        totalInvitations: guests.length,
        confirmed: confirmed.length,
        declined: declined.length,
        pending: pending.length,
        totalGuests,
        tablesNeeded,
        dietaryRestrictions
    };
}

/**
 * Valida la configuración antes de usar
 * @returns {Object} Resultado de la validación
 */
function validateConfig() {
    const errors = [];
    const warnings = [];
    
    // Verificar información esencial
    if (!EVENT_CONFIG.eventName.trim()) {
        errors.push("El nombre del evento es requerido");
    }
    
    if (!EVENT_CONFIG.eventDate) {
        errors.push("La fecha del evento es requerida");
    }
    
    if (!EVENT_CONFIG.sheets.spreadsheetId) {
        warnings.push("Spreadsheet ID no configurado - el sistema usará datos de prueba");
    }
    
    if (!EVENT_CONFIG.sheets.scriptUrl) {
        warnings.push("URL del script no configurada - el envío de datos podría fallar");
    }
    
    // Verificar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EVENT_CONFIG.email.from)) {
        errors.push("Email de origen no válido");
    }
    
    // Verificar capacidad
    if (EVENT_CONFIG.maxGuests < 1) {
        errors.push("La capacidad máxima debe ser al menos 1");
    }
    
    if (EVENT_CONFIG.tablesCount < 1) {
        errors.push("El número de mesas debe ser al menos 1");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Exporta la configuración para usar en otros archivos
 */
function exportConfig() {
    return {
        ...EVENT_CONFIG,
        validation: validateConfig(),
        timeUntilEvent: getTimeUntilEvent(),
        timestamp: new Date().toISOString()
    };
}

// ========================================
// INICIALIZACIÓN AUTOMÁTICA
// ========================================

// Aplicar configuración automáticamente cuando se carga la página
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', applyEventConfig);
}

// Para uso en Node.js (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EVENT_CONFIG,
        applyEventConfig,
        formatEventDate,
        getTimeUntilEvent,
        calculateEventStats,
        validateConfig,
        exportConfig
    };
}