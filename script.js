// Smooth scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = '#D4AF37';
            }
        });
    });

    // Pet interactions
    const pet = document.getElementById('pet');
    const petSpeech = document.getElementById('petSpeech');
    const messages = [
        "Meow! 😺",
        "Purr purr~ 💕",
        "Nice to meet you! 🐾",
        "Let's connect! ✨",
        "You're awesome! 🌟"
    ];

    pet.addEventListener('click', () => {
        pet.classList.add('excited');
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        petSpeech.textContent = randomMsg;
        petSpeech.classList.add('show');
        
        setTimeout(() => {
            pet.classList.remove('excited');
            petSpeech.classList.remove('show');
        }, 2000);
    });

    // Contact section - pet gets excited
    const contactSection = document.getElementById('contact');
    let hasSeenContact = false;
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasSeenContact) {
                hasSeenContact = true;
                pet.classList.add('excited');
                petSpeech.textContent = "Yay! Let's connect and build something cool together! 🎉";
                petSpeech.classList.add('show');
                
                // Create celebration sparkles
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => createSparkles(pet), i * 100);
                }
                
                setTimeout(() => {
                    pet.classList.remove('excited');
                    petSpeech.classList.remove('show');
                }, 4000);
            }
        });
    }, { threshold: 0.5 });

    contactObserver.observe(contactSection);

    // Cursor trail
    const canvas = document.getElementById('cursorCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 15;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.life = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            if (this.size > 0.2) this.size -= 0.05;
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.life})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Random pet movements with personality
    const pets = [
        { emoji: '🐱', msg: 'Meow! 😺' },
        { emoji: '🐶', msg: 'Woof! 🐾' },
        { emoji: '🐰', msg: 'Hop hop! 🥕' },
        { emoji: '🦊', msg: 'Foxy! 🦊' },
        { emoji: '🐼', msg: 'Bamboo? 🎋' }
    ];
    let currentPetIndex = 0;
    
    setInterval(() => {
        currentPetIndex = (currentPetIndex + 1) % pets.length;
        pet.textContent = pets[currentPetIndex].emoji;
        
        // Show message briefly
        petSpeech.textContent = pets[currentPetIndex].msg;
        petSpeech.classList.add('show');
        setTimeout(() => petSpeech.classList.remove('show'), 2000);
    }, 15000);

    // Sparkle effect on buttons and cards
    document.querySelectorAll('.btn, .project-card, .badge').forEach(element => {
        element.addEventListener('mouseenter', () => {
            createSparkles(element);
        });
    });

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleTypes = ['✨', '⭐', '💫', '🌟'];
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('span');
            sparkle.textContent = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
            sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '1rem';
            sparkle.style.zIndex = '10000';
            sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-text .subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
            100% { opacity: 0; transform: translateY(-40px) scale(0) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.vine-left, .vine-right');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });
});
