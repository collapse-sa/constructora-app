import { useEffect, useRef, useState } from 'react';
import './App.css';

const services = [
  {
    num: '01',
    title: 'Obra Civil',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75',
    alt: 'Proyecto de obra civil en construcción industrial',
    text: 'Ejecución de obra civil desde cimentación hasta acabados, con control riguroso de calidad y cumplimiento de normativas.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>
    ),
  },
  {
    num: '02',
    title: 'Construcción Industrial',
    img: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?w=600&q=75',
    alt: 'Construcción industrial con estructura metálica',
    text: 'Plantas, naves industriales y parques manufactureros diseñados para maximizar la eficiencia operativa de su negocio.',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>
    ),
  },
  {
    num: '03',
    title: 'Desarrollo Comercial',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75',
    alt: 'Desarrollo comercial y oficinas corporativas',
    text: 'Plazas comerciales, centros empresariales y espacios mixtos que generan valor a largo plazo para inversionistas.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
    ),
  },
  {
    num: '04',
    title: 'Mantenimiento',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    alt: 'Mantenimiento y remodelación de instalaciones industriales',
    text: 'Remodelaciones, adecuaciones y mantenimiento preventivo y correctivo para instalaciones industriales y comerciales.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
    ),
  },
];

const projects = [
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    alt: 'Proyecto industrial General Motors Planta Silao',
    cat: 'Construcción Industrial',
    name: <>General Motors<br />Planta Silao</>,
  },
  {
    img: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=700&q=75',
    alt: 'Proyecto de plaza comercial desarrollado por EDIFICA',
    cat: 'Desarrollo Comercial',
    name: 'Plaza Comercial Cumbres',
  },
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=75',
    alt: 'Parque industrial en Monterrey desarrollado por EDIFICA',
    cat: 'Parque Industrial',
    name: 'Parque Industrial Monterrey Norte',
  },
  {
    img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=700&q=75',
    alt: 'Desarrollo urbano residencial de EDIFICA',
    cat: 'Desarrollo Urbano',
    name: 'Residencial Valle Alto',
  },
];

const navItems = ['Inicio', 'Nosotros', 'Servicios', 'Proyectos', 'Contacto'];
const calendlyUrl = 'https://calendly.com/collapse-samty/30min?primary_color=ff6b1a';
const mapsUrl = 'https://maps.app.goo.gl/BdXc5yH6o7VCgyi9A';
const mapsEmbedUrl = 'https://www.google.com/maps?q=Av.+Constitucion+450,+Monterrey,+Nuevo+Leon,+Mexico&output=embed';

const aboutStats = [
  { num: '18+', label: <>Años de<br />experiencia</> },
  { num: '285', label: <>Proyectos<br />entregados</> },
  { num: '21', label: <>Estados con<br />presencia</> },
];

