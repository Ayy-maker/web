// SADC Disability Services - $20,000 Premium Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // ====================================
    // SCROLL PROGRESS BAR
    // ====================================
    const scrollProgress = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // ====================================
    // AUTO-HIDE NAVIGATION
    // ====================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 120) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // ====================================
    // SMOOTH SCROLL TO ANCHORS
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================================
    // INTERSECTION OBSERVER - REVEAL ANIMATIONS
    // ====================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards with staggered delays
    document.querySelectorAll('.service-card-premium').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(card);
    });
    
    // Observe why features
    document.querySelectorAll('.why-feature').forEach((feature, index) => {
        feature.style.transitionDelay = `${index * 0.18}s`;
        observer.observe(feature);
    });
    
    // Observe testimonials
    document.querySelectorAll('.testimonial-card-large').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.25}s`;
        observer.observe(card);
    });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // ====================================
    // NUMBER COUNTER ANIMATION
    // ====================================
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                const duration = 2500;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ====================================
    // BUTTON RIPPLE EFFECT
    // ====================================
    document.querySelectorAll('.btn, .service-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-expand 0.7s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 700);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-expand {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ====================================
    // FORM SUBMISSION
    // ====================================
    const form = document.querySelector('.premium-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 4rem 3rem;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #00d4aa, #0066ff); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 3rem; color: white; animation: successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);">✓</div>
                        <h3 style="font-size: 2rem; font-weight: 900; margin-bottom: 1rem; color: white;">Thank You!</h3>
                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.15rem; line-height: 1.7; margin-bottom: 1.5rem;">
                            We've received your consultation request and will contact you within 24 hours.
                        </p>
                        <p style="margin-top: 2rem; font-size: 0.95rem; color: rgba(255, 255, 255, 0.6);">
                            For immediate assistance, call <a href="tel:1300242492" style="color: #00d4aa; text-decoration: none; font-weight: 700;">1300 242 492</a>
                        </p>
                    </div>
                `;
                
                const styleSuccess = document.createElement('style');
                styleSuccess.textContent = `
                    @keyframes successPop {
                        0% { transform: scale(0); opacity: 0; }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(styleSuccess);
                
                console.log('📨 Form submitted:', data);
            }, 2000);
        });
    }
    
    // ====================================
    // HERO PARALLAX EFFECT
    // ====================================
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }, { passive: true });
    
    // ====================================
    // TOUCH FEEDBACK FOR MOBILE
    // ====================================
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn, .service-card-premium, .contact-card, .testimonial-card-large').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.97)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
    
    // ====================================
    // PHONE CALL TRACKING
    // ====================================
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            console.log('📞 Call initiated:', phoneNumber);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'call_click', { phone_number: phoneNumber });
        });
    });
    
    // ====================================
    // SERVICE CARD HOVER TILT EFFECT (DESKTOP)
    // ====================================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card-premium').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-16px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // ====================================
    // TESTIMONIAL CARD ENTRANCE
    // ====================================
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.testimonial-card-large').forEach(card => {
        testimonialObserver.observe(card);
    });
    
    // ====================================
    // PERFORMANCE: DEBOUNCED RESIZE
    // ====================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('Window resized:', window.innerWidth + 'x' + window.innerHeight);
        }, 250);
    });
    
    // ====================================
    // ACCESSIBILITY: REDUCED MOTION
    // ====================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.transition = 'none !important';
            el.style.animation = 'none !important';
        });
        console.log('✓ Reduced motion enabled');
    }
    
    // ====================================
    // ADD FLOATING LEAVES INTERACTION
    // ====================================
    const leaves = document.querySelectorAll('.leaf');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Subtle leaf interaction with cursor
    setInterval(() => {
        leaves.forEach((leaf, index) => {
            const rect = leaf.getBoundingClientRect();
            const leafX = rect.left + rect.width / 2;
            const leafY = rect.top + rect.height / 2;
            
            const distanceX = mouseX - leafX;
            const distanceY = mouseY - leafY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                const offsetX = (distanceX / distance) * force * 30;
                const offsetY = (distanceY / distance) * force * 30;
                
                leaf.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 2}deg)`;
            } else {
                leaf.style.transform = '';
            }
        });
    }, 50);
    
    // ====================================
    // FAQ ACCORDION
    // ====================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ====================================
    // CONSOLE BRANDING
    // ====================================
    const styles = [
        'font-size: 24px',
        'font-weight: bold',
        'background: linear-gradient(135deg, #0066ff, #00d4aa)',
        '-webkit-background-clip: text',
        '-webkit-text-fill-color: transparent',
        'padding: 10px'
    ].join(';');
    
    console.log('%cSADC Disability Services', styles);
    console.log('%c✨ $20,000 Premium Design with Floating Leaves', 'font-size: 12px; color: #666;');
    console.log('%c✓ Scroll Progress\n✓ Auto-hide Nav\n✓ Scroll Reveals\n✓ Counter Animations\n✓ Ripple Effects\n✓ Parallax Hero\n✓ 3D Card Tilts\n✓ Floating Leaves', 'font-size: 11px; color: #00d4aa; line-height: 1.6;');
});
