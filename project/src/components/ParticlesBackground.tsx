import React, { useEffect } from "react";

const ParticlesBackground: React.FC = () => {
  useEffect(() => {
    // Creamos un canvas para las partículas manualmente
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Configuración
    const particleCount = 100;
    const particles: Particle[] = [];
    let animationFrameId: number;
    
    // Configurar el canvas
    const setupCanvas = () => {
      const heroSection = document.getElementById("home");
      if (!heroSection || !ctx) return;
      
      // Añadir el canvas a la sección hero
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "1";
      canvas.style.pointerEvents = "none";
      
      // Ajustar el tamaño del canvas al tamaño de la sección
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
      
      // Insertar el canvas al inicio de la sección hero
      heroSection.insertBefore(canvas, heroSection.firstChild);
      
      // Inicializar partículas
      initParticles();
      
      // Comenzar la animación
      animate();
    };
    
    // Tipo para las partículas
    type Particle = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    };
    
    // Inicializar partículas
    const initParticles = () => {
      const colors = ["#60A5FA", "#3B82F6", "#2563EB", "#93C5FD"];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    // Dibujar partículas y conectarlas
    const drawParticles = () => {
      if (!ctx) return;
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar cada partícula
      particles.forEach((particle, i) => {
        // Dibujar la partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Conectar partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${1 - distance / 150})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
    };
    
    // Actualizar posiciones de partículas
    const updateParticles = () => {
      particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
    };
    
    // Bucle de animación
    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Manejar resize
    const handleResize = () => {
      const heroSection = document.getElementById("home");
      if (!heroSection || !ctx) return;
      
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    };
    
    // Agregar listener para el resize
    window.addEventListener("resize", handleResize);
    
    // Iniciar el setup
    setupCanvas();
    
    // Limpiar
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.remove();
    };
  }, []);
  
  return null; // No renderizamos nada, creamos el canvas manualmente
};

export default ParticlesBackground;
