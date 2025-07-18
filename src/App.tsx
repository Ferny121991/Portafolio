import React, { useState, useEffect } from 'react';
import { getImageUrl } from './utils/imageUtils';
import { Github, Mail, Menu, X, Code2, FileJson, Image, Atom, Palette, Brain } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollReveal from './components/ScrollReveal';
import TextGenerateEffectDemo from './components/text-generate-effect-demo';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  useEffect(() => {
    const handleScroll = () => {
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
    { name: 'HTML', icon: Code2, color: 'text-orange-500' },
    { name: 'JavaScript', icon: FileJson, color: 'text-yellow-500' },
    { name: 'CSS', icon: Palette, color: 'text-blue-600' },
    { name: 'React', icon: Atom, color: 'text-blue-400' },
    { name: 'Logo Creation', icon: Image, color: 'text-purple-500' },
    { name: 'Prompt Engineer / AI Creator', icon: Brain, color: 'text-green-500' },
    { name: 'Git', icon: Github, color: 'text-gray-700' },
  ];

  const projects = [
    {
      title: 'Visual CSS Grid Editor Pro',
      description: 'A powerful visual editor for creating CSS Grid layouts with ease using HTML, CSS, and JavaScript',
      image: '/img/visual-grid.png',
      link: 'https://gridedit.netlify.app/',
    },
    {
      title: 'Shopping List',
      description: 'An application that helps you track your shopping expenses and create your shopping list using HTML, CSS, and JavaScript',
      image: '/img/shopping.png',
      link: 'https://nota-compra.netlify.app/',
    },
    {
      title: 'Personal Financial Control',
      description: 'A dynamic tool for managing personal finances, tracking expenses, and budgeting using HTML, CSS, and JavaScript',
      image: '/img/financial.png',
      link: 'https://analis-gastos.netlify.app/',
    },
    {
      title: 'Jardinería Green Gardens',
      description: 'A modern website for a gardening business, showcasing services and portfolio with a clean, nature-inspired design',
      image: '/img/garden.png',
      link: 'https://greengardensjn.netlify.app/',
    },
    {
      title: 'Blog de Café',
      description: 'A coffee blog featuring articles, brewing guides, and coffee shop reviews with a warm, inviting design',
      image: '/img/cafe.png',
      link: 'https://blogcafefer.netlify.app/',
    },
    {
      title: 'Spa & Masajes Ferny',
      description: 'A relaxing spa website offering massage services, treatments, and online booking functionality',
      image: '/img/spa.png',
      link: 'https://spaferny.netlify.app/',
    },
    {
      title: 'Iglesia de Oasis',
      description: 'A spiritual community website featuring sermons, events, and resources for the congregation',
      image: '/img/iglesia.png',
      link: 'https://iglesiadeoasis.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              fernely.dev
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`${
                    activeSection === item
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  } capitalize transition-colors duration-300`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16"
      >
        {/* Fondo de partículas (ocupa toda la sección) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50">
          <ParticlesBackground />
        </div>
        
        {/* Contenido (por encima de las partículas) */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
            Fernely Dev
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up">
            Web Developer & UI/UX Enthusiast
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 animate-bounce"
          >
            Let's Connect
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal 
            delay={0.1} 
            rootMargin="0px 0px -100px 0px"
          >
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollReveal 
              delay={0.3} 
              rootMargin="0px 0px -50px 0px"
              className="transform transition-all duration-700 hover:rotate-2 hover:scale-105 hover:shadow-xl -mt-4 -mb-2"
            >
              <img
                src={getImageUrl("/img/profile.jpg")}
                alt="Fernely Developer"
                className="rounded-lg shadow-lg w-full h-auto object-cover max-w-[90%] mx-auto"
                style={{ maxHeight: '500px' }}
              />
            </ScrollReveal>
            
            <ScrollReveal 
              delay={0.5} 
              rootMargin="0px 0px -100px 0px"
            >
              <TextGenerateEffectDemo />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          </ScrollReveal>
          <div className="grid grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <ScrollReveal 
                key={skill.name}
                delay={0.2 + index * 0.1} 
                rootMargin="0px 0px -50px 0px"
                className="flex flex-col items-center group"
              >
                <div className={`p-8 rounded-lg bg-white shadow-lg mb-4 group-hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-300 ${
                  skill.name === 'CSS' ? 'relative overflow-hidden' : ''
                }`}>
                  <skill.icon 
                    size={48} 
                    className={`${skill.color} transform group-hover:scale-110 transition-transform duration-300 ${
                      skill.name === 'CSS' ? 'relative z-10' : ''
                    }`}
                  />
                  {skill.name === 'CSS' && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600 opacity-10"></div>
                  )}
                </div>
                <span className="text-lg font-medium text-gray-700">{skill.name}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                delay={0.2 + index * 0.15}
                rootMargin="0px 0px -50px 0px"
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-float"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-md"
                  >
                    Visit Project
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal delay={0.1} rootMargin="0px 0px -100px 0px">
            <h2 className="text-3xl font-bold text-center mb-6">Let's Connect</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Feel free to reach out to me for any questions or opportunities. I'll get back to you as soon as possible.
            </p>
          </ScrollReveal>
          
          <div className="flex flex-col items-center space-y-12">
            <ScrollReveal delay={0.3} rootMargin="0px 0px -50px 0px" className="w-full max-w-md">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Email Me</h3>
                  <a 
                    href="mailto:fernelydev@gmail.com" 
                    className="text-xl md:text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 break-all"
                  >
                    fernelydev@gmail.com
                  </a>
                  <p className="mt-4 text-gray-500">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="w-full max-w-md">
              <ScrollReveal 
                delay={0.5} 
                rootMargin="0px 0px -50px 0px" 
                className="flex flex-col items-center space-y-6"
              >
                <div className="flex space-x-6">
                  <a href="https://github.com/Ferny121991" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                    <Github size={24} />
                  </a>
                  <a href="/resume.html" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                    <FileJson size={24} />
                  </a>
                  <a href="mailto:fernelydev@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                    <Mail size={24} />
                  </a>
                </div>
                <a 
                  href="https://precios.fernelydev.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none text-center w-full max-w-xs"
                >
                  <span className="text-xl">✨ View My Pricess</span>
                  <div className="text-sm opacity-80 mt-1">Check out my affordable packages</div>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;