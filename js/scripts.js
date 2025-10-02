// Fontana y Asociados - JavaScript para funcionalidades interactivas
// Animaciones, botones flotantes y validaciones

document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const contactForm = document.querySelector('.contact-form');
    
    // Función para mostrar/ocultar menú móvil
    function initMobileMenu() {
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Cerrar menú al hacer clic en un enlace
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    // Función para botón scroll to top
    function initScrollToTop() {
        if (scrollTopBtn) {
            // Mostrar/ocultar botón según scroll
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.style.display = 'flex';
                } else {
                    scrollTopBtn.style.display = 'none';
                }
            });
            
            // Scroll suave al hacer clic
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Función para botón de WhatsApp
    function initWhatsAppButton() {
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                const phoneNumber = '5491159198268';
                const message = encodeURIComponent('Hola, me interesa conocer más sobre los servicios de Fontana y Asociados.');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
            });
        }
    }
    
    // Función para animaciones de scroll (fade-in)
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos con clase fade-in
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Helpers de formulario accesible
    function setFieldError(field, message) {
        if (!field) return;
        const errorId = field.getAttribute('aria-describedby');
        const errorContainer = errorId ? document.getElementById(errorId) : null;
        field.setAttribute('aria-invalid', 'true');
        if (errorContainer) {
            errorContainer.textContent = message;
        }
    }

    function clearFieldError(field) {
        if (!field) return;
        const errorId = field.getAttribute('aria-describedby');
        const errorContainer = errorId ? document.getElementById(errorId) : null;
        field.setAttribute('aria-invalid', 'false');
        if (errorContainer) {
            errorContainer.textContent = '';
        }
    }

    function clearAllErrors(form) {
        const fields = form.querySelectorAll('[aria-describedby]');
        fields.forEach(field => clearFieldError(field));
    }

    function showFormStatus(message, type = 'info') {
        const formStatus = document.getElementById('formStatus');
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.classList.add('is-visible');
        formStatus.dataset.type = type;
        formStatus.setAttribute('role', type === 'error' ? 'alert' : 'status');
        formStatus.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    }

    // Función para validación del formulario de contacto
    function initContactForm() {
        if (contactForm) {
            contactForm.setAttribute('novalidate', 'true');

            const fieldSelectors = ['#nombre', '#email', '#telefono', '#empresa', '#servicio', '#mensaje', '#privacy'];
            const fields = fieldSelectors
                .map(selector => contactForm.querySelector(selector))
                .filter(Boolean);

            fields.forEach(field => {
                field.addEventListener('input', () => {
                    if (field.getAttribute('type') === 'checkbox') {
                        if (field.checked) {
                            clearFieldError(field);
                        }
                    } else {
                        if (field.validity.valid) {
                            clearFieldError(field);
                        }
                    }
                });

                field.addEventListener('blur', () => {
                    validateField(field);
                });
            });

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                clearAllErrors(contactForm);

                const formData = new FormData(contactForm);
                let isValid = true;

                fields.forEach(field => {
                    if (!validateField(field, formData)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    showFormStatus('Enviando mensaje...', 'info');
                    submitForm(contactForm, formData);
                } else {
                    showFormStatus('Por favor corregí los campos marcados.', 'error');
                }
            });
        }
    }
    
    function validateField(field, formData) {
        if (!field) return true;

        const name = field.getAttribute('name');
        const value = formData ? formData.get(name) : field.value;
        const type = field.getAttribute('type') || field.tagName.toLowerCase();
        const isRequired = field.hasAttribute('required') || field.getAttribute('aria-required') === 'true';

        if (field.disabled || field.readOnly) return true;

        let message = '';

        if (type === 'checkbox') {
            if (isRequired && !field.checked) {
                message = 'Este campo es obligatorio.';
            }
        } else if (field.tagName.toLowerCase() === 'select') {
            if (isRequired && (!value || value.trim() === '')) {
                message = 'Seleccioná una opción.';
            }
        } else {
            if (isRequired && (!value || value.trim() === '')) {
                message = 'Este campo es obligatorio.';
            } else if (value) {
                if (type === 'email') {
                    if (!FontanaUtils.validateEmail(value)) {
                        message = 'Ingresá un email válido.';
                    }
                } else if (type === 'tel') {
                    if (value.replace(/\D/g, '').length < 8) {
                        message = 'Ingresá un teléfono válido (mínimo 8 dígitos).';
                    }
                } else if (field.id === 'mensaje' && value.trim().length < 10) {
                    message = 'El mensaje debe tener al menos 10 caracteres.';
                } else if (field.id === 'nombre' && value.trim().length < 2) {
                    message = 'El nombre debe tener al menos 2 caracteres.';
                }
            }
        }

        if (message) {
            setFieldError(field, message);
            return false;
        }

        clearFieldError(field);

        return true;
    }

    function submitForm(form, formData) {
        if (!window.fetch) {
            form.submit();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute('aria-disabled', 'true');
        }

        fetch(form.action, {
            method: form.method || 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error en el envío del formulario');
            }
            return response.json().catch(() => ({}));
        }).then(() => {
            showFormStatus('¡Mensaje enviado correctamente! Nos contactaremos pronto.', 'success');
            clearAllErrors(form);
            form.reset();
        }).catch(() => {
            showFormStatus('Ocurrió un problema al enviar el formulario. Podés contactarnos por teléfono o WhatsApp.', 'error');
        }).finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-disabled');
            }
        });
    }
    
    // Función para smooth scroll en enlaces internos
    function initSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Función para efecto parallax sutil en hero
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        let isMobile = window.matchMedia('(max-width: 1024px)').matches;
        let rafId;

        const updateParallaxState = () => {
            isMobile = window.matchMedia('(max-width: 1024px)').matches;
            if (isMobile) {
                parallaxElements.forEach(el => {
                    el.style.setProperty('--parallax-offset', '0px');
                    el.style.transform = 'none';
                });
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }
        };

        const handleScroll = () => {
            if (isMobile) return;
            const scrollY = window.pageYOffset;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const speed = Math.min(parseFloat(el.dataset.parallax) || 0.1, 0.18);
                    const offset = scrollY * speed;
                    el.style.transform = `translate3d(0, ${offset}px, 0)`;
                });
            });
        };

        updateParallaxState();
        window.addEventListener('resize', () => {
            updateParallaxState();
            if (!isMobile) {
                handleScroll();
            }
        }, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
    
    // Función para agregar clase activa a enlaces de navegación
    function initActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Función para lazy loading de imágenes
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Función para contador animado
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Inicializar todas las funcionalidades
    function init() {
        initMobileMenu();
        initScrollToTop();
        initWhatsAppButton();
        initScrollAnimations();
        initContactForm();
        initSmoothScroll();
        initParallaxEffect();
        initActiveNavLinks();
        initLazyLoading();
        initCounters();
        
        // Agregar estilos CSS para animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
            }
            
            .nav-link.active {
                color: var(--primary-color);
            }
            
            .nav-link.active::after {
                width: 100%;
            }
            
            img.lazy {
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            img.lazy.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ejecutar inicialización
    init();
    
    // Función para manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        // Cerrar menú móvil si está abierto al cambiar tamaño
        if (window.innerWidth > 768) {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });
    
    // Función para preloader (opcional)
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
    
    // Ocultar preloader cuando la página esté completamente cargada
    window.addEventListener('load', hidePreloader);
    
});

// Funciones utilitarias globales
window.FontanaUtils = {
    // Función para formatear números
    formatNumber: function(num) {
        return new Intl.NumberFormat('es-AR').format(num);
    },
    
    // Función para formatear fechas
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    // Función para validar email
    validateEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Función para validar teléfono argentino
    validatePhone: function(phone) {
        const regex = /^(\+54|54)?[\s-]?(\d{2,4})[\s-]?(\d{6,8})$/;
        return regex.test(phone);
    }
};
