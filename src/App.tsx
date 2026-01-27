import { useState, useEffect } from 'react';
import { getImageUrl } from './utils/imageUtils';
import { Github, Mail, Menu, X, Code2, FileJson, Image, Atom, Palette, Brain, ChevronDown, Video, Camera, Share2, LayoutGrid, Sun, Moon } from 'lucide-react';
import ScrollReveal from './components/ScrollReveal';
import TextGenerateEffectDemo from './components/text-generate-effect-demo';
import Footer from './components/Footer';
import SplitHeroAnimation from './components/SplitHeroAnimation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style on scroll
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const skills = [
    { name: 'HTML', icon: Code2, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'JavaScript', icon: FileJson, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'CSS', icon: Palette, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'React', icon: Atom, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { name: 'Logo Design', icon: Image, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'AI / Prompt Engineering', icon: Brain, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Video Editing', icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Social Media', icon: Share2, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Photography', icon: Camera, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Git & GitHub', icon: Github, color: 'text-gray-700', bg: 'bg-gray-50' },
    { name: 'And much more...', icon: LayoutGrid, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const projects = [
    {
      title: 'FlujoEclesial Studio (Oasis Project)',
      description: 'A professional projector control center for churches, with real-time sync and content management.',
      image: '/img/projects/oasis.png',
      link: 'https://oasis-project.iglesiadeoasis.com/',
      tags: ['React', 'Supabase', 'Tailwind'],
    },
    {
      title: 'Visual CSS Grid Editor Pro',
      description: 'A powerful visual editor for creating CSS Grid layouts with ease using HTML, CSS, and JavaScript',
      image: '/img/visual-grid.png',
      link: 'https://gridedit.netlify.app/',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Shopping List',
      description: 'An application that helps you track your shopping expenses and create your shopping list',
      image: '/img/shopping.png',
      link: 'https://nota-compra.netlify.app/',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Personal Financial Control',
      description: 'A dynamic tool for managing personal finances, tracking expenses, and budgeting',
      image: '/img/financial.png',
      link: 'https://analis-gastos.netlify.app/',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Jardinería Green Gardens',
      description: 'A modern website for a gardening business with a clean, nature-inspired design',
      image: '/img/garden.png',
      link: 'https://greengardensjn.netlify.app/',
      tags: ['React', 'Tailwind'],
    },
    {
      title: 'Blog de Café',
      description: 'A coffee blog featuring articles, brewing guides, and reviews with a warm design',
      image: '/img/cafe.png',
      link: 'https://blogcafefer.netlify.app/',
      tags: ['HTML', 'CSS'],
    },
    {
      title: 'Spa & Masajes Ferny',
      description: 'A relaxing spa website offering services, treatments, and online booking',
      image: '/img/spa.png',
      link: 'https://spaferny.netlify.app/',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Iglesia de Oasis',
      description: 'A spiritual community website featuring sermons, events, and resources',
      image: '/img/iglesia.png',
      link: 'https://iglesiadeoasis.com/',
      tags: ['React', 'Tailwind'],
    },
  ];

  return (
    <div className="min-h-screen dark-premium-bg relative selection:bg-cyan-500/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? (isDarkMode ? 'bg-black/80 backdrop-blur-2xl' : 'bg-white/80 backdrop-blur-2xl shadow-xl')
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 md:h-24 items-center">

            {/* Logo & Brand */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/img/logo_icon.png"
                  alt="Fernely Dev Logo"
                  className="h-24 md:h-32 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_8px_20px_rgba(6,182,212,0.3)]"
                />
              </div>
              <div className="flex flex-col items-start leading-none gap-0.5 md:gap-1">
                <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  FERNELY<span className="text-cyan-500">DEV</span>
                </span>
                <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Creative Digital Solutions
                </span>
              </div>
            </button>

            {/* Desktop Navigation - Premium Pill Style */}
            <div className="hidden md:flex items-center">
              {/* Navigation Pills Container */}
              <div className={`flex items-center gap-1 px-2 py-2 rounded-full ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100/80 border border-gray-200/50'} backdrop-blur-xl`}>
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${activeSection === item
                      ? (isDarkMode
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25')
                      : (isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white')
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Theme Toggle - Premium Style */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`ml-4 relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group overflow-hidden ${isDarkMode
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'}`}
                aria-label="Toggle Theme"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`transition-transform duration-500 ${isDarkMode ? 'rotate-0' : 'rotate-180'}`}>
                  {isDarkMode ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-white" />}
                </div>
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDarkMode
                  ? 'bg-indigo-600 text-white'
                  : 'bg-amber-400 text-white'}`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Hamburger Menu */}
              <button
                className={`p-2.5 rounded-xl transition-all duration-300 ${isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Premium Slide Down */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`${isDarkMode ? 'bg-black/95 backdrop-blur-3xl border-t border-white/10' : 'bg-white/95 backdrop-blur-3xl border-t border-gray-200'} shadow-[0_20px_50px_rgba(0,0,0,0.3)]`}>
            <div className="px-4 py-8 space-y-3">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-6 py-4 rounded-2xl capitalize font-bold text-lg transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} ${activeSection === item
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-xl scale-[1.02]'
                    : (isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100')
                    }`}
                  style={{
                    transitionDelay: `${index * 60}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-500 ${activeSection === item ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Container with Scroll Pinning Space */}
      <div className="relative h-[250vh]">
        {/* Sticky Wrapper - Pins the content while scrolling through the 250vh space */}
        <section
          id="home"
          className={`sticky top-0 h-screen flex items-center overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        >
          {/* Animation as Full Background / Right Side Focus */}
          <div className="absolute inset-0 w-full h-full flex justify-end">
            <div className="w-full lg:w-3/4 h-full relative">
              <SplitHeroAnimation totalFrames={171} scrollHeight={window.innerHeight * 1.5} startFrame={21} />
              {/* Left-side mask for text readability */}
              <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode
                ? 'from-black via-black/40 to-transparent'
                : 'from-white via-white/40 to-transparent'}`}
              />
              {/* Bottom mask to blend with the next section and remove the "line" */}
              <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode
                ? 'from-black via-black/80 to-transparent'
                : 'from-white via-white/80 to-transparent'}`}
                style={{ height: '30%', top: 'auto', bottom: 0 }}
              />
            </div>
          </div>

          {/* Content - Left Aligned */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
            <div className="max-w-2xl text-left">

              <div className="animate-fade-in">
                <span className={`inline-block px-4 py-2 mb-6 text-xs font-bold tracking-wider rounded-full border uppercase ${isDarkMode
                  ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'
                  : 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20'}`}>
                  ✨ Frontend Architect
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-up leading-tight">
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hi, I'm </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Fernely</span>
              </h1>

              <p className={`text-lg sm:text-xl md:text-2xl mb-8 animate-slide-up opacity-0 stagger-2 max-w-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Crafting premium digital experiences through
                <span className={`font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}> modern web technologies</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up opacity-0 stagger-3">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                >
                  Explore Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-4 font-bold rounded-xl border-2 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${isDarkMode
                    ? 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40'
                    : 'bg-gray-900/5 text-gray-900 border-gray-900/20 hover:bg-gray-900/10 hover:border-gray-900/40'}`}
                >
                  Let's Talk
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in opacity-0 stagger-4 max-w-md">
                <div>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3+</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Years</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10+</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Projects</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>100%</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Happy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-10">
            <button
              onClick={() => scrollToSection('about')}
              className={`${isDarkMode ? 'text-white/60 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}
              aria-label="Scroll to about section"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section id="about" className={`relative z-10 py-20 md:py-28 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal
              delay={0.2}
              rootMargin="0px 0px -50px 0px"
              className="transform transition-all duration-700 hover:scale-[1.02]"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
                <img
                  src={getImageUrl("/img/profile.jpg")}
                  alt="Fernely Developer"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} rootMargin="0px 0px -100px 0px">
              <TextGenerateEffectDemo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`relative z-10 py-20 md:py-28 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills & Tools</h2>
              <div className="section-divider" />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Technologies and tools I use to bring ideas to life
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <ScrollReveal
                key={skill.name}
                delay={0.1 + index * 0.08}
                rootMargin="0px 0px -50px 0px"
                className="group"
              >
                <div className="glass-premium glass-premium-hover p-6 rounded-2xl shadow-sm border border-white/5">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-xl bg-white/5 backdrop-blur-md shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <skill.icon size={32} className={skill.color} />
                    </div>
                    <span className={`text-sm md:text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`relative z-10 py-20 md:py-28 ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
              <div className="section-divider" />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                A selection of my recent work including the premium
                <span className="text-cyan-400 font-semibold"> FlujoEclesial Studio</span>
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                delay={0.1 + index * 0.1}
                rootMargin="0px 0px -50px 0px"
              >
                <div className="glass-premium glass-premium-hover h-full flex flex-col rounded-2xl overflow-hidden group">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Tags overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] font-bold bg-black/50 backdrop-blur-md rounded-md text-cyan-400 border border-cyan-400/20 uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-6 line-clamp-3`}>
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <div key={tag} className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        EXPLORE <span className="text-lg">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`relative z-10 py-20 md:py-28 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Let's Work Together</h2>
              <div className="section-divider" />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Have a project in mind? I'd love to hear about it.
                Send me a message and let's create something amazing.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col items-center space-y-8">
            <ScrollReveal delay={0.2} rootMargin="0px 0px -50px 0px" className="w-full max-w-md">
              <div className="glass-premium p-8 rounded-3xl hover:shadow-cyan-500/10 transition-all duration-300 border border-white/5">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
                    <Mail size={32} className="text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Me</h3>
                  <a
                    href="mailto:fernelydev@gmail.com"
                    className="text-lg md:text-xl font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 break-all"
                  >
                    fernelydev@gmail.com
                  </a>
                  <p className="mt-4 text-gray-500 text-sm">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} rootMargin="0px 0px -50px 0px">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Ferny121991"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={22} />
                </a>
                <a
                  href="/resume.html"
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300"
                  aria-label="View Resume"
                >
                  <FileJson size={22} />
                </a>
                <a
                  href="mailto:fernelydev@gmail.com"
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300"
                  aria-label="Send Email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} rootMargin="0px 0px -50px 0px">
              <a
                href="https://precios.fernelydev.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-full overflow-hidden shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-primary-600 to-purple-600 bg-[length:200%_100%] animate-gradient" />
                <div className="relative flex flex-col items-center">
                  <span className="text-lg">✨ View My Prices</span>
                  <span className="text-xs opacity-80">Check out my affordable packages</span>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
