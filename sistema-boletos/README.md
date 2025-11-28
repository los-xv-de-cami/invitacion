# 🎉 Invitación Digital - Los XV Años de Camila

Un sistema completo de invitaciones digitales con códigos QR personalizados para eventos de XV años.

## 📋 Descripción

Este proyecto permite a los invitados acceder a su invitación digital personalizada a través de un link único. Cada invitación muestra:
- ✨ Nombre del invitado
- 🪑 Mesa asignada
- 👥 Nombres de acompañantes
- 📱 Código QR para acceso al evento
- 📅 Información del evento (fecha, hora, lugar)

## 🚀 Características

- **📱 Diseño Mobile-First**: Optimizado para dispositivos móviles
- **🎨 Diseño Elegante**: Colores azul pastel con acentos dorado y negro
- **📊 Integración Google Sheets**: Datos administrados desde Google Sheets
- **🔗 Links Personalizados**: Cada invitado tiene su URL única
- **📷 Códigos QR**: Generación automática de QR codes
- **⚡ Rápido y Seguro**: Google Apps Script para backend
- **🖨️ Funcionalidad de Impresión**: Para invitados que prefieran llevar printed

## 🛠️ Instalación y Configuración

### Paso 1: Preparar Google Sheets

1. **Crear o usar tu hoja de Google Sheets existente**
2. **Configurar las columnas en este orden:**
   - Columna A: `ID_Invitado` (ejemplo: MARIA_GARCIA)
   - Columna B: `Nombre` (Nombre completo del invitado)
   - Columna G: `Nombres_Acompanantes` (separados por comas)
   - Columna K: `Mesa_Asignada` (número de mesa)

3. **Ejemplo de datos:**
   ```
   ID_Invitado    | Nombre             | ... | Nombres_Acompanantes    | ... | Mesa_Asignada
   MARIA_GARCIA   | María García López | ... | Juan García, Ana García | ... | 5
   JUAN_PEREZ     | Juan Pérez Martín  | ... | Laura Pérez             | ... | 12
   ```

### Paso 2: Configurar Google Apps Script

