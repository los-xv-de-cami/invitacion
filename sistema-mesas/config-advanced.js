// Archivo de configuración adicional para personalización avanzada
// Este archivo puede ser usado para extender las funcionalidades del minisite

/**
 * CONFIGURACIÓN AVANZADA
 * Opciones adicionales para personalizar el comportamiento del minisite
 */

const ADVANCED_CONFIG = {
    // Sincronización
    refreshInterval: 30000, // 30 segundos - intervalo de actualización automática
    maxRetries: 3, // Máximo número de reintentos en caso de error
    
    // Validaciones
    maxTableCapacity: 10, // Capacidad máxima por mesa
    totalTables: 25, // Número total de mesas
    requireMainGuestPresence: true, // Los acompañantes no pueden existir sin el invitado principal
    
    // Interfaz
    showEmptyTables: true, // Mostrar mesas vacías en el grid
    highlightNearFull: true, // Resaltar mesas que están casi llenas (>8 personas)
    animationDuration: 250, // Duración de animaciones en ms
    
    // Notificaciones
    toastDuration: 3000, // Duración de notificaciones en ms
    showOccupancyAlerts: true, // Mostrar alertas de ocupación
    
    // Funcionalidades experimentales
    enableBulkOperations: false, // Operaciones en lote (deseleccionar todas, etc.)
    enableTableColorCoding: false, // Codificación por colores según ocupación
    enableCompactMode: false // Modo compacto para pantallas pequeñas
};

/**
 * EXTENSIONES DE FUNCIONALIDAD
 */

// Función para manejar el modo compacto
function toggleCompactMode() {
    const body = document.body;
    const isCompact = body.classList.toggle('compact-mode');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('compactMode', isCompact);
    
    // Aplicar estilos compactos si está habilitado
    if (isCompact) {
        body.classList.add('compact-mode');
    } else {
        body.classList.remove('compact-mode');
    }
}

// Función para operaciones en lote
function bulkOperations() {
    if (!ADVANCED_CONFIG.enableBulkOperations) return;
    
    const modal = createModal('Operaciones en Lote', `
        <div class="bulk-operations">
            <button onclick="clearAllAssignments()" class="btn-danger">
                Limpiar todas las asignaciones
            </button>
            <button onclick="autoDistributeGuests()" class="btn-primary">
                Distribución automática equilibrada
            </button>
            <button onclick="showOccupancyReport()" class="btn-secondary">
                Reporte de ocupación
            </button>
        </div>
    `);
    
    modal.show();
}

// Distribución automática equilibrada
async function autoDistributeGuests() {
    const unassignedGuests = state.guests.filter(guest => !state.assignments.has(guest.id));
    
    if (unassignedGuests.length === 0) {
        showToast('No hay invitados sin asignar', 'warning');
        return;
    }
    
    // Ordenar mesas por ocupación actual (menor a mayor)
    const availableTables = state.tables
        .map(table => ({
            table,
            currentSize: table.guests.reduce((total, guest) => total + 1 + guest.companions.length, 0)
        }))
        .filter(item => item.currentSize < ADVANCED_CONFIG.maxTableCapacity)
        .sort((a, b) => a.currentSize - b.currentSize);
    
    // Asignar cada invitado a la mesa con más espacio disponible
    for (const guest of unassignedGuests) {
        const guestSize = 1 + guest.companions.length;
        
        // Buscar la primera mesa que tenga espacio
        const availableTable = availableTables.find(item => 
            item.currentSize + guestSize <= ADVANCED_CONFIG.maxTableCapacity
        );
        
        if (availableTable) {
            // Asignar a la mesa
            availableTable.table.guests.push(guest);
            state.assignments.set(guest.id, availableTable.table.number);
            availableTable.currentSize += guestSize;
        } else {
            // Si no hay mesa disponible, asignar a la primera mesa con más espacio
            const smallestTable = availableTables[availableTables.length - 1];
            if (smallestTable) {
                smallestTable.table.guests.push(guest);
                state.assignments.set(guest.id, smallestTable.table.number);
                smallestTable.currentSize += guestSize;
            }
        }
    }
    
    renderGuestList();
    renderTables();
    showToast(`Asignación automática completada para ${unassignedGuests.length} invitados`, 'success');
}

// Crear modal para UI extendida
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-eliminar al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return {
        show: () => modal.classList.add('show'),
        hide: () => modal.classList.remove('show'),
        remove: () => modal.remove()
    };
}

// Reporte de ocupación
function showOccupancyReport() {
    const stats = getOccupancyStatistics();
    
    const report = `
        <div class="occupancy-report">
            <h4>Estadísticas de Ocupación</h4>
            <p><strong>Total de mesas:</strong> ${stats.totalTables}</p>
            <p><strong>Mesas completas:</strong> ${stats.fullTables}</p>
            <p><strong>Mesas vacías:</strong> ${stats.emptyTables}</p>
            <p><strong>Promedio de ocupación:</strong> ${stats.averageOccupancy.toFixed(1)} personas/mesa</p>
            <p><strong>Invitados asignados:</strong> ${stats.assignedGuests}</p>
            <p><strong>Invitados pendientes:</strong> ${stats.unassignedGuests}</p>
        </div>
    `;
    
    const modal = createModal('Reporte de Ocupación', report);
    modal.show();
}

// Calcular estadísticas de ocupación
function getOccupancyStatistics() {
    const totalTables = state.tables.length;
    const emptyTables = state.tables.filter(table => table.guests.length === 0).length;
    const fullTables = state.tables.filter(table => {
        const size = table.guests.reduce((total, guest) => total + 1 + guest.companions.length, 0);
        return size >= ADVANCED_CONFIG.maxTableCapacity;
    }).length;
    
    const totalAssignedSize = state.tables.reduce((total, table) => {
        return total + table.guests.reduce((size, guest) => size + 1 + guest.companions.length, 0);
    }, 0);
    
    const averageOccupancy = totalAssignedSize / totalTables;
    const assignedGuests = state.assignments.size;
    const unassignedGuests = state.guests.length - assignedGuests;
    
    return {
        totalTables,
        emptyTables,
        fullTables,
        averageOccupancy,
        assignedGuests,
        unassignedGuests
    };
}

// Aplicar preferencias guardadas
function loadUserPreferences() {
    const compactMode = localStorage.getItem('compactMode');
    if (compactMode === 'true') {
        document.body.classList.add('compact-mode');
    }
}

// Exportar configuración (para uso en otros archivos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ADVANCED_CONFIG };
}

/**
 * CSS ADICIONAL PARA FUNCIONES AVANZADAS
 * Agregar estos estilos a styles.css si se usan las funcionalidades avanzadas
 */

/*
.compact-mode .guest-card {
    padding: var(--spacing-xs);
    font-size: 12px;
}

.compact-mode .table-card {
    padding: var(--spacing-sm);
    min-height: 150px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: white;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-default);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: auto;
}

.modal-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--neutral-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    padding: var(--spacing-lg);
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--neutral-600);
}

.bulk-operations {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.btn-danger {
    background: var(--error-500);
    color: white;
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
}

.btn-secondary {
    background: var(--neutral-600);
    color: white;
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
}

.occupancy-report {
    line-height: 1.6;
}

.occupancy-report h4 {
    margin-bottom: var(--spacing-md);
    color: var(--neutral-900);
}

.occupancy-report p {
    margin-bottom: var(--spacing-sm);
}
*/