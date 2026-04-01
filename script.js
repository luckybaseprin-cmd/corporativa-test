document.addEventListener('DOMContentLoaded', () => {

    // 1. Cinematic Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                document.getElementById('navbar').classList.add('visible');
            }, 500);
            checkVisibility();
        }, 1800);
    }

    // 2. Custom Cursor (Interactive glow)
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        // Increase intensity on interactive elements
        const iterables = document.querySelectorAll('a, button, .metric-card, .feature-list li, .trust-logos span');
        iterables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '120px';
                cursorGlow.style.height = '120px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, rgba(0,0,0,0) 60%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '600px';
                cursorGlow.style.height = '600px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(0,0,0,0) 60%)';
            });
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none'; // hide on touch devices
    }

    // 3. Scroll Animations (Advanced Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealElements = document.querySelectorAll('.reveal-blur, .reveal-left, .reveal-right, .reveal-top');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, animate the number
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function checkVisibility() {
        revealElements.forEach(el => observer.observe(el));
    }
    
    if(!loader) {
        setTimeout(() => document.getElementById('navbar').classList.add('visible'), 100);
        checkVisibility();
    }

    // 4. Counter animation logic
    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeProgress * target);
            
            el.innerHTML = target === 300 ? '+' + current + '%' : current + '.00%';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // 5. Driver.js Cinematic Tour
    const driver = window.driver?.js?.driver;
    if (document.getElementById('tour-nav') && driver) {
        const tour = driver({
            showProgress: true,
            animate: true,
            popoverClass: 'driverjs-theme',
            steps: [
                {
                    element: '#tour-hero',
                    popover: { title: 'Dramatismo Visual', description: 'Entrada con Loader y revelaciones suaves para máxima retención.', side: "bottom", align: 'center' }
                },
                {
                    element: '#tour-overview',
                    popover: { title: 'Scroll Inmersivo', description: 'Los elementos se difuminan (blur) y se deslizan simulando espacio 3D.', side: "right", align: 'start' }
                },
                {
                    element: '#tour-cta',
                    popover: { title: 'Cursor Interactivo', description: 'El puntero actúa como linterna inteligente absorbiendo la atención del usuario en botones clave.', side: "top", align: 'center' }
                }
            ],
            onNextClick: (element, step, { config, state }) => { tour.moveNext(); }
        });

        setTimeout(() => {
            const tourShown = sessionStorage.getItem('corporateCinematicTour');
            if (!tourShown) {
                tour.drive();
                sessionStorage.setItem('corporateCinematicTour', 'true');
            }
        }, 2500); // Trigger slightly after loader finishes
    }
});
