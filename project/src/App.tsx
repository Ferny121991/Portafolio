import React, { useState, FormEvent, useEffect } from 'react';
import { Github, Mail, Menu, X, Code2, FileJson, Blocks } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

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
    { name: 'CSS', icon: Blocks, color: 'text-blue-600' },
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
      image: '/img/gardening-placeholder.jpg',
      link: 'https://greengardensjn.netlify.app/',
    },
    {
      title: 'Blog de Café',
      description: 'A coffee blog featuring articles, brewing guides, and coffee shop reviews with a warm, inviting design',
      image: '/img/coffee-placeholder.jpg',
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
      image: '/img/church-placeholder.jpg',
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
            Full Stack Developer & UI/UX Enthusiast
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
              rootMargin="0px 0px -100px 0px"
              className="transform transition-all duration-700 hover:rotate-2 hover:scale-105 hover:shadow-xl"
            >
              <img
                src="/img/profile.jpg"
                alt="Fernely Developer"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </ScrollReveal>
            
            <ScrollReveal 
              delay={0.5} 
              rootMargin="0px 0px -100px 0px"
            >
              <p className="text-gray-600 leading-relaxed">
                I'm a passionate Full Stack Developer with expertise in modern web technologies.
                With a keen eye for design and a love for clean code, I create engaging digital
                experiences that solve real-world problems. My approach combines technical
                excellence with creative problem-solving to deliver outstanding results.
              </p>
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
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.3} rootMargin="0px 0px -50px 0px">
              {formStatus.success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Success! </strong>
                  <span className="block sm:inline">Your message has been sent. I'll get back to you soon!</span>
                </div>
              ) : (
                <form 
                  className="space-y-4" 
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    setFormStatus({
                      submitting: true,
                      success: false,
                      error: false,
                      message: ''
                    });
                    
                    // In a real app, you would send the form data to your backend
                    setTimeout(() => {
                      setFormStatus({
                        submitting: false,
                        success: true,
                        error: false,
                        message: 'Message sent successfully'
                      });
                      setFormData({ name: '', email: '', message: '' });
                    }, 1500);
                  }}
                >
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-md"
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </ScrollReveal>
            <ScrollReveal 
              delay={0.5} 
              rootMargin="0px 0px -50px 0px" 
              className="flex flex-col justify-center items-center space-y-6"
            >
              <div className="flex space-x-6">
                <a href="https://github.com/Ferny121991" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                  <Github size={24} />
                </a>
          
                <a href="/resume.html" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                  <FileJson size={24} />
                </a>
                <a href="mailto:sosa121991@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300">
                  <Mail size={24} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;