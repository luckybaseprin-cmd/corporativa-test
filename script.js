document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Form submission simulation
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = demoForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Procesando...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check-circle"></i> Solicitud Recibida';
                btn.style.backgroundColor = '#27c93f';
                btn.style.color = '#fff';
                btn.style.opacity = '1';
                demoForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 3. Driver.js Tour (Mandatory on load) - ONLY ON INDEX
    if (document.getElementById('tour-nav')) {
        const driver = window.driver.js.driver;

        const tour = driver({
            showProgress: true,
            animate: true,
            popoverClass: 'driverjs-theme',
            steps: [
                {
                    element: '#tour-hero',
                    popover: {
                        title: 'Copywriting Agresivo',
                        description: 'Evitamos las descripciones genéricas. El título ataca un dolor directo y promete dominar el sector frente a la competencia.',
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#tour-hero-cta',
                    popover: {
                        title: 'CTA Pulsonante',
                        description: 'Los botones vibran discretamente, emplean colores gradientes e invitan a iniciar un "cierre" (Auditoría / Contacto).',
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#tour-trust',
                    popover: {
                        title: 'Authority Boost',
                        description: 'Los logotipos de confianza reducen inmediatamente la fricción. La gente confía si ve a empresas importantes respaldando tu solución.',
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: '#tour-metrics',
                    popover: {
                        title: 'Prueba Matemática (ROI)',
                        description: 'Mostramos números puros porque las empresas compran rentabilidad (6x ROI, 300% eficiencia).',
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#tour-overview',
                    popover: {
                        title: 'Contraste Cognitivo',
                        description: 'Diferenciamos de un vistazo "el Problema" vs "la Solución". Aquí demostramos qué pierden si NO trabajan contigo.',
                        side: "right",
                        align: 'start'
                    }
                },
                {
                    element: '#tour-testimonial',
                    popover: {
                        title: 'Storytelling & Prueba Social',
                        description: 'Citas directas de cargos reales (ej. "Directora de Operaciones") hablando de ahorro monetivo. Es la pieza final de confianza que vende.',
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: '#tour-cta',
                    popover: {
                        title: 'El Embudo Final',
                        description: 'El diseño concluye encerrando al usuario interesado en el formulario. Ya ha leído todas las pruebas, este es el momento de conversión.',
                        side: "top",
                        align: 'center'
                    }
                }
            ],
            onNextClick: (element, step, { config, state }) => {
                tour.moveNext();
            }
        });

        // Mandatory Tour on load (New key forces it to run)
        setTimeout(() => {
            const tourShown = sessionStorage.getItem('corporateSalesTour');
            if (!tourShown) {
                tour.drive();
                sessionStorage.setItem('corporateSalesTour', 'true');
            }
        }, 1500);
    }

});
