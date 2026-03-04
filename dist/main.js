// ============================================
// LdPsic - Landing Page Psicólogo
// TypeScript Application
// ============================================
class LdPsicApp {
    constructor() {
        this.contactInfo = {
            phone: "(11) 99999-9999",
            whatsapp: "5511999999999",
            email: "contato@ldpsic.com.br",
            address: "Rua das Flores, 123 - Centro, São Paulo - SP"
        };
        this.socialLinks = [
            { name: "Instagram", url: "#", icon: "📷" },
            { name: "LinkedIn", url: "#", icon: "💼" },
            { name: "Facebook", url: "#", icon: "👤" }
        ];
        this.init();
    }
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupSmoothScroll();
            this.setupAnimations();
            this.setupMobileMenu();
            this.setupWhatsAppButton();
            this.setupFormHandler();
            this.setupScrollEffects();
            this.updateYear();
        });
    }
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-menu-btn');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
            });
        }
        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }
        // Close menu on link click
        mobileMenu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    setupWhatsAppButton() {
        const waBtn = document.getElementById('whatsapp-float');
        if (waBtn) {
            waBtn.addEventListener('click', () => {
                const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta.");
                window.open(`https://wa.me/${this.contactInfo.whatsapp}?text=${message}`, '_blank');
            });
        }
    }
    setupFormHandler() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        // Construct WhatsApp message
        const waMessage = encodeURIComponent(`Olá! Meu nome é ${name}.\n\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem: ${message}`);
        window.open(`https://wa.me/${this.contactInfo.whatsapp}?text=${waMessage}`, '_blank');
        // Show success message
        this.showNotification('Mensagem enviada com sucesso!', 'success');
        form.reset();
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    setupScrollEffects() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (header) {
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                }
                else {
                    header.classList.remove('scrolled');
                }
            }
            lastScroll = currentScroll;
        });
    }
    updateYear() {
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear().toString();
        }
    }
}
// Initialize application
new LdPsicApp();
// Export for module usage
export { LdPsicApp };
//# sourceMappingURL=main.js.map