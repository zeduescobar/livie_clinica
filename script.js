// EmailJS Configuration
(function() {
    emailjs.init("t-0Bh_3m2x2-LzCUx");
})();

// Função para formatar telefone
function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length <= 10) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
    }
    
    input.value = value;
}

// Aplicar formatação ao campo de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.querySelector('input[name="telefone"]');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            formatarTelefone(this);
        });
        
        telefoneInput.addEventListener('keypress', function(e) {
            // Permitir apenas números, backspace, delete, tab, escape, enter
            if (!/[0-9]/.test(e.key) && ![8, 9, 27, 13, 46].includes(e.keyCode)) {
                e.preventDefault();
            }
        });
    }
});

// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adicionar fade-in aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.hero-content, .hero-image, .especialidade-card, .sobre-content, .contato-form, .contato-info, .footer-content');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Preparar dados do formulário
        const telefoneValue = contactForm.querySelector('input[name="telefone"]').value.trim();
        const mensagemOriginal = contactForm.querySelector('textarea[name="mensagem"]').value.trim();
        
        // Juntar telefone com a mensagem
        const mensagemCompleta = telefoneValue ? 
            `📞 Telefone: ${telefoneValue}\n\n${mensagemOriginal}` : 
            mensagemOriginal;
        
        const formData = {
            name: contactForm.querySelector('input[name="nome"]').value.trim(),
            email: contactForm.querySelector('input[name="email"]').value.trim(),
            phone: telefoneValue || 'Não informado',
            telefone: telefoneValue || 'Não informado',
            message: mensagemCompleta,
            time: new Date().toLocaleString('pt-BR')
        };
        
        console.log('Telefone capturado:', telefoneValue);
        console.log('Telefone no formData:', formData.telefone);
        console.log('Dados completos do formulário:', formData);
        
        // Enviar email usando EmailJS
        console.log('Enviando dados:', formData);
        // Teste primeiro com template de exemplo
        emailjs.send('service_a032nog', 'template_6tj8569', formData)
            .then(function(response) {
                console.log('SUCCESS:', response);
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('FAILED:', error);
                alert('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Parallax effect para o hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Animações adicionais para cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.especialidade-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Adicionar classe para animações CSS
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-loaded');
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
}); 