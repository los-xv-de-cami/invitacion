// COPIA TODO ESTE CONTENIDO AL ARCHIVO script.js EN TU GITHUB
// Reemplaza completamente el archivo script.js en tu repositorio

// Configuration
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzy61tx2z-X7roOyl-c-0tuTSWuWY7omGfpSsx7NjezeWVewn8zj6c4xHvUTGlG8Fnj/exec',
  EVENT_NAME: 'Los XV Años de Camila'
};

// Utility Functions
function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function showError(message) {
  const ticketCard = document.querySelector('.ticket-card');
  const errorMessage = document.getElementById('errorMessage');
  
  if (ticketCard) {
    ticketCard.style.display = 'none';
  }
  
  if (errorMessage) {
    errorMessage.style.display = 'block';
    const errorContent = errorMessage.querySelector('.error-content p');
    if (errorContent) {
      errorContent.textContent = message;
    }
  }
}

function formatAcompanantes(nombresAcompanantes) {
  if (!nombresAcompanantes || nombresAcompanantes.trim() === '') {
    return 'Solo';
  }
  
  // Contar nombres separados por comas
  const nombres = nombresAcompanantes.split(',').map(n => n.trim()).filter(n => n.length > 0);
  const total = nombres.length;
  
  if (total === 1) {
    return `+${total}`;
  } else {
    return `+${total}`;
  }
}

function generateQRCode(invitadoId, guestName) {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;
  
  // Limpiar contenedor
  qrContainer.innerHTML = '';
  
  // Crear datos del QR - SIMPLIFICADOS con info del evento 2026
  const qrText = `XV Cami|14-Feb-2026-Sab|${invitadoId}|${guestName}`;
  
  // Generar QR
  new QRCode(qrContainer, {
    text: qrText,
    width: 200,
    height: 200,
    colorDark: "#0A0A0A",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// Data Functions
async function fetchGuestData(invitadoId) {
  try {
    // CAMBIO: Usar GET en lugar de POST para evitar problemas de CORS
    const url = `${CONFIG.APPS_SCRIPT_URL}?id=${encodeURIComponent(invitadoId)}&t=${Date.now()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const responseText = await response.text();
    console.log('Respuesta del servidor:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Error parseando JSON:', e);
      throw new Error('Respuesta inválida del servidor');
    }
    
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener datos');
    }
    
    return data.guestData;
  } catch (error) {
    console.error('Error fetching guest data:', error);
    throw error;
  }
}

function updateGuestDisplay(guestData) {
  // Actualizar nombre del invitado
  const guestNameElement = document.getElementById('guestName');
  if (guestNameElement && guestData.Nombre) {
    guestNameElement.textContent = guestData.Nombre;
  }
  
  // Actualizar mesa asignada
  const mesaElement = document.getElementById('mesaAsignada');
  if (mesaElement && guestData.Mesa_Asignada) {
    mesaElement.textContent = guestData.Mesa_Asignada;
  }
  
  // Actualizar acompañantes
  const acompElement = document.getElementById('acompanantes');
  if (acompElement && guestData.Nombres_Acompanantes !== undefined) {
    acompElement.textContent = formatAcompanantes(guestData.Nombres_Acompanantes);
  }
}

async function loadInvitation() {
  const invitadoId = getParameterByName('id');
  
  if (!invitadoId) {
    showError('No se proporcionó un ID de invitado válido.');
    return;
  }
  
  try {
    // Mostrar loading state
    const guestNameElement = document.getElementById('guestName');
    if (guestNameElement) {
      guestNameElement.textContent = 'Cargando invitación...';
    }
    
    // Obtener datos del invitado
    const guestData = await fetchGuestData(invitadoId);
    
    if (!guestData) {
      showError('No se encontraron datos para este invitado.');
      return;
    }
    
    // Actualizar la pantalla con los datos
    updateGuestDisplay(guestData);
    
    // Generar código QR
    generateQRCode(invitadoId, guestData.Nombre || 'Invitado');
    
  } catch (error) {
    console.error('Error loading invitation:', error);
    
    let errorMessage = 'Ocurrió un error al cargar tu invitación. ';
    
    if (error.message.includes('404')) {
      errorMessage += 'Verifica que el enlace sea correcto.';
    } else if (error.message.includes('500')) {
      errorMessage += 'Error del servidor. Intenta más tarde.';
    } else {
      errorMessage += 'Por favor, contacta a los organizadores.';
    }
    
    showError(errorMessage);
  }
}

// Add to home screen functionality
function addToHomeScreen() {
  // This function can be enhanced to add a "Add to Home Screen" button
  if ('serviceWorker' in navigator) {
    // Service worker registration for PWA capabilities
    console.log('PWA support detected');
  }
}

// Print functionality
function setupPrintButton() {
  const printButton = document.createElement('button');
  printButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6,9 6,2 18,2 18,9"/>
      <path d="M6,18H4a2,2 0 0,1-2-2v-5a2,2 0 0,1,2-2H20a2,2 0 0,1,2,2v5a2,2 0 0,1-2,2H18"/>
      <polyline points="6,14 18,14"/>
    </svg>
    Imprimir Invitación
  `;
  printButton.className = 'print-button';
  printButton.onclick = () => window.print();
  
  // Add print styles
  const printStyles = `
    <style>
      @media print {
        body { background: white !important; }
        .no-print { display: none !important; }
        .ticket-card { 
          box-shadow: none !important; 
          border: 1px solid #ccc !important;
          margin: 0 !important;
        }
      }
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', printStyles);
}

// Share functionality
function setupShareButton() {
  if (navigator.share) {
    const shareButton = document.createElement('button');
    shareButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      Compartir
    `;
    shareButton.className = 'share-button';
    shareButton.onclick = async () => {
      try {
        await navigator.share({
          title: 'Mi Invitación - Los XV Años de Camila',
          text: 'Mira mi invitación para los XV Años de Camila',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Invitación Digital - Los XV Años de Camila');
  
  // Check if we're on the invitation page
  const isInvitationPage = window.location.pathname.includes('invitacion.html') || 
                          window.location.search.includes('id=');
  
  if (isInvitationPage) {
    loadInvitation();
    setupPrintButton();
    setupShareButton();
  }
  
  addToHomeScreen();
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment if you want to add PWA capabilities
    // navigator.serviceWorker.register('/sw.js');
  });
}
