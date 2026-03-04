// ============================================
// LdPsic - Landing Page Psicólogo
// TypeScript Application
// ============================================

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

class LdPsicApp {
  private contactInfo: ContactInfo;
  private socialLinks: SocialLink[];

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

  private init(): void {
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

  private setupSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  private setupAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  private setupMobileMenu(): void {
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

  private setupWhatsAppButton(): void {
    const waBtn = document.getElementById('whatsapp-float');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta.");
        window.open(`https://wa.me/${this.contactInfo.whatsapp}?text=${message}`, '_blank');
      });
    }
  }

  private setupFormHandler(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    }
  }

  private handleFormSubmit(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Construct WhatsApp message
    const waMessage = encodeURIComponent(
      `Olá! Meu nome é ${name}.\n\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem: ${message}`
    );

    window.open(`https://wa.me/${this.contactInfo.whatsapp}?text=${waMessage}`, '_blank');
    
    // Show success message
    this.showNotification('Mensagem enviada com sucesso!', 'success');
    form.reset();
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
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

  private setupScrollEffects(): void {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (header) {
        if (currentScroll > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      lastScroll = currentScroll;
    });
  }

  private updateYear(): void {
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
