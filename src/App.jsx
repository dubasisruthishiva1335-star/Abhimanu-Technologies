import React, { useState, useEffect } from 'react';

// --- DATA DEFINITIONS ---
const SERVICES = [
  {
    id: 'web-development',
    title: 'Custom Web Applications',
    tagline: 'High-speed, responsive web platforms built with modern React & Next.js',
    description: 'We design and engineer bespoke web applications, SaaS dashboards, and e-commerce platforms with optimal performance, responsive mobile-first layouts, and robust security.',
    deliverables: [
      'Single Page Apps (SPA) & Multi-Page Web Apps',
      'Modern SaaS Dashboards & Admin Portals',
      'SEO-Optimized Next.js Platforms',
      'REST & GraphQL API Integration'
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    badge: 'Popular'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    tagline: 'Native and cross-platform mobile apps for iOS and Android',
    description: 'Deliver smooth, responsive, and intuitive mobile experiences on smartphones and tablets. We leverage Flutter and React Native for cost-effective cross-platform launches or native Kotlin for deep device control.',
    deliverables: [
      'iOS & Android Cross-Platform Apps',
      'Native Performance & Hardware Integrations',
      'Offline-First Architecture & Push Notifications',
      'App Store & Google Play Publishing'
    ],
    tech: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase'],
    badge: 'High Demand'
  },
  {
    id: 'backend-apis',
    title: 'Backend Systems & APIs',
    tagline: 'Scalable microservices, high-throughput APIs, and databases',
    description: 'Power your frontend and mobile clients with secure, lightning-fast backend services. We build microservices, integrate relational and NoSQL databases, and implement caching layers.',
    deliverables: [
      'RESTful & GraphQL API Architecture',
      'Database Modeling (PostgreSQL, MongoDB)',
      'Secure User Authentication & RBAC',
      'Third-Party Payment & SMS Gateways'
    ],
    tech: ['Node.js', 'Express', 'Python FastAPI', 'PostgreSQL', 'Redis'],
    badge: 'Core'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    tagline: 'Automated CI/CD pipelines, containerization, and cloud deployment',
    description: 'Ensure your application is always online, fault-tolerant, and ready for sudden traffic spikes. We configure automated deployment pipelines, Docker containers, and scalable cloud hosting.',
    deliverables: [
      'Automated CI/CD Pipelines with GitHub Actions',
      'Containerization with Docker',
      'Cloud Hosting Setup on AWS & Vercel',
      'SSL, Security Hardening & 99.9% Uptime'
    ],
    tech: ['AWS', 'Docker', 'Vercel', 'GitHub Actions', 'Linux'],
    badge: 'DevOps'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Prototyping',
    tagline: 'User-centric product interfaces and interactive Figma prototypes',
    description: 'Turn your product concept into an intuitive, visually stunning reality. We craft interactive user journeys, wireframes, high-fidelity Figma mockups, and cohesive design systems before coding starts.',
    deliverables: [
      'User Journey & Wireframe Architecture',
      'Interactive, Clickable Figma Prototypes',
      'Responsive Design Systems & Component Libraries',
      'Developer-Ready Design Handoff'
    ],
    tech: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
    badge: 'Design'
  },
  {
    id: 'maintenance-support',
    title: 'Software Maintenance & Upgrades',
    tagline: 'Continuous monitoring, bug fixing, and legacy code modernization',
    description: 'Software needs continuous care to stay secure and fast. We provide dedicated monthly maintenance, security patch application, performance tuning, and technical debt cleanup.',
    deliverables: [
      'Scheduled Security Updates & Dependency Upgrades',
      'Database Performance & Query Optimization',
      'Bug Fixing & 24-Hour Urgent Support SLA',
      'Legacy Code Refactoring & Modernization'
    ],
    tech: ['Code Audits', 'Bug Tracking', 'Performance Tuning', 'SLA Support'],
    badge: 'Support'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope Definition',
    duration: 'Days 1 – 3',
    description: 'We meet to understand your goals, target audience, core feature requirements, and timeline. We prepare a crystal-clear Scope of Work (SOW) with fixed milestones and transparent deliverables.'
  },
  {
    step: '02',
    title: 'UI/UX Design & Architecture',
    duration: 'Week 1',
    description: 'Our design and engineering team crafts clickable Figma prototypes and defines the database schemas, API contracts, and technology stack so you can visualize the exact product.'
  },
  {
    step: '03',
    title: 'Agile Sprint Development',
    duration: 'Weeks 2 – 5',
    description: 'We write clean, modular, and tested code in 2-week agile sprints. You receive weekly demo builds on private staging environments so you can test features and provide immediate feedback.'
  },
  {
    step: '04',
    title: 'QA Testing, Launch & Handover',
    duration: 'Week 6+',
    description: 'After rigorous cross-device QA, security audits, and speed optimizations, we deploy your project to production. You receive 100% source code ownership, credentials, and post-launch warranty.'
  }
];

const TECH_CATEGORIES = [
  {
    category: 'Frontend & UI',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3', 'Figma']
  },
  {
    category: 'Backend & APIs',
    technologies: ['Node.js', 'Express', 'Python FastAPI', 'Django', 'REST APIs', 'GraphQL']
  },
  {
    category: 'Mobile Development',
    technologies: ['Flutter', 'React Native', 'Android (Kotlin)', 'iOS (Swift)']
  },
  {
    category: 'Databases & Cloud',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Vercel', 'GitHub Actions']
  }
];

const FAQS = [
  {
    question: 'How quickly can Abhimanyu Technologies begin our project?',
    answer: 'We can typically kick off the discovery and scoping session within 24 to 48 hours of our initial consultation call. For straightforward projects, development starts immediately after scope sign-off.'
  },
  {
    question: 'Do we own 100% of the source code and intellectual property?',
    answer: 'Yes, absolutely. Upon completion of project milestones, you retain 100% intellectual property ownership of all source code, Figma design assets, database schemas, and documentation with zero vendor lock-in.'
  },
  {
    question: 'How do you handle project pricing and payments?',
    answer: 'We offer two transparent models: (1) Fixed-Price Milestone Contracts for projects with clearly defined scopes, and (2) Dedicated Monthly Sprints for evolving products and startups. Payments are tied to approved deliverables.'
  },
  {
    question: 'Can you sign a Non-Disclosure Agreement (NDA) before we discuss details?',
    answer: 'Yes. We treat all client ideas and trade secrets with strict confidentiality. We are pleased to execute our mutual NDA or review and sign your company’s standard agreement prior to our first detailed call.'
  },
  {
    question: 'Do you provide maintenance and support after launch?',
    answer: 'Yes. Every project includes a 30-day complimentary post-launch bug-fix warranty. After that, we offer affordable monthly SLA maintenance packages for updates, monitoring, and continuous feature additions.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('web-development');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Web Applications',
    budget: '$1,000 – $5,000 (₹75k – ₹4L)',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Quick Quote Modal Form State
  const [quoteData, setQuoteData] = useState({
    name: '',
    contact: '',
    projectScope: 'Custom Web Application',
    note: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and project message.');
      return;
    }

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteData.name || !quoteData.contact) {
      alert('Please provide your name and contact details.');
      return;
    }
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteModalOpen(false);
      setQuoteSubmitted(false);
      setQuoteData({ name: '', contact: '', projectScope: 'Custom Web Application', note: '' });
      alert('Thank you! Our engineering lead will reach out to you within 24 hours.');
    }, 1800);
  };

  const selectServiceForInquiry = (serviceTitle) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* --- TOP ANNOUNCEMENT BANNER --- */}
      <div style={styles.topBanner}>
        <div style={styles.container}>
          <div style={styles.topBannerContent}>
            <span>🚀 <strong>Now Accepting Projects:</strong> Partner with Abhimanyu Technologies to build your web or mobile app.</span>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              style={styles.topBannerLink}
            >
              Get Free Estimate &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* --- SITE HEADER & NAVBAR --- */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          {/* Brand Logo */}
          <a href="#" style={styles.brandLogo} onClick={(e) => scrollToSection(e, 'top')}>
            <div style={styles.brandIconBox}>
              <span style={styles.brandIconText}>AT</span>
            </div>
            <div style={styles.brandTextWrapper}>
              <span style={styles.brandTitle}>Abhimanyu Technologies</span>
              <span style={styles.brandSubtitle}>Software Engineering Startup</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={styles.desktopNav}>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} style={styles.navLink}>Services</a>
            <a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')} style={styles.navLink}>Why Us</a>
            <a href="#process" onClick={(e) => scrollToSection(e, 'process')} style={styles.navLink}>How We Work</a>
            <a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')} style={styles.navLink}>Tech Stack</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} style={styles.navLink}>About</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} style={styles.navLink}>FAQ</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={styles.navLink}>Contact</a>
          </nav>

          {/* Header Action Button */}
          <div style={styles.headerCtaWrapper}>
            <button
              onClick={() => setQuoteModalOpen(true)}
              style={styles.primaryBtnSmall}
            >
              Get a Quote
            </button>
            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.mobileMenuToggle}
              aria-label="Toggle navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={styles.mobileNavDrawer}>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} style={styles.mobileNavLink}>Services</a>
            <a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')} style={styles.mobileNavLink}>Why Us</a>
            <a href="#process" onClick={(e) => scrollToSection(e, 'process')} style={styles.mobileNavLink}>How We Work</a>
            <a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')} style={styles.mobileNavLink}>Tech Stack</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} style={styles.mobileNavLink}>About</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} style={styles.mobileNavLink}>FAQ</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={styles.mobileNavLink}>Contact</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              style={styles.mobileCtaBtn}
            >
              Request a Free Quote
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="top" style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot}></span>
              <span>Software Engineering & Digital Solutions Studio</span>
            </div>

            <h1 className="hero-title" style={styles.heroTitle}>
              We Build Modern Web & Mobile Software for Next-Gen Startups.
            </h1>

            <p className="hero-subtitle" style={styles.heroSubtitle}>
              Abhimanyu Technologies is an agile software development startup based in Telangana, India.
              We partner with founders, businesses, and forward-thinking teams to architect, design,
              and ship robust digital platforms with clean code and rapid turnaround.
            </p>

            <div style={styles.heroActions}>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                style={styles.primaryBtnLarge}
              >
                Start Your Project &rarr;
              </a>
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                style={styles.secondaryBtnLarge}
              >
                Explore Services
              </a>
              <a
                href="https://wa.me/919999999999?text=Hi%20Abhimanyu%20Technologies,%20I%20would%20like%20to%20discuss%20a%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.45 1.743 1.543 2.716 1.093.973 1.968 1.272 2.247 1.393.279.12.443.104.607-.087.164-.191.7-1.02.888-1.37.188-.35.376-.292.628-.198.252.094 1.597.753 1.871.89.274.137.457.205.525.321.068.116.068.673-.076 1.078z" />
                </svg>
                WhatsApp Chat
              </a>
            </div>

            {/* Quick Trust Pillars Grid */}
            <div style={styles.trustGrid}>
              <div style={styles.trustCard}>
                <div style={styles.trustIcon}>⚡</div>
                <div style={styles.trustText}>
                  <strong>Rapid Sprints</strong>
                  <span>2-week agile cycles with continuous demos</span>
                </div>
              </div>
              <div style={styles.trustCard}>
                <div style={styles.trustIcon}>💎</div>
                <div style={styles.trustText}>
                  <strong>Clean Architecture</strong>
                  <span>Maintainable, tested code ready for scale</span>
                </div>
              </div>
              <div style={styles.trustCard}>
                <div style={styles.trustIcon}>🛡️</div>
                <div style={styles.trustText}>
                  <strong>100% IP Ownership</strong>
                  <span>Full source code and repositories handed over</span>
                </div>
              </div>
              <div style={styles.trustCard}>
                <div style={styles.trustIcon}>🤝</div>
                <div style={styles.trustText}>
                  <strong>Direct Access</strong>
                  <span>Work directly with engineers, zero bureaucracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>WHAT WE DO</span>
            <h2 style={styles.sectionTitle}>Full-Stack Engineering Services</h2>
            <p style={styles.sectionSubtitle}>
              From early-stage product prototypes to robust, enterprise-grade cloud systems,
              we deliver end-to-end digital solutions tailored to your unique requirements.
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <div key={s.id} style={styles.serviceCard}>
                <div style={styles.serviceCardHeader}>
                  <span style={styles.serviceBadge}>{s.badge}</span>
                  <h3 style={styles.serviceTitle}>{s.title}</h3>
                  <p style={styles.serviceTagline}>{s.tagline}</p>
                </div>
                <p style={styles.serviceDesc}>{s.description}</p>

                <div style={styles.deliverablesList}>
                  <strong style={styles.deliverableHeading}>Key Deliverables:</strong>
                  {s.deliverables.map((item, idx) => (
                    <div key={idx} style={styles.deliverableItem}>
                      <span style={styles.checkIcon}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.techPillWrapper}>
                  {s.tech.map((t, idx) => (
                    <span key={idx} style={styles.techPill}>{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => selectServiceForInquiry(s.title)}
                  style={styles.serviceInquireBtn}
                >
                  Inquire About This Service &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section id="why-us" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>WHY ABHIMANYU TECHNOLOGIES</span>
            <h2 style={styles.sectionTitle}>Built for Founders, Startups & Fast Movers</h2>
            <p style={styles.sectionSubtitle}>
              Large agencies charge enterprise overhead; freelance marketplaces lack accountability.
              We provide the perfect balance: dedicated, senior-level engineering craftsmanship at startup speed.
            </p>
          </div>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>🎯</div>
              <h3 style={styles.featureTitle}>Engineering-First Culture</h3>
              <p style={styles.featureText}>
                No non-technical intermediaries playing broken telephone. You collaborate directly with experienced engineers who write the code, solve architectural puzzles, and understand your product vision.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>⏱️</div>
              <h3 style={styles.featureTitle}>Predictable Milestones & Pricing</h3>
              <p style={styles.featureText}>
                We believe in complete transparency. Every project milestone has clearly defined deliverables, verifiable test criteria, and guaranteed transparent pricing with zero surprise invoices.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>🔒</div>
              <h3 style={styles.featureTitle}>Zero Vendor Lock-In</h3>
              <p style={styles.featureText}>
                You retain complete, exclusive ownership of your Git repositories, cloud deployment pipelines, Figma designs, and database schemas. Everything is documented for seamless future handoffs.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>🚀</div>
              <h3 style={styles.featureTitle}>Modern, Scalable Tech Stacks</h3>
              <p style={styles.featureText}>
                We avoid obsolete frameworks. By building with modern standards like React, Next.js, Flutter, and Node/FastAPI, your product is fast, secure, and effortlessly extensible by future in-house engineers.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>🛡️</div>
              <h3 style={styles.featureTitle}>Strict NDA & IP Confidentiality</h3>
              <p style={styles.featureText}>
                Your ideas, user data, and business strategies are protected under mutual Non-Disclosure Agreements before any technical discovery or architectural discussions commence.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconBox}>💬</div>
              <h3 style={styles.featureTitle}>Daily Updates & Open Slack/WhatsApp</h3>
              <p style={styles.featureText}>
                Stay in the loop with daily asynchronous sprint summaries, working staging links, and direct real-time communication via your preferred channel (Slack, WhatsApp, or Google Meet).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK / PROCESS SECTION --- */}
      <section id="process" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>HOW WE WORK</span>
            <h2 style={styles.sectionTitle}>Our 4-Step Agile Delivery Framework</h2>
            <p style={styles.sectionSubtitle}>
              A disciplined, transparent engineering methodology designed to take your idea from concept to production on schedule and within budget.
            </p>
          </div>

          <div style={styles.processGrid}>
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} style={styles.processCard}>
                <div style={styles.processStepNumber}>{step.step}</div>
                <div style={styles.processDurationBadge}>{step.duration}</div>
                <h3 style={styles.processTitle}>{step.title}</h3>
                <p style={styles.processDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section id="tech-stack" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>OUR TOOLS & STACK</span>
            <h2 style={styles.sectionTitle}>Modern, Battle-Tested Technologies</h2>
            <p style={styles.sectionSubtitle}>
              We choose trusted, high-performance open-source tools that guarantee speed, reliability, and widespread talent availability for your company's long-term growth.
            </p>
          </div>

          <div style={styles.techCategoryGrid}>
            {TECH_CATEGORIES.map((cat, idx) => (
              <div key={idx} style={styles.techCategoryCard}>
                <h3 style={styles.techCategoryTitle}>{cat.category}</h3>
                <div style={styles.techTagList}>
                  {cat.technologies.map((t, tIdx) => (
                    <span key={tIdx} style={styles.techBadgeItem}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <div className="about-wrapper" style={styles.aboutWrapper}>
            <div style={styles.aboutTextCol}>
              <span style={styles.sectionTag}>ABOUT US</span>
              <h2 style={styles.sectionTitle}>An Engineering-First Startup from Telangana, India</h2>
              <p style={styles.aboutParagraph}>
                <strong>Abhimanyu Technologies</strong> was founded with a singular, clear mission:
                to bridge the gap between high-level engineering talent and ambitious businesses
                needing custom digital products.
              </p>
              <p style={styles.aboutParagraph}>
                We operate as an agile, lean software engineering studio. Rather than relying on
                heavy corporate hierarchies, we focus entirely on code craftsmanship, architectural
                soundness, and genuine partnership with our clients. Whether you are an early-stage
                founder launching an MVP or an established enterprise modernizing legacy systems,
                we treat your product with the same dedication as our own venture.
              </p>

              <div style={styles.aboutValuesRow}>
                <div style={styles.valueItem}>
                  <div style={styles.valueNumber}>100%</div>
                  <div style={styles.valueLabel}>Source Code Ownership</div>
                </div>
                <div style={styles.valueItem}>
                  <div style={styles.valueNumber}>&lt; 24h</div>
                  <div style={styles.valueLabel}>Response Turnaround</div>
                </div>
                <div style={styles.valueItem}>
                  <div style={styles.valueNumber}>100%</div>
                  <div style={styles.valueLabel}>Agile Sprint Transparency</div>
                </div>
              </div>
            </div>

            <div style={styles.aboutCardCol}>
              <div style={styles.missionCard}>
                <h3 style={styles.missionCardTitle}>Our Guiding Principles</h3>
                <ul style={styles.missionList}>
                  <li>
                    <strong>Clarity Over Jargon:</strong> We speak plainly about what your project requires, without hiding behind buzzwords or unnecessary complexity.
                  </li>
                  <li>
                    <strong>Speed Without Shortcuts:</strong> We write clean, linted, tested code that allows fast iteration without generating crippling technical debt.
                  </li>
                  <li>
                    <strong>True Partnership:</strong> We advise you on what not to build just as passionately as what to build, ensuring your budget is invested wisely.
                  </li>
                  <li>
                    <strong>Full Confidentiality:</strong> Your intellectual property, user metrics, and business logic remain strictly guarded under mutual NDA.
                  </li>
                </ul>
                <div style={styles.locationTag}>
                  📍 Headquartered in Telangana, India • Serving Clients Globally
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={styles.sectionTitle}>Got Questions? We Have Answers</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need to know about partnering with Abhimanyu Technologies for your software development needs.
            </p>
          </div>

          <div style={styles.faqList}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} style={styles.faqItem}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    style={styles.faqQuestionBtn}
                    aria-expanded={isOpen}
                  >
                    <span style={styles.faqQuestionText}>{faq.question}</span>
                    <span style={styles.faqToggleIcon}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={styles.faqAnswerContent}>
                      <p style={styles.faqAnswerText}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CONTACT & ESTIMATE SECTION --- */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>GET IN TOUCH</span>
            <h2 style={styles.sectionTitle}>Ready to Build Something Remarkable?</h2>
            <p style={styles.sectionSubtitle}>
              Tell us about your project or product idea. We’ll review your requirements and provide
              an actionable scope, timeline estimate, and technical roadmap within 24 hours.
            </p>
          </div>

          <div className="contact-wrapper" style={styles.contactWrapper}>
            {/* Contact Form */}
            <div style={styles.contactFormCard}>
              {formSubmitted ? (
                <div style={styles.successCard}>
                  <div style={styles.successIcon}>✓</div>
                  <h3 style={styles.successTitle}>Inquiry Received!</h3>
                  <p style={styles.successText}>
                    Thank you, <strong>{formData.name}</strong>. We have received your project details regarding <strong>{formData.service}</strong>.
                    Our lead engineer will review your scope and get in touch with you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <div style={styles.successActions}>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: 'Custom Web Applications',
                          budget: '$1,000 – $5,000 (₹75k – ₹4L)',
                          message: ''
                        });
                      }}
                      style={styles.secondaryBtnSmall}
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:contact@abhimanu-technologies.app?subject=Project Inquiry - ${encodeURIComponent(formData.service)}&body=Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0ABudget: ${encodeURIComponent(formData.budget)}%0A%0AProject Details:%0A${encodeURIComponent(formData.message)}`}
                      style={styles.emailDirectBtn}
                    >
                      Open in Email App
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={styles.contactForm}>
                  <h3 style={styles.formTitle}>Request a Project Consultation</h3>

                  <div className="form-row" style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        style={styles.formInput}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. rahul@company.com"
                        required
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className="form-row" style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. +91 98765 43210"
                        style={styles.formInput}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Service Needed</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        style={styles.formSelect}
                      >
                        <option value="Custom Web Applications">Custom Web Applications</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Backend Systems & APIs">Backend Systems & APIs</option>
                        <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                        <option value="UI/UX Design & Prototyping">UI/UX Design & Prototyping</option>
                        <option value="Software Maintenance & Upgrades">Software Maintenance & Upgrades</option>
                        <option value="Full MVP Package">Full MVP Development Package</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Estimated Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleFormChange}
                      style={styles.formSelect}
                    >
                      <option value="Under $1,000 (Under ₹75k)">Under $1,000 (Under ₹75,000)</option>
                      <option value="$1,000 – $5,000 (₹75k – ₹4L)">$1,000 – $5,000 (₹75,000 – ₹4,00,000)</option>
                      <option value="$5,000 – $15,000 (₹4L – ₹12L)">$5,000 – $15,000 (₹4,00,000 – ₹12,00,000)</option>
                      <option value="$15,000+ (₹12L+)">$15,000+ (₹12,00,000+)</option>
                      <option value="Flexible / Need Consultation">Flexible / Need Consultation</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Project Details & Requirements *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Briefly describe what you would like to build, your target timeline, or any specific features..."
                      required
                      style={styles.formTextarea}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    style={styles.formSubmitBtn}
                  >
                    {formLoading ? 'Submitting...' : 'Send Project Inquiry →'}
                  </button>
                  <p style={styles.formPrivacyNote}>
                    🔒 We respect your privacy. All information is protected under mutual non-disclosure. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Direct Contact Info Card */}
            <div style={styles.contactInfoCard}>
              <h3 style={styles.contactInfoTitle}>Direct Communication</h3>
              <p style={styles.contactInfoDesc}>
                Prefer direct correspondence? Feel free to reach out to our team directly via email or WhatsApp.
              </p>

              <div style={styles.infoBlock}>
                <div style={styles.infoLabel}>Official Email</div>
                <a href="mailto:contact@abhimanu-technologies.app" style={styles.infoValueLink}>
                  contact@abhimanu-technologies.app
                </a>
              </div>

              <div style={styles.infoBlock}>
                <div style={styles.infoLabel}>Primary Location</div>
                <div style={styles.infoValue}>
                  Telangana, India
                </div>
              </div>

              <div style={styles.infoBlock}>
                <div style={styles.infoLabel}>Working Hours</div>
                <div style={styles.infoValue}>
                  Monday – Saturday: 9:00 AM – 7:00 PM IST
                </div>
              </div>

              <div style={styles.infoBlock}>
                <div style={styles.infoLabel}>Response Time SLA</div>
                <div style={styles.infoValue}>
                  Within 24 business hours guaranteed
                </div>
              </div>

              <hr style={styles.divider} />

              <div style={styles.directChatBox}>
                <h4 style={styles.chatBoxTitle}>Need an Instant Response?</h4>
                <p style={styles.chatBoxDesc}>
                  Chat with our technical founders directly on WhatsApp to discuss your software vision right away.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Abhimanyu%20Technologies,%20I'd%20like%20to%20discuss%20a%20new%20software%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.directWhatsAppBtn}
                >
                  Message on WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK QUOTE MODAL --- */}
      {quoteModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setQuoteModalOpen(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Request a Rapid Quote</h3>
              <button
                onClick={() => setQuoteModalOpen(false)}
                style={styles.modalCloseBtn}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <p style={styles.modalSubtitle}>
              Share a few quick details and our technical lead will prepare a customized proposal for your software.
            </p>

            {quoteSubmitted ? (
              <div style={styles.modalSuccess}>
                <div style={styles.checkBig}>✓</div>
                <h4>Thank you!</h4>
                <p>We will contact you shortly with an initial estimate.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} style={styles.modalForm}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Your Name *</label>
                  <input
                    type="text"
                    value={quoteData.name}
                    onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                    placeholder="e.g. Priya Reddy"
                    required
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email or Phone Number *</label>
                  <input
                    type="text"
                    value={quoteData.contact}
                    onChange={(e) => setQuoteData({ ...quoteData, contact: e.target.value })}
                    placeholder="priya@example.com or +91..."
                    required
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Project Type</label>
                  <select
                    value={quoteData.projectScope}
                    onChange={(e) => setQuoteData({ ...quoteData, projectScope: e.target.value })}
                    style={styles.formSelect}
                  >
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                    <option value="Backend / Cloud Architecture">Backend / Cloud Architecture</option>
                    <option value="UI/UX Prototype">UI/UX Prototype</option>
                    <option value="Other / Complete System">Other / Complete System</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Brief Description / Notes</label>
                  <textarea
                    rows={3}
                    value={quoteData.note}
                    onChange={(e) => setQuoteData({ ...quoteData, note: e.target.value })}
                    placeholder="Key features, desired launch date, or questions..."
                    style={styles.formTextarea}
                  />
                </div>
                <button type="submit" style={styles.modalSubmitBtn}>
                  Submit Quote Request &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div className="footer-grid" style={styles.footerGrid}>
            {/* Brand Col */}
            <div style={styles.footerBrandCol}>
              <div style={styles.brandLogo}>
                <div style={styles.brandIconBox}>
                  <span style={styles.brandIconText}>AT</span>
                </div>
                <div style={styles.brandTextWrapper}>
                  <span style={styles.brandTitle}>Abhimanyu Technologies</span>
                  <span style={styles.brandSubtitle}>Software Engineering Studio</span>
                </div>
              </div>
              <p style={styles.footerBio}>
                We design and engineer modern web applications, mobile apps, and scalable digital solutions for growing startups and ambitious businesses worldwide.
              </p>
              <div style={styles.footerBadge}>
                📍 Based in Telangana, India • Available for Global Clients
              </div>
            </div>

            {/* Quick Links */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>Navigation</h4>
              <ul style={styles.footerList}>
                <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} style={styles.footerLink}>Services</a></li>
                <li><a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')} style={styles.footerLink}>Why Choose Us</a></li>
                <li><a href="#process" onClick={(e) => scrollToSection(e, 'process')} style={styles.footerLink}>How We Work</a></li>
                <li><a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')} style={styles.footerLink}>Tech Stack</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} style={styles.footerLink}>About Us</a></li>
                <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} style={styles.footerLink}>FAQ</a></li>
              </ul>
            </div>

            {/* Services Links */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>Core Capabilities</h4>
              <ul style={styles.footerList}>
                <li><span style={styles.footerTextItem}>Custom Web Development</span></li>
                <li><span style={styles.footerTextItem}>iOS & Android Mobile Apps</span></li>
                <li><span style={styles.footerTextItem}>Scalable Backend APIs</span></li>
                <li><span style={styles.footerTextItem}>Cloud & DevOps (AWS/Docker)</span></li>
                <li><span style={styles.footerTextItem}>UI/UX Design Systems</span></li>
                <li><span style={styles.footerTextItem}>Code Modernization & SLA</span></li>
              </ul>
            </div>

            {/* Contact Col */}
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>Get in Touch</h4>
              <p style={styles.footerContactText}>
                Email: <a href="mailto:contact@abhimanu-technologies.app" style={styles.footerLink}>contact@abhimanu-technologies.app</a>
              </p>
              <p style={styles.footerContactText}>
                Location: Telangana, India
              </p>
              <p style={styles.footerContactText}>
                SLA: Guaranteed 24hr response
              </p>
              <button
                onClick={() => setQuoteModalOpen(true)}
                style={styles.footerCtaBtn}
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={styles.copyrightText}>
              &copy; {new Date().getFullYear()} Abhimanyu Technologies. All rights reserved. 100% intellectual property ownership guaranteed.
            </div>
            <div style={styles.footerBottomLinks}>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={styles.footerSubLink}>Privacy & NDA</a>
              <span style={styles.dotSeparator}>•</span>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={styles.footerSubLink}>Terms of Engagement</a>
              <span style={styles.dotSeparator}>•</span>
              <a href="#top" onClick={(e) => scrollToSection(e, 'top')} style={styles.footerSubLink}>Back to Top &uarr;</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- CSS-IN-JS INLINE DESIGN SYSTEM ---
const styles = {
  pageWrapper: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    lineHeight: '1.6',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  },
  // Top Banner
  topBanner: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    fontSize: '13px',
    padding: '10px 0',
    borderBottom: '1px solid #334155'
  },
  topBannerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  topBannerLink: {
    color: '#38BDF8',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '13px'
  },
  // Header
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #E2E8F0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'inherit'
  },
  brandIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#2563EB',
    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '18px',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
  },
  brandIconText: {
    letterSpacing: '-0.5px'
  },
  brandTextWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: '-0.3px',
    lineHeight: '1.2'
  },
  brandSubtitle: {
    fontSize: '12px',
    color: '#64748B',
    fontWeight: '500'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    textDecoration: 'none',
    color: '#475569',
    fontSize: '14.5px',
    fontWeight: '500',
    transition: 'color 0.15s ease'
  },
  headerCtaWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  primaryBtnSmall: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 1px 3px rgba(37, 99, 235, 0.2)'
  },
  mobileMenuToggle: {
    display: 'none',
    background: 'none',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    color: '#0F172A'
  },
  mobileNavDrawer: {
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#1E293B',
    fontSize: '16px',
    fontWeight: '500',
    padding: '6px 0'
  },
  mobileCtaBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px'
  },
  // Hero
  heroSection: {
    padding: '80px 0 60px 0',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
    borderBottom: '1px solid #E2E8F0'
  },
  heroContent: {
    maxWidth: '860px',
    margin: '0 auto',
    textAlign: 'center'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    color: '#1D4ED8',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '24px'
  },
  heroBadgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#2563EB'
  },
  heroTitle: {
    fontSize: '44px',
    fontWeight: '800',
    lineHeight: '1.2',
    color: '#0F172A',
    letterSpacing: '-1px',
    marginBottom: '20px'
  },
  heroSubtitle: {
    fontSize: '18px',
    lineHeight: '1.65',
    color: '#475569',
    marginBottom: '36px',
    maxWidth: '740px',
    margin: '0 auto 36px auto'
  },
  heroActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
    marginBottom: '60px'
  },
  primaryBtnLarge: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '14px 28px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
    display: 'inline-block',
    transition: 'transform 0.15s ease'
  },
  secondaryBtnLarge: {
    backgroundColor: '#FFFFFF',
    color: '#334155',
    border: '1px solid #CBD5E1',
    textDecoration: 'none',
    padding: '14px 26px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    display: 'inline-block'
  },
  whatsappBtn: {
    backgroundColor: '#22C55E',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '14px 22px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
  },
  trustGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    textAlign: 'left'
  },
  trustCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
  },
  trustIcon: {
    fontSize: '24px',
    lineHeight: '1'
  },
  trustText: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '13px',
    color: '#64748B',
    lineHeight: '1.4'
  },
  // Section Headers
  section: {
    padding: '80px 0',
    borderBottom: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF'
  },
  sectionLight: {
    padding: '80px 0',
    borderBottom: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC'
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 50px auto'
  },
  sectionTag: {
    color: '#2563EB',
    fontSize: '12.5px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  sectionTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: '-0.5px',
    lineHeight: '1.25',
    marginBottom: '14px'
  },
  sectionSubtitle: {
    fontSize: '16.5px',
    color: '#64748B',
    lineHeight: '1.6'
  },
  // Services
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px'
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  },
  serviceCardHeader: {
    marginBottom: '12px'
  },
  serviceBadge: {
    display: 'inline-block',
    fontSize: '11.5px',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    marginBottom: '12px'
  },
  serviceTitle: {
    fontSize: '21px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '6px'
  },
  serviceTagline: {
    fontSize: '14px',
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: '12px'
  },
  serviceDesc: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  deliverablesList: {
    backgroundColor: '#F8FAFC',
    borderRadius: '10px',
    padding: '14px 16px',
    marginBottom: '20px'
  },
  deliverableHeading: {
    display: 'block',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  deliverableItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13.5px',
    color: '#334155',
    marginBottom: '6px'
  },
  checkIcon: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: '14px'
  },
  techPillWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '24px'
  },
  techPill: {
    backgroundColor: '#F1F5F9',
    color: '#475569',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '6px'
  },
  serviceInquireBtn: {
    marginTop: 'auto',
    backgroundColor: '#F8FAFC',
    color: '#2563EB',
    border: '1px solid #CBD5E1',
    padding: '11px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s ease'
  },
  // Features / Why Us
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '28px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
  },
  featureIconBox: {
    fontSize: '28px',
    marginBottom: '16px'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '10px'
  },
  featureText: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.6'
  },
  // Process
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  processCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '28px',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
  },
  processStepNumber: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#DBEAFE',
    lineHeight: '1',
    marginBottom: '12px'
  },
  processDurationBadge: {
    display: 'inline-block',
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    fontSize: '12px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
    marginBottom: '12px'
  },
  processTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '10px'
  },
  processDesc: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: '1.6'
  },
  // Tech Stack
  techCategoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px'
  },
  techCategoryCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '24px'
  },
  techCategoryTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '16px',
    borderBottom: '2px solid #EFF6FF',
    paddingBottom: '8px'
  },
  techTagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  techBadgeItem: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
    padding: '6px 12px',
    borderRadius: '8px'
  },
  // About
  aboutWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '40px',
    alignItems: 'center'
  },
  aboutTextCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  aboutParagraph: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '16px'
  },
  aboutValuesRow: {
    display: 'flex',
    gap: '24px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  valueItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  valueNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#2563EB',
    lineHeight: '1.1'
  },
  valueLabel: {
    fontSize: '13px',
    color: '#64748B',
    fontWeight: '500'
  },
  aboutCardCol: {
    display: 'flex'
  },
  missionCard: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '32px',
    width: '100%'
  },
  missionCardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '18px'
  },
  missionList: {
    listStyleType: 'none',
    padding: 0,
    margin: '0 0 24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    fontSize: '14.5px',
    color: '#334155',
    lineHeight: '1.55'
  },
  locationTag: {
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    padding: '10px 14px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  // FAQ
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '18px 22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: '#0F172A'
  },
  faqQuestionText: {
    paddingRight: '16px'
  },
  faqToggleIcon: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2563EB'
  },
  faqAnswerContent: {
    padding: '0 22px 20px 22px',
    borderTop: '1px solid #F1F5F9'
  },
  faqAnswerText: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.65',
    margin: '12px 0 0 0'
  },
  // Contact
  contactWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '32px'
  },
  contactFormCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '36px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '24px'
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  formLabel: {
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#334155'
  },
  formInput: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A',
    outline: 'none',
    backgroundColor: '#FFFFFF'
  },
  formSelect: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    outline: 'none'
  },
  formTextarea: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '14.5px',
    color: '#0F172A',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  formSubmitBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
  },
  formPrivacyNote: {
    fontSize: '12px',
    color: '#64748B',
    textAlign: 'center',
    margin: '4px 0 0 0'
  },
  successCard: {
    textAlign: 'center',
    padding: '30px 10px'
  },
  successIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    fontSize: '28px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto'
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '10px'
  },
  successText: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  successActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  secondaryBtnSmall: {
    backgroundColor: '#F1F5F9',
    color: '#334155',
    border: '1px solid #CBD5E1',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  emailDirectBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600'
  },
  contactInfoCard: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '36px'
  },
  contactInfoTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  contactInfoDesc: {
    fontSize: '14.5px',
    color: '#64748B',
    marginBottom: '24px'
  },
  infoBlock: {
    marginBottom: '18px'
  },
  infoLabel: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#64748B',
    letterSpacing: '0.5px',
    marginBottom: '4px'
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0F172A'
  },
  infoValueLink: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#2563EB',
    textDecoration: 'none'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #E2E8F0',
    margin: '24px 0'
  },
  directChatBox: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '20px'
  },
  chatBoxTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '6px'
  },
  chatBoxDesc: {
    fontSize: '13.5px',
    color: '#475569',
    marginBottom: '14px',
    lineHeight: '1.5'
  },
  directWhatsAppBtn: {
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block'
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '520px',
    padding: '32px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0F172A'
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#64748B',
    cursor: 'pointer',
    padding: '0 4px'
  },
  modalSubtitle: {
    fontSize: '14px',
    color: '#64748B',
    marginBottom: '20px'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  modalSubmitBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '6px'
  },
  modalSuccess: {
    textAlign: 'center',
    padding: '20px 0'
  },
  checkBig: {
    fontSize: '40px',
    color: '#16A34A',
    marginBottom: '8px'
  },
  // Footer
  footer: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    padding: '70px 0 30px 0'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.2fr 1.5fr',
    gap: '40px',
    marginBottom: '50px'
  },
  footerBrandCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerBio: {
    fontSize: '14px',
    color: '#94A3B8',
    lineHeight: '1.65',
    margin: '16px 0 16px 0',
    maxWidth: '340px'
  },
  footerBadge: {
    fontSize: '12.5px',
    color: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    padding: '6px 12px',
    borderRadius: '6px',
    display: 'inline-block'
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerHeading: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '16px',
    letterSpacing: '0.3px'
  },
  footerList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  footerLink: {
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.15s ease'
  },
  footerTextItem: {
    color: '#94A3B8',
    fontSize: '14px'
  },
  footerContactText: {
    fontSize: '14px',
    color: '#94A3B8',
    margin: '0 0 10px 0',
    lineHeight: '1.5'
  },
  footerCtaBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    alignSelf: 'flex-start'
  },
  footerBottom: {
    borderTop: '1px solid #1E293B',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    fontSize: '13px',
    color: '#64748B'
  },
  copyrightText: {
    color: '#94A3B8'
  },
  footerBottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  footerSubLink: {
    color: '#94A3B8',
    textDecoration: 'none'
  },
  dotSeparator: {
    color: '#475569'
  }
};
