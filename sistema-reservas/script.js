document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendanceForm');
    const modal = document.getElementById('successModal');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            email: formData.get('email'),
            observaciones: formData.get('observaciones') || '',
            asistire: formData.get('asistire')
        };

        // Validación básica
        if (!data.nombre || !data.telefono || !data.email || !data.asistire) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Mostrar indicador de carga
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // URL real del Apps Script - ¡ACTUALIZADA!
        fetch('https://script.google.com/macros/s/AKfycbxSU3OotnvCQyMnCX5Zhr92KdaDdViun8Co1uKq6d5I9NKwhrjIzcdsoY33mwXH0u7oGA/exec', {
            method: 'POST',
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                showSuccessModal();
                form.reset();
            } else {
                throw new Error(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu confirmación. Por favor, intenta nuevamente.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Validación en tiempo real para el campo de teléfono
document.getElementById('telefono').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
        }
    }
    e.target.value = value;
});

// Validación de email en tiempo real
document.getElementById('email').addEventListener('blur', function(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#e74c3c';
        if (!document.querySelector('.email-error')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'email-error';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = 'Por favor, ingresa un correo electrónico válido.';
            e.target.parentNode.appendChild(errorDiv);
        }
    } else {
        e.target.style.borderColor = '#ddd';
        const errorDiv = document.querySelector('.email-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
});

// Efectos visuales adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para el formulario
    const formContainer = document.querySelector('.form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        formContainer.style.transition = 'all 0.6s ease';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 300);
});

// Optimización para dispositivos móviles
if (window.innerWidth <= 768) {
    // Ajustar altura del viewport en móviles
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Prevenir zoom en inputs en iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px';
        });
        
        input.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });
}
