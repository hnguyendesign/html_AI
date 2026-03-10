document.addEventListener('DOMContentLoaded', () => {

    // 1. INJECT CINEMATIC PRELOADER
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = '<div class="preloader-logo">HKN Media</div>';
    document.body.prepend(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1200);

    // 2. INJECT CUSTOM CURSOR
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Expand cursor on anything interactive in the layout
        const hoverables = document.querySelectorAll('a, button, input, textarea, .grid-item, .slider-arrow, .explore-card, .img-wrapper');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
        });
    }

    // 3. PAGE TRANSITIONS
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname && !this.hash && this.href !== window.location.href && this.target !== '_blank') {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = this.href; }, 400);
            }
        });
    });

    // 4. HERO SLIDER LOGIC (Home Page)
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    if (heroSlides.length > 0) {
        window.moveSlide = (n) => {
            heroSlides[heroIndex].classList.remove('active');
            heroIndex = (heroIndex + n + heroSlides.length) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
        };
        setInterval(() => moveSlide(1), 6000);
    }
});