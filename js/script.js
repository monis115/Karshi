let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});


document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupScrollAnimations();
    setupHoverEffects();
    setupRecognitionLogos();
    setupCounterAnimations();
    setupTypingEffect();
    setupScrollProgress();
    setupRippleEffect();
});

function initializeAnimations() {
    const elements = document.querySelectorAll('.info-card, .facility-card, .feature-item');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                const numberElement = entry.target.querySelector('p');
                if (numberElement && /^\d+/.test(numberElement.textContent)) {
                    animateNumber(numberElement);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .facility-card, .feature-item, .logo-item').forEach(el => observer.observe(el));
}

function setupHoverEffects() {
    const infoCards = document.querySelectorAll('.info-card, .feature-item');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'scale(1.05)';
            this.querySelector('.card-icon, .feature-icon').style.boxShadow = '0 0 15px rgba(74, 144, 226, 0.5)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.querySelector('.card-icon, .feature-icon').style.boxShadow = 'none';
        });
    });

    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(10px)';
            this.style.borderLeft = '4px solid #50c9c3';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeft = 'none';
        });
    });
}

function setupRecognitionLogos() {
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.logo-circle').style.transform = 'scale(1.1)';
            showTooltip(this, this.dataset.logo);
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.logo-circle').style.transform = 'scale(1)';
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = `Recognized by ${text}`;
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }
}

function setupCounterAnimations() {
    window.animateNumber = function(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (isNaN(number)) return;
        
        const suffix = text.replace(number.toString(), '');
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, duration / steps);
    };
}

function setupTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

function setupScrollProgress() {
    const progressDot = document.querySelector('.scroll-dot');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / maxScroll;
        if (progressDot) {
            progressDot.style.transform = `scale(${1 + progress * 0.3})`;
            progressDot.style.opacity = 0.6 + (progress * 0.4);
        }
    });
}

function setupRippleEffect() {
    const clickableElements = document.querySelectorAll('.info-card, .facility-card, .feature-item, .logo-item');
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
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
                background: rgba(74, 144, 226, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 100;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupScrollAnimations();
    setupHoverEffects();
    setupRecognitionLogos();
    setupCounterAnimations();
    setupTypingEffect();
    setupScrollProgress();
    setupRippleEffect();
});

function initializeAnimations() {
    const elements = document.querySelectorAll('.info-card, .facility-card, .feature-item, .logo-item');
    elements.forEach(el => {
        el.style.opacity = '0';
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                const numberElement = entry.target.querySelector('p');
                if (numberElement && /^\d+/.test(numberElement.textContent)) {
                    animateNumber(numberElement);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .facility-card, .feature-item, .logo-item').forEach(el => observer.observe(el));
}

function setupHoverEffects() {
    const infoCards = document.querySelectorAll('.info-card, .feature-item');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'scale(1.05)';
            this.querySelector('.card-icon, .feature-icon').style.boxShadow = '0 0 15px rgba(74, 144, 226, 0.5)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.querySelector('.card-icon, .feature-icon').style.boxShadow = 'none';
        });
    });

    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(10px)';
            this.style.borderLeft = '4px solid #50c9c3';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeft = 'none';
        });
    });
}

function setupRecognitionLogos() {
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.logo-circle').style.transform = 'scale(1.1)';
            showTooltip(this, this.dataset.logo);
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.logo-circle').style.transform = 'scale(1)';
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = `Recognized by ${text}`;
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }
}

function setupCounterAnimations() {
    window.animateNumber = function(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (isNaN(number)) return;
        
        const suffix = text.replace(number.toString(), '');
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, duration / steps);
    };
}

function setupTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

function setupScrollProgress() {
    const progressDot = document.querySelector('.scroll-dot');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / maxScroll;
        if (progressDot) {
            progressDot.style.transform = `scale(${1 + progress * 0.3})`;
            progressDot.style.opacity = 0.6 + (progress * 0.4);
        }
    });
}

