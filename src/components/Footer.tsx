import React from 'react';
import { Github, Mail, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
    isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { name: 'GitHub', icon: Github, href: 'https://github.com/Ferny121991' },
        { name: 'Email', icon: Mail, href: 'mailto:fernelydev@gmail.com' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className={`relative z-10 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10' : 'bg-gradient-to-br from-cyan-100/30 via-transparent to-purple-100/30'}`} />

            <div className="relative max-w-6xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    {/* Brand Section */}
                    <div className="text-center md:text-left flex flex-col items-center md:items-start group">
                        <div className="flex items-center gap-4">
                            <img
                                src="/img/logo_icon.png"
                                alt="Fernely Dev"
                                className="h-24 w-auto brightness-110 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="flex flex-col items-start leading-none">
                                <span className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    FERNELY<span className="text-cyan-500">DEV</span>
                                </span>
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Creative Digital Solutions
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="text-center">
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
                        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-right">
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect</h4>
                        <div className="flex justify-center md:justify-end gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                            <a
                                href="https://precios.fernelydev.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
                                aria-label="View Prices"
                            >
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
                        © {currentYear} Fernely Dev. Made with
                        <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
                        using React
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