1. **Ir a [Google Apps Script](https://script.google.com/)**
2. **Crear un nuevo proyecto**
3. **Copiar el contenido del archivo `apps-script.js`**
4. **Reemplazar `TU_ID_DE_HOJA_DE_CALCULO_AQUI` con el ID real de tu Google Sheet:**
   - El ID está en la URL: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`
5. **Ejecutar `testConnection()` para verificar**
6. **Desplegar como Web App:**
   - Ir a `Deploy > New deployment`
   - Seleccionar tipo: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
   - Hacer clic en `Deploy`
7. **Copiar la URL del Web App**

### Paso 3: Configurar el Sitio Web

1. **Editar el archivo `script.js`**
2. **Reemplazar `TU_URL_DEL_APPS_SCRIPT_AQUI` con la URL de tu Web App**
3. **Personalizar la información del evento en `script.js`:**
   ```javascript
   const CONFIG = {
     APPS_SCRIPT_URL: 'TU_URL_AQUI',
     EVENT_NAME: 'Los XV Años de Camila'
   };
   ```

### Paso 4: Personalizar Información del Evento

En `invitacion.html`, actualizar:
- **Fecha**: `Sábado 15 de Marzo, 2025`
- **Hora**: `7:00 PM`
- **Lugar**: `Salón Elegance`

### Paso 5: Subir el Sitio Web

**Opciones recomendadas:**

1. **GitHub Pages** (Gratis)
   - Subir archivos a un repositorio
   - Habilitar GitHub Pages en settings
   - Obtener URL: `usuario.github.io/repositorio`

2. **Netlify** (Gratis)
   - Arrastrar carpeta al sitio de Netlify
   - Obtener URL automática

3. **Vercel** (Gratis)
   - Conectar con GitHub o subir archivos
   - URL automática

4. **Hosting tradicional**
   - Subir archivos vía FTP
   - Usar dominio personalizado

## 📝 Estructura de Archivos

```
/
├── index.html          # Página principal
├── invitacion.html     # Página del boleto individual
├── styles.css          # Estilos del sitio
├── script.js           # Lógica del cliente
├── apps-script.js      # Código del servidor (Google Apps Script)
├── README.md           # Este archivo
└── user_input_files/
    └── logo-camila.png # Logo del evento
```

## 🔗 Estructura de URLs

- **Página principal**: `tusitio.com/`
- **Invitación individual**: `tusitio.com/invitacion.html?id=ID_INVITADO`
- **Ejemplo**: `misitio.com/invitacion.html?id=MARIA_GARCIA`

## 📋 Guía de Envío de Enlaces

Para cada invitado, enviar:
```
¡Hola [NOMBRE]! 👑

Estás invitado a Los XV Años de Camila

Tu invitación digital está lista:
[tu-sitio-web.com/invitacion.html?id=ID_DEL_INVITADO]

¡Esperamos verte en esta celebración especial! 🎉
```

## 🧪 Funciones de Prueba

### Google Apps Script:
- `testConnection()` - Verificar conexión con la hoja
- `testGetGuestData()` - Probar con un ID específico
- `validateSheetData()` - Validar formato de datos
- `getSheetStats()` - Obtener estadísticas

### Sitio Web:
- Visitar página principal para verificar diseño
- Probar enlaces con IDs existentes
- Verificar generación de QR codes
- Probar en diferentes dispositivos

## 🎨 Personalización

### Colores
Los colores se definen en `styles.css`:
```css
:root {
  --primary-100: #F0F4F8;  /* Azul pastel claro */
  --primary-500: #B4CDE6;  /* Azul pastel medio */
  --primary-900: #4A6C8C;  /* Azul pastel oscuro */
  --accent-gold-gradient: linear-gradient(145deg, #EADCA6 0%, #C7A65D 100%);
  --accent-black: #0A0A0A; /* Negro */
}
```

### Tipografía
- **Títulos**: Cormorant Garamond (serif elegante)
- **Cuerpo**: Inter (sans-serif moderna)

### Logo
Reemplazar `user_input_files/logo-camila.png` con tu logo (se recomienda fondo transparente, PNG)

## 📱 Características Móviles

- Diseño responsive
- Códigos QR optimizados para cámara
- Navegación táctil
- Carga rápida
- Compatible con iOS y Android

## 🔒 Seguridad

- Acceso solo por ID único
- Validación de datos del servidor
- HTTPS requerido para producción
- No se exponen datos sensibles

## 📊 Monitoreo

Para monitorear acceso:
1. **Google Apps Script Logs**: Ver en `Executions` tab
2. **Sheets Analytics**: Google Sheets tiene estadísticas
3. **Hosting Analytics**: Configurar Google Analytics si es necesario

## 🐛 Solución de Problemas

### "Error 404 - Invitado no encontrado"
- Verificar que el ID existe en la hoja
- Confirmar coincidencia exacta (case-sensitive)

### "Error 500 - Error del servidor"
- Verificar configuración del Web App
- Comprobar permisos de la hoja
- Revisar logs en Google Apps Script

### "QR Code no se genera"
- Verificar que QRCode.js se carga correctamente
- Comprobar consola del navegador para errores

### "No se puede conectar con Google Sheets"
- Verificar SPREADSHEET_ID en `apps-script.js`
- Comprobar permisos del script
- Ejecutar `testConnection()`

## 📞 Soporte

Para soporte técnico:
1. Revisar este README
2. Verificar configuración paso a paso
3. Comprobar consola del navegador para errores
4. Revisar logs de Google Apps Script

## 🎯 Próximas Mejoras

- [ ] Panel de administración
- [ ] Notificaciones automáticas
- [ ] Estadísticas de asistencia
- [ ] Tema personalizado por temporada
- [ ] Integración con redes sociales
- [ ] App móvil nativa

## 📄 Licencia

Proyecto creado para Los XV Años de Camila - Uso personal y familiar.

---

**🎉 ¡Que tengas una celebración hermosa y memorable! 🎉**