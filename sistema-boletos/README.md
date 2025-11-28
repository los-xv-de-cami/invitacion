# Invitación Digital - Los XV Años de Camila

## Archivos Finales

Este directorio contiene los archivos finales del sistema de invitación digital:

### Archivos Web
- `index.html` - Página principal con acceso al sistema de invitaciones
- `admin.html` - Panel de administración para generar enlaces personalizados
- `invitacion.html` - Página de invitación personalizada (sin título duplicado)
- `script.js` - JavaScript funcional con todas las correcciones aplicadas
- `styles.css` - Estilos con azul intensificado y layout responsivo
- `logo-camila.png` - Logo oficial del evento

### Backend
- `apps-script.js` - Código para Google Apps Script (backend)

## Características Implementadas

✅ Página principal elegante con acceso al sistema  
✅ **Panel de Administración** para gestión de enlaces personalizados  
✅ **Filtrado automático** de invitados confirmados ("Si" en columna E)  
✅ **Generación masiva** de enlaces y códigos QR  
✅ **Exportación CSV** de enlaces para distribución masiva  
✅ **Búsqueda y filtrado** de invitados confirmados  
✅ Integración completa con Google Sheets  
✅ Sistema QR funcional (formato simplificado)  
✅ Layout responsivo (fila horizontal en desktop, columna en móvil)  
✅ Fecha corregida: "Sábado 14 de Febrero, 2026"  
✅ Diseño limpio sin título duplicado  
✅ Colores azul intensificado  
✅ Conexión CORS resuelta  
✅ Validación de IDs de invitado  
✅ Diseño mobile-first y profesional  

## URLs del Sistema

- **Página Principal**: `https://los-xv-de-cami.github.io/sistema-boletos/`
- **Panel de Administración**: `https://los-xv-de-cami.github.io/sistema-boletos/admin.html`
- **Invitación Individual**: `https://los-xv-de-cami.github.io/sistema-boletos/invitacion.html?id=ID_INVITADO`

## Flujo de Trabajo

### 1. **Configuración Inicial**
- Subir archivos a GitHub Pages
- Configurar Google Apps Script con `SPREADSHEET_ID` real
- Verificar columna E "Asistencia" con valores "Si"/"No"

### 2. **Gestión de Invitados**
- Acceder al **Panel de Administración**
- Ver lista de invitados confirmados
- Generar enlaces personalizados
- Copiar o exportar enlaces para distribución

### 3. **Distribución**
- Enviar enlaces personalizados por WhatsApp/Email
- Mensaje sugerido incluido en `ADMIN_README.md`
- Guests acceden a sus invitaciones desde cualquier dispositivo

## Despliegue

1. Subir archivos .html, .css, .js a GitHub Pages
2. Subir logo-camila.png
3. Configurar Google Apps Script con los datos reales
4. Configurar columna E "Asistencia" en Google Sheets
5. Acceder al Panel de Administración para generar enlaces

**Documentación detallada:**
- `/docs/ENTREGA_FINAL_SISTEMA.md` - Instrucciones generales
- `ADMIN_README.md` - Guía del Panel de Administración