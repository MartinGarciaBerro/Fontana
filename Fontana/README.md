# Fontana y Asociados - Estudio Contable

MVP de sitio web para Fontana y Asociados, estudio contable profesional con más de 20 años de experiencia.

## 🚀 Estructura del Proyecto

```
Fontana/
├── index.html              # Página principal
├── servicios.html          # Página de servicios
├── quienes-somos.html      # Página quiénes somos
├── contacto.html           # Página de contacto
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── scripts.js          # JavaScript funcional
├── img/
│   └── icons/              # Iconos SVG y referencia
└── README.md               # Este archivo
```

## ✨ Características

### Diseño
- ✅ Diseño minimalista y moderno
- ✅ Responsive design (desktop, tablet, móvil)
- ✅ Tipografía clara (Inter)
- ✅ Paleta de colores profesional
- ✅ Espaciado y jerarquía visual optimizada

### Funcionalidades
- ✅ Navegación fluida entre páginas
- ✅ Animaciones suaves (fade-in, hover effects)
- ✅ Botón flotante de WhatsApp
- ✅ Botón scroll to top
- ✅ Formulario de contacto con validaciones
- ✅ Menú hamburguesa para móvil

### Secciones
- ✅ **Inicio**: Resumen con enlaces a todas las secciones
- ✅ **Servicios**: Listado completo con iconos y descripciones
- ✅ **Quiénes Somos**: Presentación del equipo y empresa
- ✅ **Contacto**: Formulario y información de contacto

### Tecnologías
- ✅ HTML5 semántico
- ✅ CSS3 con variables personalizadas
- ✅ JavaScript vanilla (ES6+)
- ✅ FontAwesome 6 para iconos
- ✅ Google Fonts (Inter)

## 🎨 Iconos

Se incluyen iconos tanto en formato FontAwesome como SVG:

### Servicios Principales
- 📊 Contabilidad General (`fa-calculator`)
- 📈 Auditoría (`fa-chart-line`)
- 💼 Consultoría Fiscal (`fa-file-invoice-dollar`)
- 🏢 Constitución de Empresas (`fa-building`)
- 👥 Recursos Humanos (`fa-users`)
- 🤝 Consultoría Empresarial (`fa-handshake`)

**Ver referencia completa**: `img/icons/icons-reference.html`

## 🛠️ Personalización

### Colores
Editar variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... más variables */
}
```

### Contenido
1. **Textos**: Editar directamente en los archivos HTML
2. **Imágenes**: Reemplazar fotos del equipo en la sección correspondiente
3. **Datos de contacto**: Actualizar en `contacto.html` y footer

### WhatsApp
Cambiar número de teléfono en `js/scripts.js`:
```javascript
const phoneNumber = '5491123456789'; // Cambiar por el número real
```

## 📱 Responsive Design

El sitio se adapta automáticamente a:
- **Desktop**: ≥ 1024px
- **Tablet**: 768px - 1023px  
- **Móvil**: < 768px

## 🎯 SEO y Accesibilidad

- ✅ Meta tags optimizados
- ✅ Etiquetas semánticas HTML5
- ✅ Alt text en imágenes
- ✅ ARIA labels donde corresponde
- ✅ Contrast ratio adecuado
- ✅ Navegación por teclado

## 🚀 Puesta en Marcha

1. **Abrir en navegador**: Hacer doble clic en `index.html`
2. **Servidor local** (recomendado):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (live-server)
   npx live-server
   ```
3. **Modificar contenidos**: Editar archivos HTML directamente

## 📋 Lista de Tareas Pendientes

Para completar la implementación:

- [ ] Reemplazar fotos placeholder del equipo
- [ ] Actualizar datos de contacto reales
- [ ] Configurar envío real del formulario
- [ ] Agregar Google Maps real
- [ ] Crear favicon personalizado
- [ ] Optimizar imágenes
- [ ] Configurar Google Analytics (opcional)

## 🔧 Extensiones Recomendadas

Para desarrollo futuro:
- **CMS**: WordPress, Strapi
- **Backend**: Node.js, PHP
- **Base de datos**: Para formularios de contacto
- **CDN**: Para mejorar velocidad de carga
- **SSL**: Certificado de seguridad

## 📞 Soporte

Para modificaciones o dudas sobre el código:
- Revisar comentarios en CSS y JavaScript
- Consultar `img/icons/icons-reference.html` para iconos
- Usar herramientas de desarrollo del navegador (F12)

---

**Fontana y Asociados** - Estudio Contable Profesional  
© 2024 - Todos los derechos reservados