function setupRippleEffect() {
    const clickableElements = document.querySelectorAll('.info-card, .facility-card, .feature-item, .logo-item');
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
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
                background: rgba(74, 144, 226, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 100;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        .animate-in {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}




//  js for addmission starts 
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add loading-reveal class and observe elements
    const elementsToReveal = document.querySelectorAll('.flow-step, .documents-wrapper');
    elementsToReveal.forEach(el => {
        el.classList.add('loading-reveal');
        observer.observe(el);
    });

    // Smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add dynamic number counter animation
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.step-num');
        numbers.forEach((num, index) => {
            setTimeout(() => {
                num.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    num.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    };

    // Trigger number animation when section is in view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const admissionSection = document.getElementById('admissionprocess');
    if (admissionSection) {
        sectionObserver.observe(admissionSection);
    }

    // Add parallax effect to document section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const docSection = document.querySelector('.documents-container');
        if (docSection) {
            const rect = docSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                docSection.style.transform = `translateY(${yPos * 0.1}px)`;
            }
        }
    });
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
        console.log('Swiped left');
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right
        console.log('Swiped right');
    }
}

//  js for addmissin ends


//  why choose us starts


// Flowing Elegance Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Minimal Cursor
    const cursor = document.querySelector('.ksu-minimal-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // Flow Point Interactions
    const points = document.querySelectorAll('.ksu-flow-point');
    points.forEach((point, index) => {
        const content = point.querySelector('.ksu-flow-content');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    point.style.animation = `ksuPointFade 0.7s ${index * 0.1}s ease-out forwards`;
                }
            });
        }, { threshold: 0.2 });
        observer.observe(point);

        if (window.innerWidth > 768) {
            content.addEventListener('mousemove', (e) => {
                const rect = content.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                content.style.transform = `translateY(-10px) rotate(${x * 3}deg)`;
                cursor.style.transform = 'scale(1.3)';
            });

            content.addEventListener('mouseleave', () => {
                content.style.transform = 'translateY(-10px)';
                cursor.style.transform = '';
            });
        }
    });

    // Connecting Lines
    const svg = document.querySelector('.ksu-connecting-svg');
    function updateConnectingLines() {
        svg.innerHTML = ''; // Clear previous paths
        const timeline = document.querySelector('.ksu-timeline');
        const points = document.querySelectorAll('.ksu-flow-point');
        const stageRect = document.querySelector('.ksu-stage').getBoundingClientRect();
        const timelineRect = timeline.getBoundingClientRect();

        for (let i = 0; i < points.length - 1; i++) {
            const point1 = points[i];
            const point2 = points[i + 1];
            const rect1 = point1.getBoundingClientRect();
            const rect2 = point2.getBoundingClientRect();

            // Calculate connection points
            let x1, y1, x2, y2;
            if (window.innerWidth <= 768) {
                // On mobile, align to the left (20px from left edge)
                x1 = 20 - stageRect.left;
                x2 = 20 - stageRect.left;
                y1 = rect1.bottom - timelineRect.top + 20; // Bottom of point1
                y2 = rect2.top - timelineRect.top - 20; // Top of point2
            } else {
                // On desktop, connect from the center of the point
                x1 = (rect1.left + rect1.right) / 2 - timelineRect.left; // Center of point1
                x2 = (rect2.left + rect2.right) / 2 - timelineRect.left; // Center of point2
                y1 = rect1.bottom - timelineRect.top + 20; // Bottom of point1
                y2 = rect2.top - timelineRect.top - 20; // Top of point2
            }

            // Create curved path
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const midY = (y1 + y2) / 2;
            const curve = `M${x1},${y1} Q${(x1 + x2) / 2},${midY} ${x2},${y2}`;
            path.setAttribute('d', curve);
            path.setAttribute('class', 'ksu-connecting-path');
            svg.appendChild(path);
        }

        // Set SVG dimensions
        svg.setAttribute('viewBox', `0 0 ${timelineRect.width} ${timelineRect.height}`);
        svg.setAttribute('width', timelineRect.width);
        svg.setAttribute('height', timelineRect.height);
    }

    // Update lines on load, scroll, and resize
    window.addEventListener('load', updateConnectingLines);
    window.addEventListener('resize', updateConnectingLines);
    window.addEventListener('scroll', updateConnectingLines);

    // Spark Parallax
    const sparks = document.querySelectorAll('.ksu-spark');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        sparks.forEach((spark, index) => {
            const speed = 0.3 + (index * 0.1);
            spark.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Performance Optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateConnectingLines();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
    });

    // Loading Complete
    document.body.style.cursor = 'none';
    setTimeout(() => {
        document.querySelector('.ksu-pulse-glow').style.animation = 'ksuPulseGlow 5s ease-in-out infinite';
    }, 500);
});

// Preload Critical Resources
window.addEventListener('load', () => {
    document.getElementById('ksu-flowing-elegance').classList.add('loaded');
});
//  why choose us ends