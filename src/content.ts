export type Language = "es" | "en";
type Project = {
  title: string;
  description: string;
  link: string;
  category?: string;
  image?: string;
  alt?: string;
};
const links = {
  oasis: "https://oasis-project.iglesiadeoasis.com/",
  garden: "https://greengardensjn.netlify.app/",
  spa: "https://spaferny.netlify.app/",
  church: "https://iglesiadeoasis.com/",
  grid: "https://gridedit.netlify.app/",
  shopping: "https://nota-compra.netlify.app/",
  finance: "https://analis-gastos.netlify.app/",
  cafe: "https://blogcafefer.netlify.app/",
};
export const content = {
  es: {
    seoTitle: "Diseño web, flyers y videos para tu negocio | Fernely Dev",
    seoDescription:
      "Dale presencia a tu negocio con páginas web, diseño de flyers y videos para redes. Conoce el trabajo de Fernely Dev y solicita una cotización en español o inglés.",
    skip: "Saltar al contenido",
    brand: "Diseño · Video · Web",
    navigation: "Navegación principal",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    nav: [
      ["services", "Servicios"],
      ["projects", "Proyectos"],
      ["process", "Cómo trabajamos"],
      ["about", "Sobre mí"],
    ],
    quote: "Cotiza tu proyecto",
    eyebrow: "Diseño y desarrollo para negocios",
    headline: "Tu negocio merece ",
    headlineAccent: "verse así de bien.",
    description:
      "Páginas web, flyers y videos que explican lo que ofreces y hacen más fácil que tus próximos clientes te contacten.",
    heroCta: "Hablemos de tu proyecto",
    seeWork: "Ver mi trabajo",
    direct: "Trato directo conmigo",
    heroImage: "Interfaz de FlujoEclesial Studio, proyecto web de Fernely Dev",
    selectedProject: "Proyecto destacado / Aplicación web",
    sticker: ["Diseño con intención.", "Desarrollo a tu medida."],
    showcaseNote: "De una buena idea a una experiencia digital.",
    specialties: "Una idea. Muchas posibilidades.",
    specialtyItems: [
      "Diseño web",
      "Flyers & diseño gráfico",
      "Video para redes",
    ],
    servicesLabel: "Lo que puedo hacer por ti",
    servicesTitle: "Haz que te vean.\nDales un motivo para elegirte.",
    servicesIntro:
      "Elige lo que tu negocio necesita hoy. Podemos combinar servicios para que tu marca se vea consistente en cada lugar.",
    serviceCta: "Quiero esto para mi negocio",
    services: [
      {
        title: "Páginas web",
        description:
          "Un espacio propio para presentar tu negocio, mostrar tus servicios y recibir consultas.",
        features: [
          "Diseño adaptable a móvil",
          "Servicios y contacto fáciles de encontrar",
          "Desarrollo con React o HTML y CSS",
        ],
      },
      {
        title: "Flyers y diseño gráfico",
        description:
          "Piezas visuales para comunicar tu próxima promoción, evento o lanzamiento con claridad.",
        features: [
          "Diseño alineado con tu marca",
          "Contenido para promociones y eventos",
          "Formatos según dónde lo publicarás",
        ],
      },
      {
        title: "Videos para redes",
        description:
          "Dale movimiento a tus ideas con contenido pensado para presentar tu negocio en redes sociales.",
        features: [
          "Edición para contenido promocional",
          "Mensaje enfocado en tu oferta",
          "Formato adaptado a tu plataforma",
        ],
      },
    ],
    workLabel: "El trabajo habla",
    workTitle: "Ideas que ya\ntienen forma.",
    workIntro:
      "Explora proyectos de mi portafolio: sitios de servicios y herramientas web. Abre cada ejemplo para verlo en acción.",
    visit: "Explorar proyecto",
    newTab: "se abre en una pestaña nueva",
    moreWork: "Más proyectos del portafolio",
    workCta: "¿Tienes algo parecido en mente? Vamos a darle tu propio estilo.",
    projects: [
      {
        title: "FlujoEclesial Studio",
        category: "Aplicación web / Iglesias",
        image: "/img/optimized/oasis.webp",
        alt: "Panel de control de FlujoEclesial Studio",
        description:
          "Centro de control para proyección en iglesias, con sincronización y gestión de contenido.",
        link: links.oasis,
      },
      {
        title: "Green Gardens",
        category: "Diseño web / Servicios",
        image: "/img/optimized/garden.webp",
        alt: "Sitio web de jardinería Green Gardens",
        description:
          "Una presentación visual de servicios de jardinería, con una identidad inspirada en la naturaleza.",
        link: links.garden,
      },
      {
        title: "Spa & Masajes Ferny",
        category: "Diseño web / Bienestar",
        image: "/img/optimized/spa.webp",
        alt: "Página de servicios del spa Ferny",
        description:
          "Una experiencia web que presenta servicios y tratamientos con una estética cálida y relajante.",
        link: links.spa,
      },
      {
        title: "Iglesia de Oasis",
        category: "Diseño web / Comunidad",
        image: "/img/optimized/church.webp",
        alt: "Página principal de Iglesia de Oasis",
        description:
          "Un punto de encuentro digital para compartir mensajes, eventos y recursos de la comunidad.",
        link: links.church,
      },
      {
        title: "Visual CSS Grid Editor Pro",
        description:
          "Editor visual para construir distribuciones con CSS Grid.",
        link: links.grid,
      },
      {
        title: "Lista de compras",
        description: "Una herramienta para organizar compras y sus gastos.",
        link: links.shopping,
      },
      {
        title: "Control financiero personal",
        description: "Organización de gastos y presupuestos personales.",
        link: links.finance,
      },
      {
        title: "Blog de Café",
        description: "Artículos y contenido sobre café en un diseño cálido.",
        link: links.cafe,
      },
    ] as Project[],
    processLabel: "Sin complicaciones",
    processTitle: "Una buena colaboración\nempieza con claridad.",
    processIntro:
      "Sabrás qué estamos creando, qué necesito de ti y cuál es el siguiente paso.",
    steps: [
      {
        title: "Me cuentas tu idea",
        description:
          "Hablamos de tu negocio, tu público, lo que necesitas y la fecha que tienes en mente.",
      },
      {
        title: "Definimos la propuesta",
        description:
          "Acordamos alcance, precio, entregables y tiempos antes de comenzar.",
      },
      {
        title: "Creamos y revisamos",
        description:
          "Desarrollo el proyecto y revisamos juntos los ajustes acordados para la entrega.",
      },
    ],
    aboutLabel: "La persona detrás del proyecto",
    aboutTitle: "Hola, soy Fernely.\nTu contacto de principio a fin.",
    aboutText:
      "Soy desarrollador web y creador de contenido visual. Combino diseño gráfico, edición de video y tecnología para dar forma a ideas que resuelven necesidades reales.",
    aboutValues:
      "Mi fe cristiana guía mi manera de trabajar: con integridad, dedicación y atención a los detalles. Cuando me escribes, hablas con quien crea tu proyecto.",
    aboutCta: "Cuéntame qué necesitas",
    faqLabel: "Antes de comenzar",
    faqTitle: "Lo que quizá\nte estás preguntando.",
    faqIntro:
      "¿Tu proyecto necesita algo diferente? Escríbeme y lo conversamos.",
    ask: "Hacer una pregunta",
    faqs: [
      {
        question: "¿Cuánto cuesta un proyecto?",
        answer:
          "Depende del servicio, el alcance y las piezas que necesitas. Puedes consultar la página de precios desde la sección de contacto o contarme tu idea para definir una cotización.",
      },
      {
        question: "¿Qué necesitas para comenzar?",
        answer:
          "Una breve descripción de tu negocio, el servicio que buscas y tu objetivo. Si ya tienes logo, textos, fotos o referencias, también ayudarán a definir el proyecto.",
      },
      {
        question: "¿Cuánto tiempo toma la entrega?",
        answer:
          "El plazo depende del alcance y de los materiales disponibles. Lo acordamos en la propuesta antes de iniciar, junto con las revisiones y los entregables.",
      },
      {
        question: "¿Podemos trabajar en español o en inglés?",
        answer:
          "Sí. Puedes contactarme en cualquiera de los dos idiomas. También podemos definir contenido bilingüe para tu proyecto según las necesidades de tu público.",
      },
    ],
    contactLabel: "Tu próximo paso",
    contactTitle: "Cuéntame tu idea.\nVamos a darle forma.",
    contactIntro:
      "Dime qué haces, qué necesitas y para cuándo. Con eso podemos empezar a definir una propuesta para tu negocio.",
    contactLanguages: "Atención en español e inglés",
    prices: "Consultar página de precios",
    form: {
      title: "Empecemos por lo esencial",
      intro: "Prepara tu consulta y envíala desde tu aplicación de correo.",
      name: "Tu nombre",
      namePlaceholder: "¿Cómo te llamas?",
      service: "¿Qué necesitas?",
      choose: "Selecciona un servicio",
      other: "Quiero combinar servicios / Otra idea",
      message: "Cuéntame sobre tu proyecto",
      messagePlaceholder: "Mi negocio es… Necesito… Me gustaría tenerlo para…",
      submit: "Preparar correo",
      subject: "Consulta de proyecto",
      disclosure:
        "Este botón abre tu aplicación de correo con el mensaje preparado. Revísalo y pulsa Enviar allí. Estos datos no se guardan en esta web.",
      ready:
        "Tu correo está preparado; todavía debes enviarlo desde tu aplicación.",
      retry: "Abrir correo de nuevo",
      fallback: "Si no se abre, escribe directamente a fernelydev@gmail.com.",
    },
    footerTagline: "Diseño con propósito. Ideas con presencia.",
  },
  en: {
    seoTitle: "Web Design, Flyers & Videos for Your Business | Fernely Dev",
    seoDescription:
      "Give your business a stronger presence with website design, flyers and social media videos. Explore Fernely Dev’s portfolio and request a quote in English or Spanish.",
    skip: "Skip to content",
    brand: "Design · Video · Web",
    navigation: "Main navigation",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    nav: [
      ["services", "Services"],
      ["projects", "Work"],
      ["process", "The process"],
      ["about", "About me"],
    ],
    quote: "Get a project quote",
    eyebrow: "Design & development for businesses",
    headline: "Your business deserves ",
    headlineAccent: "to look this good.",
    description:
      "Websites, flyers and videos that make your offer clear and help your next customers get in touch.",
    heroCta: "Let’s talk about your project",
    seeWork: "Explore my work",
    direct: "Work directly with me",
    heroImage: "FlujoEclesial Studio interface, a web project by Fernely Dev",
    selectedProject: "Featured project / Web application",
    sticker: ["Thoughtful design.", "Built around your idea."],
    showcaseNote: "From a good idea to a digital experience.",
    specialties: "One idea. Many possibilities.",
    specialtyItems: [
      "Website design",
      "Flyers & graphic design",
      "Social media video",
    ],
    servicesLabel: "What I can do for you",
    servicesTitle: "Get seen.\nGive them a reason to choose you.",
    servicesIntro:
      "Start with what your business needs today. We can combine services to keep your brand consistent wherever it shows up.",
    serviceCta: "I want this for my business",
    services: [
      {
        title: "Websites",
        description:
          "A place of your own to introduce your business, explain your services and welcome inquiries.",
        features: [
          "Mobile-friendly design",
          "Easy-to-find services and contact details",
          "Built with React or HTML and CSS",
        ],
      },
      {
        title: "Flyers & graphic design",
        description:
          "Visual content that clearly communicates your next promotion, event or launch.",
        features: [
          "Design aligned with your brand",
          "Content for promotions and events",
          "Formats suited to where you’ll publish",
        ],
      },
      {
        title: "Social media videos",
        description:
          "Bring your ideas to life with video content designed to introduce your business on social media.",
        features: [
          "Editing for promotional content",
          "Messaging focused on your offer",
          "Formats adapted to your platform",
        ],
      },
    ],
    workLabel: "See the work",
    workTitle: "Ideas brought\nto life.",
    workIntro:
      "Explore service websites and web tools from my portfolio. Open each example to see it in action.",
    visit: "Explore project",
    newTab: "opens in a new tab",
    moreWork: "More from the portfolio",
    workCta: "Have something similar in mind? Let’s make it your own.",
    projects: [
      {
        title: "FlujoEclesial Studio",
        category: "Web application / Churches",
        image: "/img/optimized/oasis.webp",
        alt: "FlujoEclesial Studio control panel",
        description:
          "A church projection control center with synchronization and content management.",
        link: links.oasis,
      },
      {
        title: "Green Gardens",
        category: "Website design / Services",
        image: "/img/optimized/garden.webp",
        alt: "Green Gardens gardening website",
        description:
          "A visual introduction to gardening services with a nature-inspired identity.",
        link: links.garden,
      },
      {
        title: "Spa & Masajes Ferny",
        category: "Website design / Wellness",
        image: "/img/optimized/spa.webp",
        alt: "Ferny spa services website",
        description:
          "A web experience that presents services and treatments with a warm, relaxing feel.",
        link: links.spa,
      },
      {
        title: "Iglesia de Oasis",
        category: "Website design / Community",
        image: "/img/optimized/church.webp",
        alt: "Iglesia de Oasis homepage",
        description:
          "A digital gathering place for community messages, events and resources.",
        link: links.church,
      },
      {
        title: "Visual CSS Grid Editor Pro",
        description: "A visual tool for building CSS Grid layouts.",
        link: links.grid,
      },
      {
        title: "Shopping List",
        description: "A tool for organizing shopping lists and expenses.",
        link: links.shopping,
      },
      {
        title: "Personal Financial Control",
        description: "A tool for tracking personal expenses and budgets.",
        link: links.finance,
      },
      {
        title: "Coffee Blog",
        description: "Coffee articles and content with a warm visual design.",
        link: links.cafe,
      },
    ] as Project[],
    processLabel: "Keeping it simple",
    processTitle: "A good collaboration\nstarts with clarity.",
    processIntro:
      "You’ll know what we’re creating, what I need from you and what comes next.",
    steps: [
      {
        title: "Tell me your idea",
        description:
          "We discuss your business, audience, what you need and your preferred timeline.",
      },
      {
        title: "Define the proposal",
        description:
          "We agree on scope, price, deliverables and timing before work begins.",
      },
      {
        title: "Create and review",
        description:
          "I build your project, and we work through the agreed revisions for delivery.",
      },
    ],
    aboutLabel: "The person behind your project",
    aboutTitle: "Hi, I’m Fernely.\nYour contact from start to finish.",
    aboutText:
      "I’m a web developer and visual content creator. I combine graphic design, video editing and technology to bring ideas to life and solve real needs.",
    aboutValues:
      "My Christian faith guides how I work: with integrity, dedication and attention to detail. When you reach out, you talk to the person creating your project.",
    aboutCta: "Tell me what you need",
    faqLabel: "Before we begin",
    faqTitle: "A few things\nyou might be wondering.",
    faqIntro:
      "Does your project need something different? Send me a message and let’s discuss it.",
    ask: "Ask a question",
    faqs: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on the service, scope and assets you need. You can visit the pricing page from the contact section, or tell me about your idea so we can define a quote.",
      },
      {
        question: "What do you need to get started?",
        answer:
          "A short description of your business, the service you need and your goal. If you already have a logo, text, photos or references, those will help us define the project.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Timing depends on the scope and available materials. We agree on the timeline, revisions and deliverables in the proposal before starting.",
      },
      {
        question: "Can we work in English or Spanish?",
        answer:
          "Yes. You can reach out in either language. We can also discuss bilingual content for your project based on your audience’s needs.",
      },
    ],
    contactLabel: "Your next step",
    contactTitle: "Tell me your idea.\nLet’s bring it to life.",
    contactIntro:
      "Tell me about your business, what you need and your timeline. That gives us a starting point for your proposal.",
    contactLanguages: "Service in English and Spanish",
    prices: "Visit the pricing page",
    form: {
      title: "Let’s start with the essentials",
      intro: "Prepare your inquiry and send it from your email app.",
      name: "Your name",
      namePlaceholder: "What should I call you?",
      service: "What do you need?",
      choose: "Choose a service",
      other: "A mix of services / Another idea",
      message: "Tell me about your project",
      messagePlaceholder: "My business is… I need… My preferred timeline is…",
      submit: "Prepare email",
      subject: "Project inquiry",
      disclosure:
        "This button opens your email app with a prepared message. Review it and press Send there. This website does not store these details.",
      ready:
        "Your email is prepared; you still need to send it from your email app.",
      retry: "Open email again",
      fallback: "If it does not open, email fernelydev@gmail.com directly.",
    },
    footerTagline: "Thoughtful design. Ideas with presence.",
  },
};
