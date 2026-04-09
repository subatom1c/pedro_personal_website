// ========== Smooth Scroll para Links de Navegação ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Remove active class de todos os links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // Adiciona active class ao link clicado
            this.classList.add('active');
        }
    });
});

// ========== Active Navigation Link ==========
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== Animações ao Scroll ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observa todos os cards
document.querySelectorAll('.skill-card, .interest-card, .section').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ========== Profile Photo Fallback ==========
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-photo img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            const container = this.parentElement;
            container.innerHTML = `
                <div style="
                    width: 180px; 
                    height: 180px; 
                    border-radius: 50%; 
                    background: linear-gradient(135deg, #0f3460, #16213e); 
                    border: 5px solid #00d4ff;
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 80px;
                    margin: 0 auto;
                    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
                ">👨‍🔬</div>
            `;
        });
    }
});

// ========== Add Scroll Active Style ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-link.active {
        color: #00d4ff;
        font-weight: 600;
    }

    .section {
        opacity: 0;
    }
`;
document.head.appendChild(style);
