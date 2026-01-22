import React, { useState, useEffect } from 'react';
import { getImageUrl } from './utils/imageUtils';
import { Github, Mail, Menu, X, Code2, FileJson, Image, Atom, Palette, Brain, ChevronDown, Video, Camera, Share2, LayoutGrid } from 'lucide-react';
import ScrollReveal from './components/ScrollReveal';
import TextGenerateEffectDemo from './components/text-generate-effect-demo';
import Footer from './components/Footer';
import ScrollAnimatedHero from './components/ScrollAnimatedHero';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-lg shadow-lg shadow-gray-200/50'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-32 md:h-48 items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center group cursor-pointer"
            >
              <div className="relative group">
                {/* Glow effect backing */}
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                  src="/img/logo.png"
                  alt="Fernely Dev Logo"
                  className="h-32 md:h-64 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${activeSection === item
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize transition-all duration-200 ${activeSection === item
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Animated Hero Background */}
      <ScrollAnimatedHero totalFrames={192} scrollHeight={500} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-48 md:pt-72"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-white bg-white/20 rounded-full backdrop-blur-md border border-white/30">
              👋 Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up">
            <span className="text-white drop-shadow-lg">Hi, I'm </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Fernely</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 animate-slide-up opacity-0 stagger-2 max-w-2xl mx-auto drop-shadow-md">
            Web Developer & UI/UX Enthusiast creating beautiful,
            <span className="text-cyan-300 font-semibold"> functional</span> digital experiences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up opacity-0 stagger-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/50 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              Let's Connect
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label="Scroll to about section"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Me</h2>
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
      <section id="skills" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Skills & Tools</h2>
              <div className="section-divider" />
              <p className="text-gray-600 max-w-2xl mx-auto">
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
                <div className={`${skill.bg} p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <skill.icon size={32} className={skill.color} />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-gray-700">{skill.name}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
              <div className="section-divider" />
              <p className="text-gray-600 max-w-2xl mx-auto">
                A selection of my recent work and personal projects
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                delay={0.1 + index * 0.1}
                rootMargin="0px 0px -50px 0px"
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tags */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/25"
                    >
                      Visit Project →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Let's Work Together</h2>
              <div className="section-divider" />
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it.
                Send me a message and let's create something amazing.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col items-center space-y-8">
            <ScrollReveal delay={0.2} rootMargin="0px 0px -50px 0px" className="w-full max-w-md">
              <div className="glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                    <Mail size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Me</h3>
                  <a
                    href="mailto:fernelydev@gmail.com"
                    className="text-lg md:text-xl font-medium text-primary-600 hover:text-primary-700 transition-colors duration-300 break-all"
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
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={22} />
                </a>
                <a
                  href="/resume.html"
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="View Resume"
                >
                  <FileJson size={22} />
                </a>
                <a
                  href="mailto:fernelydev@gmail.com"
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-lg hover:scale-110 transition-all duration-300"
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
      <Footer />
    </div>
  );
}

export default App;