function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="Ir al inicio de EDIFICA">
      <div className="logo-icon"><span>E</span></div>
      <span className="logo-text">EDIFI<em>CA</em></span>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.22 2.38a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [aboutStatIndex, setAboutStatIndex] = useState(0);
  const [aboutBadgeLeaving, setAboutBadgeLeaving] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [isOpeningWhatsapp, setIsOpeningWhatsapp] = useState(false);
  const contactSuccessTimeoutRef = useRef(null);
  const whatsappButtonTimeoutRef = useRef(null);
  const mobileMenuScrollTimeoutRef = useRef(null);
  const calendlyRefreshTimeoutRef = useRef(null);
  const calendlyContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sectionIds = navItems.map((item) => item.toLowerCase());
      const currentSection = sectionIds.reduce((current, id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= window.scrollY + 120 ? id : current;
      }, 'inicio');
      if (currentSection) setActiveSection(currentSection);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealSelector = '.reveal, .reveal-left, .reveal-right, .reveal-zoom, .fade-up';
    const revealElements = document.querySelectorAll(revealSelector);

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, index) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
      }
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const serviceCards = document.querySelectorAll('.service-card');
    const delayTimeouts = [];

    if (!('IntersectionObserver' in window)) {
      serviceCards.forEach((card) => card.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay) || 0;
          entry.target.classList.add('is-visible');
          const delayTimeout = setTimeout(() => {
            entry.target.style.transitionDelay = '0ms';
          }, delay + 700);
          delayTimeouts.push(delayTimeout);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    serviceCards.forEach((card, index) => {
      const delay = index * 120;
      card.dataset.delay = String(delay);
      card.style.transitionDelay = `${delay}ms`;
      observer.observe(card);
    });
    return () => {
      observer.disconnect();
      delayTimeouts.forEach((delayTimeout) => clearTimeout(delayTimeout));
    };
  }, []);

  useEffect(() => {
    let exitTimeout;
    const interval = setInterval(() => {
      setAboutBadgeLeaving(true);
      exitTimeout = setTimeout(() => {
        setAboutStatIndex((current) => (current + 1) % aboutStats.length);
        setAboutBadgeLeaving(false);
      }, 360);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimeout);
    };
  }, []);

  useEffect(() => {
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return undefined;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return undefined;
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(contactSuccessTimeoutRef.current);
      clearTimeout(whatsappButtonTimeoutRef.current);
      clearTimeout(mobileMenuScrollTimeoutRef.current);
      clearTimeout(calendlyRefreshTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };
  const refreshCalendly = () => {
    const container = calendlyContainerRef.current;
    if (!container) return;

    window.dispatchEvent(new Event('resize'));

    const iframe = container.querySelector('iframe');
    const shouldRebuild = window.Calendly && (!iframe || iframe.offsetHeight < 300);

    if (!shouldRebuild) return;

    container.innerHTML = '';
    const nextWidget = document.createElement('div');
    nextWidget.className = 'calendly-inline-widget';
    nextWidget.title = 'Agenda una cita';
    container.appendChild(nextWidget);
    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: nextWidget,
    });
  };

  const handleMobileNavClick = (event, item) => {
    event.preventDefault();
    const link = event.currentTarget;
    if (link.dataset.navigating === 'true') return;
    link.dataset.navigating = 'true';
    closeMenu();

    clearTimeout(mobileMenuScrollTimeoutRef.current);
    clearTimeout(calendlyRefreshTimeoutRef.current);

    const sectionId = item.toLowerCase();
    mobileMenuScrollTimeoutRef.current = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (sectionId === 'contacto' || sectionId === 'agendar') {
        calendlyRefreshTimeoutRef.current = setTimeout(refreshCalendly, 650);
      }
      link.dataset.navigating = 'false';
    }, 300);
  };

  const whatsappMessage = encodeURIComponent(
    'Hola, encontré su sitio web en Google y me gustaría recibir más información sobre sus servicios.'
  );
  const whatsappUrl = `https://wa.me/5218125838187?text=${whatsappMessage}`;

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const nombre = formData.get('nombre')?.trim() || '';
    const telefono = formData.get('telefono')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const mensaje = formData.get('mensaje')?.trim() || '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !telefono || !email || !mensaje) {
      setContactError('Por favor completa todos los campos obligatorios.');
      setContactSuccess('');
      return;
    }

    if (!emailPattern.test(email)) {
      setContactError('Por favor ingresa un correo electrónico válido.');
      setContactSuccess('');
      return;
    }

    const text = encodeURIComponent(
      `Hola, quiero solicitar información sobre un proyecto.\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${email}\nMensaje: ${mensaje}`
    );
    const url = `https://wa.me/528125838187?text=${text}`;

    setContactError('');
    setContactSuccess('Información enviada correctamente. Te abrimos WhatsApp para continuar.');
    setIsOpeningWhatsapp(true);
    window.open(url, "_blank");
    form.reset();

    clearTimeout(contactSuccessTimeoutRef.current);
    clearTimeout(whatsappButtonTimeoutRef.current);
    contactSuccessTimeoutRef.current = setTimeout(() => setContactSuccess(''), 5000);
    whatsappButtonTimeoutRef.current = setTimeout(() => setIsOpeningWhatsapp(false), 1000);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Logo />
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}><a className={activeSection === item.toLowerCase() ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a></li>
            ))}
          </ul>
          <a href="tel:+528125838187" className="nav-cta">
            <PhoneIcon />
            (81) 2583-8187
          </a>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {navItems.map((item) => (
          <a className={activeSection === item.toLowerCase() ? 'active' : ''} key={item} href={`#${item.toLowerCase()}`} onPointerDown={(event) => handleMobileNavClick(event, item)} onClick={(event) => handleMobileNavClick(event, item)}>{item}</a>
        ))}
        <a href="tel:+528125838187" onClick={closeMenu}>(81) 2583-8187</a>
      </div>

      <main>
      <section className="hero" id="inicio">
        <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80">
          <source src="/videos/hero-construccion.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content reveal">
          <div className="hero-badge reveal">Empresa constructora certificada</div>
          <h1 className="reveal">Construimos<br />proyectos que<br />conectan con<br /><span>el futuro</span></h1>
          <p className="hero-sub reveal">Desarrollamos proyectos industriales, comerciales y urbanos con calidad, puntualidad y compromiso en cada etapa.</p>
          <div className="hero-btns reveal">
            <a href="#servicios" className="btn-primary" aria-label="Ver servicios de EDIFICA">Ver servicios</a>
            <a href="#agendar" className="btn-outline" aria-label="Contactar a EDIFICA">AGENDAR CITA</a>
          </div>
        </div>

        <div className="hero-stats reveal">
          <div className="hero-stat reveal">
            <span className="hero-stat-num">2007</span>
            <span className="hero-stat-label">Desde el<br />año</span>
          </div>
          <div className="hero-stat reveal">
            <span className="hero-stat-num">18+</span>
            <span className="hero-stat-label">Años de<br />experiencia</span>
          </div>
          <div className="hero-stat reveal">
            <span className="hero-stat-num">285</span>
            <span className="hero-stat-label">Proyectos<br />entregados</span>
          </div>
          <div className="hero-stat reveal">
            <span className="hero-stat-num">21</span>
            <span className="hero-stat-label">Estados con<br />presencia</span>
          </div>
        </div>
      </section>

      <section className="about" id="nosotros">
        <div className="about-inner">
          <div className="about-img-wrap reveal-left">
            <img className="about-img" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80" alt="Equipo de construcción supervisando una obra civil" loading="lazy" decoding="async" />
            <div className="about-badge">
              <div key={aboutStatIndex} className={`about-badge-content${aboutBadgeLeaving ? ' leaving' : ''}`}>
                <div className="about-badge-num">{aboutStats[aboutStatIndex].num}</div>
                <div className="about-badge-text">{aboutStats[aboutStatIndex].label}</div>
              </div>
            </div>
          </div>
          <div className="about-copy reveal-right">
            <div className="section-tag">Quiénes somos</div>
            <h2 className="section-title">Construimos con <span>visión</span> y compromiso</h2>
            <p className="about-text">EDIFICA es una empresa mexicana con más de 18 años de experiencia en la construcción y desarrollo de proyectos de alto impacto. Operamos en los sectores industrial, comercial y urbano, con presencia en 21 estados de la República.</p>
            <p className="about-text">Nuestro equipo de ingenieros, arquitectos y especialistas trabaja bajo los más altos estándares de calidad, garantizando entregas en tiempo y forma, siempre con enfoque en la satisfacción total del cliente.</p>
            <div className="about-feats">
              <div className="about-feat reveal">Certificación ISO 9001</div>
              <div className="about-feat reveal">Proyectos llave en mano</div>
              <div className="about-feat reveal">Equipo propio de maquinaria</div>
              <div className="about-feat reveal">Asesoría integral</div>
            </div>
            <a href="#proyectos" className="btn-primary">Ver proyectos</a>
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="numbers-grid">
          {[
            ['18+', <>Años de<br />experiencia</>],
            ['285', <>Proyectos<br />entregados</>],
            ['21', <>Estados con<br />presencia</>],
            ['#01', <>En servicio<br />integral</>],
          ].map(([num, label]) => (
            <div className="number-item reveal-zoom" key={num}>
              <span className="number-big">{num}</span>
              <span className="number-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="services" id="servicios">
        <div className="services-header reveal">
          <div className="section-tag">Nuestros servicios</div>
          <h2 className="section-title">Lo que <span>hacemos</span></h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.num}>
              <div className="service-card-num">{service.num}</div>
              <div className="service-card-img">
                <ImageWithFallback src={service.img} alt={service.alt} />
              </div>
              <div className="service-card-body">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contacto" className="service-link" aria-label={`Solicitar información sobre ${service.title}`}>Conoce más</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="projects" id="proyectos">
        <div className="projects-header reveal">
          <div>
            <div className="section-tag">Portafolio</div>
            <h2 className="section-title">Nuestros <span>proyectos</span></h2>
          </div>
          <a href="#contacto" className="btn-primary">Ver todos</a>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card reveal-zoom" key={project.cat}>
              <ImageWithFallback className="project-card-img" src={project.img} alt={project.alt} />
              <div className="project-overlay"></div>
              <div className="project-content">
                <div className="project-cat">{project.cat}</div>
                <div className="project-name">{project.name}</div>
                <a href="#contacto" className="project-btn" aria-label={`Solicitar información sobre ${project.alt}`}>Ver proyecto →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="process-header reveal">
          <div className="section-tag process-tag">Cómo trabajamos</div>
          <h2 className="section-title">Nuestro <span>proceso</span></h2>
        </div>
        <div className="process-grid">
          {[
            ['01', 'Asesoría inicial', 'Analizamos tus necesidades, el terreno y los objetivos del proyecto para ofrecerte la mejor solución técnica y financiera.'],
            ['02', 'Planeación y presupuesto', 'Desarrollamos el proyecto ejecutivo, cronograma y presupuesto detallado con total transparencia y sin sorpresas.'],
            ['03', 'Ejecución del proyecto', 'Iniciamos la construcción con equipo propio, supervisión continua y reportes periódicos de avance en tiempo real.'],
            ['04', 'Entrega y seguimiento', 'Entregamos en tiempo y forma, con garantía post-entrega y soporte de mantenimiento para mantener tu inversión protegida.'],
          ].map(([num, title, text]) => (
            <div className="process-card reveal" key={num}>
              <div className="process-num">{num}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-bg"></div>
        <div className="cta-overlay"></div>
        <div className="cta-content reveal-left">
          <div className="section-tag">¿Tienes un proyecto?</div>
          <h2>Nos encargamos de que cada proyecto fluya <span>sin complicaciones</span></h2>
          <p>Desde la asesoría inicial hasta la entrega final, nuestro equipo garantiza resultados con los más altos estándares de la industria.</p>
          <div className="cta-actions">
            <a href="#contacto" className="btn-primary">Contáctanos hoy</a>
            <a href="#agendar" className="btn-outline">Agendar cita</a>
          </div>
        </div>
      </section>

      <section className="schedule-section" id="agendar">
        <div className="schedule-inner">
          <div className="schedule-content reveal-left">
            <div className="section-tag">Agenda una cita</div>
            <h2 className="section-title">Hablemos de tu próximo <span>proyecto</span></h2>
            <p>Selecciona el horario que mejor se adapte a ti y agenda una asesoría inicial con nuestro equipo. Revisaremos tus necesidades, alcance del proyecto y próximos pasos.</p>
            <div className="schedule-points">
              <span>Asesoría inicial sin compromiso</span>
              <span>Revisión general de tu proyecto</span>
              <span>Atención personalizada</span>
            </div>
          </div>

          <div className="schedule-calendly reveal-right" ref={calendlyContainerRef}>
            <div
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              title="Agenda una cita"
            ></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-inner">
          <div className="contact-info reveal-left">
            <div className="section-tag">Hablemos</div>
            <h2>¿Tienes un <span>proyecto</span> en mente?</h2>
            <p>Cuéntanos sobre tu proyecto y uno de nuestros especialistas se pondrá en contacto contigo en menos de 24 horas.</p>
            <div className="contact-details">
              <ContactDetail label="Teléfono" value="(81) 2583-8187" icon="phone" href="tel:+528125838187" ariaLabel="Llamar a Edifica" />
              <ContactDetail label="Correo electrónico" value="contacto@edifica.mx" icon="mail" href="mailto:contacto@edifica.mx" ariaLabel="Enviar correo a Edifica" />
              <ContactDetail label="Dirección" value="Av. Constitución 450, Monterrey, N.L." icon="pin" />
            </div>
          </div>
          <form className="contact-form reveal-right" onSubmit={handleContactSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input id="nombre" name="nombre" type="text" placeholder="Juan Pérez" autoComplete="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input id="telefono" name="telefono" type="tel" placeholder="(81) 0000-0000" autoComplete="tel" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" placeholder="tu@empresa.com" autoComplete="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos sobre tu proyecto..." required></textarea>
            </div>
            <button className="form-submit" type="submit">
              {isOpeningWhatsapp ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
            </button>
            <p className="form-helper">Te redirigiremos a WhatsApp para continuar la conversación.</p>
            {contactSuccess && <p className="form-success" role="status">{contactSuccess}</p>}
            {contactError && <p className="form-error" role="alert">{contactError}</p>}
          </form>
        </div>
      </section>

      <section className="location-section" id="ubicacion">
        <div className="location-inner">
          <div className="location-content fade-up">
            <div className="section-tag">UBICACIÓN</div>
            <h2 className="section-title">Visítanos en <span>Monterrey</span></h2>
            <p>Estamos ubicados en Monterrey, N.L. donde atendemos proyectos industriales, comerciales y urbanos para clientes de toda la región.</p>
            <a className="btn-primary location-btn" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir Google Maps para llegar a EDIFICA">Cómo llegar</a>
          </div>
          <div className="location-map fade-up">
            <iframe
              src={mapsEmbedUrl}
              title="Ubicación de EDIFICA en Monterrey"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      </main>

      <footer className="footer reveal">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Construyendo el futuro de México con más de 18 años de experiencia, calidad certificada y compromiso total en cada proyecto.</p>
          </div>
          <FooterColumn title="Empresa" links={['Nosotros', 'Servicios', 'Proyectos', 'Contacto']} />
          <FooterColumn title="Servicios" links={['Obra civil', 'Industrial', 'Comercial', 'Mantenimiento']} />
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="tel:+528125838187">(81) 2583-8187</a></li>
              <li><a href="mailto:contacto@edifica.mx">contacto@edifica.mx</a></li>
              <li><a href="https://www.google.com/maps/search/?api=1&query=Av.+Constitucion+450+Monterrey+NL" target="_blank" rel="noreferrer">Av. Constitución 450</a></li>
              <li><a href="https://www.google.com/maps/search/?api=1&query=Monterrey+Nuevo+Leon" target="_blank" rel="noreferrer">Monterrey, N.L.</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 <span>EDIFICA</span> Constructora. Todos los derechos reservados.</span>
          <span className="footer-copy">Hecho en <span>Monterrey, México</span></span>
        </div>
      </footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="wa-btn" title="Escríbenos por WhatsApp" aria-label="Abrir WhatsApp con mensaje precargado">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

function ContactDetail({ label, value, icon, href, ariaLabel }) {
  const icons = {
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.22 2.38a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
  };

  return (
    <div className="contact-detail">
      <div className="contact-detail-icon">
        <svg viewBox="0 0 24 24">{icons[icon]}</svg>
      </div>
      <div>
        <div className="contact-detail-label">{label}</div>
        <div className="contact-detail-val">
          {href ? (
            <a className="contact-link" href={href} aria-label={ariaLabel}>
              {value}
            </a>
          ) : value}
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${className} image-fallback`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
