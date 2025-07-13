import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// Registrar plugins avanzados
gsap.registerPlugin(ScrollToPlugin, TextPlugin);

function Hero() {
  const heroRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef(null);
  const morphTextRef = useRef(null);

  useEffect(() => {
    // Configurar estado inicial
    gsap.set([lineRef.current, taglineRef.current, titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    // SISTEMA DE PARTÍCULAS AVANZADO
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        `;
        particlesRef.current?.appendChild(particle);
        particles.push(particle);

        // Animación de partículas flotantes con física
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5
        });

        gsap.to(particle, {
          y: "-=100",
          x: `+=${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          ease: "none",
          modifiers: {
            y: gsap.utils.unitize(gsap.utils.wrap(-100, window.innerHeight + 100))
          }
        });

        // Efecto de respiración
        gsap.to(particle, {
          scale: Math.random() * 0.8 + 0.4,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
      return particles;
    };

    // TEXTO MORPHING AVANZADO
    const morphingTexts = [
      "Historias Épicas de Fe",
      "Leyendas Bíblicas",
      "Héroes Eternos",
      "Fe que Trasciende"
    ];
    let currentTextIndex = 0;

    const startTextMorphing = () => {
      const morphTimeline = gsap.timeline({ repeat: -1 });

      morphingTexts.forEach((text, index) => {
        morphTimeline.to(morphTextRef.current, {
          duration: 0.5,
          text: text,
          ease: "power2.inOut",
          delay: index === 0 ? 2 : 3
        });
      });
    };

    // Timeline principal con efectos avanzados
    const masterTl = gsap.timeline({ delay: 0.5 });

    // Crear partículas
    if (particlesRef.current) {
      createParticles();
    }

    // Animaciones de entrada con efectos 3D
    masterTl.to(lineRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.6")
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 1.5,
      ease: "power3.out",
      onComplete: startTextMorphing
    }, "-=0.4")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.5");

    // Efecto de respiración en el título
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      masterTl.kill();
      // Limpiar partículas
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  // Función para scroll suave con GSAP hacia la sección de personajes
  const handleScrollToCharacters = () => {
    const charactersSection = document.getElementById('personajes');
    if (charactersSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: charactersSection,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg,
            rgb(107, 114, 128) 0%,
            rgb(255, 255, 255) 50%,
            rgb(196, 164, 132) 100%
          )
        `
      }}
    >
      {/* Sistema de partículas avanzado */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-1"></div>

      {/* Efectos de fondo decorativos mejorados */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(217, 119, 6, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Efecto de ondas concéntricas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute w-32 h-32 border border-white/5 rounded-full animate-ping" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
      </div>

      <div className="text-center px-6 lg:px-12 w-full max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div ref={lineRef} className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: 'rgb(120, 53, 15)' }}></div>
          <p ref={morphTextRef} className="text-sm tracking-widest uppercase font-semibold" style={{ color: 'rgb(120, 53, 15)' }}>
            Historias Épicas de Fe
          </p>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{
          color: 'rgb(55, 65, 81)',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          HÉROES
          <br />
          <span style={{ color: 'rgb(120, 53, 15)' }}>DE LA FE</span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 leading-relaxed" style={{
          color: 'rgb(75, 85, 99)',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
        }}>
          Descubre las historias épicas y enseñanzas eternas de los personajes más legendarios de la Biblia
        </p>

        <button
          ref={buttonRef}
          className="font-semibold py-4 px-8 rounded-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgb(107, 114, 128) 0%, rgb(75, 85, 99) 100%)',
            color: 'white',
            border: '1px solid rgb(156, 163, 175)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '0.3px'
          }}
          onClick={handleScrollToCharacters}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgb(75, 85, 99) 0%, rgb(55, 65, 81) 100%)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgb(107, 114, 128) 0%, rgb(75, 85, 99) 100%)';
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          Explorar Personajes
        </button>
      </div>
    </section>
  );
}

export default Hero;
