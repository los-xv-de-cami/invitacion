// Sistema de Confirmación de Asistencia
class ConfirmacionAsistencia {
    constructor() {
        this.form = document.getElementById('confirmationForm');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupConditionalFields();
    }

    bindEvents() {
        // Envío del formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Campos condicionales
        document.querySelectorAll('input[name="asistencia"]').forEach(radio => {
            radio.addEventListener('change', (e) => this.handleAsistenciaChange(e));
        });

        document.getElementById('num-acompanantes').addEventListener('change', (e) => this.handleAcompanantesChange(e));
    }

    setupConditionalFields() {
        // Inicializar campos ocultos
        this.handleAsistenciaChange();
    }

    handleAsistenciaChange() {
        const asistenciaSi = document.querySelector('input[name="asistencia"][value="si"]').checked;
        const acompañaGroup = document.getElementById('acompañantes-group');
        const nombresGroup = document.getElementById('nombres-acompanantes');
        
        if (asistenciaSi) {
            acompañaGroup.style.display = 'block';
            this.handleAcompanantesChange();
        } else {
            acompañaGroup.style.display = 'none';
            nombresGroup.style.display = 'none';
            document.getElementById('num-acompanantes').value = '0';
            document.getElementById('nombres-acompanantes-text').value = '';
        }
    }

    handleAcompanantesChange() {
        const numAcompanantes = document.getElementById('num-acompanantes').value;
        const nombresGroup = document.getElementById('nombres-acompanantes');
        
        if (parseInt(numAcompanantes) > 0) {
            nombresGroup.style.display = 'block';
            
            // Actualizar placeholder según el número
            const placeholder = numAcompanantes === '1' 
                ? 'Ej: María González' 
                : 'Ej: María González, Juan Pérez, Ana López';
            document.getElementById('nombres-acompanantes-text').placeholder = placeholder;
        } else {
            nombresGroup.style.display = 'none';
            document.getElementById('nombres-acompanantes-text').value = '';
        }
    }



    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!this.validateForm()) {
            return;
        }

        // Mostrar loading
        this.showLoading(true);

        try {
            // Recopilar datos del formulario
            const formData = this.collectFormData();
            
            // Enviar a Google Sheets
            await this.sendToGoogleSheets(formData);
            
            // Mostrar mensaje de éxito
            this.showSuccess();
            
        } catch (error) {
            console.error('Error:', error);
            this.showError('Hubo un error al enviar la confirmación. Por favor intenta de nuevo.');
        } finally {
            this.showLoading(false);
        }
    }

    validateForm() {
        const requiredFields = ['nombre', 'email', 'telefono', 'asistencia'];
        const asistenciaSi = document.querySelector('input[name="asistencia"][value="si"]').checked;
        
        // Validar campos requeridos básicos
        for (let field of requiredFields) {
            const element = document.querySelector(`[name="${field}"]`);
            if (!element || (element.type === 'radio' && !element.checked)) {
                if (element && element.type === 'radio') {
                    // Para radio buttons, verificar si alguno está seleccionado
                    const radioGroup = document.querySelectorAll(`input[name="${field}"]`);
                    const isSelected = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isSelected) {
                        this.showFieldError(field, 'Este campo es requerido');
                        return false;
                    }
                } else {
                    this.showFieldError(field, 'Este campo es requerido');
                    return false;
                }
            }
        }

        // Validar email
        const email = document.getElementById('email').value;
        if (!this.isValidEmail(email)) {
            this.showFieldError('email', 'Por favor ingresa un email válido');
            return false;
        }

        // Si confirmó asistencia, validar acompañantes si es necesario
        if (asistenciaSi) {
            const numAcompanantes = document.getElementById('num-acompanantes').value;
            if (parseInt(numAcompanantes) > 0) {
                const nombres = document.getElementById('nombres-acompanantes-text').value.trim();
                if (!nombres) {
                    this.showFieldError('nombres-acompanantes', 'Por favor especifica los nombres de tus acompañantes');
                    return false;
                }
            }
        }

        return true;
    }

    showFieldError(fieldName, message) {
        // Remover errores previos
        this.clearFieldError(fieldName);
        
        // Mostrar nuevo error
        const field = document.querySelector(`[name="${fieldName}"]`) || 
                     document.getElementById(fieldName) || 
                     document.getElementById('nombres-acompanantes-text');
        
        if (field) {
            field.style.borderColor = 'var(--error-red)';
            
            // Crear mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = 'var(--error-red)';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            
            field.parentNode.appendChild(errorDiv);
            
            // Scroll al campo con error
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            field.focus();
        }
    }

    clearFieldError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`) || 
                     document.getElementById(fieldName) ||
                     document.getElementById('nombres-acompanantes-text');
        
        if (field) {
            field.style.borderColor = 'var(--gray-border)';
            
            // Remover mensaje de error
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        // Campos básicos
        data.nombre = formData.get('nombre');
        data.email = formData.get('email');
        data.telefono = formData.get('telefono');
        data.asistencia = formData.get('asistencia');
        
        // Acompañantes
        data.num_acompanantes = formData.get('num-acompanantes') || '0';
        data.nombres_acompanantes = formData.get('nombres-acompanantes') || '';
        
        // Metadatos
        data.fecha_confirmacion = new Date().toISOString();
        data.id_invitado = this.generateGuestId();
        data.estado = 'pendiente'; // pendiente, confirmado, confirmado_con_acompanantes, no_asistira
        
        return data;
    }

    generateGuestId() {
        // Generar ID único basado en timestamp y datos aleatorios
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `CAMILA_${timestamp}_${random}`.toUpperCase();
    }

    async sendToGoogleSheets(data) {
        // Configuración de Google Apps Script Web App
        const SCRIPT_URL = 'https://script.google.com/macros/s/1lNvGPhE7tKa4HrUjny3YpdD90pRy6kUGm9yZxe2a-sM/exec';
        
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Error desconocido');
            }

            return result;
            
        } catch (error) {
            // Si falla el envío a Google Sheets, guardar localmente como respaldo
            console.warn('Error al enviar a Google Sheets:', error);
            this.saveDataLocally(data);
            
            // Aún así considerar exitoso para el usuario
            return { success: true, local_backup: true };
        }
    }

    saveDataLocally(data) {
        // Guardar en localStorage como respaldo
        const existingData = JSON.parse(localStorage.getItem('camila_confirmaciones') || '[]');
        existingData.push(data);
        localStorage.setItem('camila_confirmaciones', JSON.stringify(existingData));
        
        console.log('Datos guardados localmente como respaldo');
    }

    showLoading(show) {
        const btn = document.querySelector('.form-submit-btn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        
        if (show) {
            btn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        } else {
            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    showSuccess() {
        // Ocultar formulario
        document.querySelector('.confirmation-form-container').style.display = 'none';
        
        // Mostrar mensaje de éxito
        document.getElementById('successMessage').style.display = 'block';
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showError(message) {
        // Crear alerta de error
        const alertDiv = document.createElement('div');
        alertDiv.className = 'error-alert';
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error-red);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
            z-index: 1000;
            max-width: 300px;
            font-size: 0.9rem;
            line-height: 1.4;
        `;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 5000);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ConfirmacionAsistencia();
});
