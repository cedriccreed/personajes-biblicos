import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const biblicalCharacters = [
  {
    id: 1,
    name: "David",
    title: "El Rey Guerrero",
    description: "De pastor a rey, el hombre conforme al corazón de Dios que venció al gigante Goliat.",
    verse: "1 Samuel 17:45",
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 197, 253, 0.2) 50%, rgba(219, 234, 254, 0.1) 100%)" // Azul real
  },
  {
    id: 2,
    name: "Moisés",
    title: "El Libertador",
    description: "Líder que guió al pueblo de Israel fuera de Egipto y recibió los Diez Mandamientos.",
    verse: "Éxodo 14:21",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, rgba(233, 213, 255, 0.1) 100%)" // Púrpura divino
  },
  {
    id: 3,
    name: "Ester",
    title: "La Reina Valiente",
    description: "Reina que arriesgó su vida para salvar a su pueblo del exterminio.",
    verse: "Ester 4:14",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(251, 207, 232, 0.2) 50%, rgba(253, 242, 248, 0.1) 100%)" // Rosa real
  },
  {
    id: 4,
    name: "Daniel",
    title: "El Profeta Fiel",
    description: "Profeta que mantuvo su fe incluso en el foso de los leones.",
    verse: "Daniel 6:22",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.2) 50%, rgba(254, 243, 199, 0.1) 100%)" // Dorado sabiduría
  },
  {
    id: 5,
    name: "Rut",
    title: "La Leal",
    description: "Mujer extranjera que mostró lealtad inquebrantable a su suegra y a Dios.",
    verse: "Rut 1:16",
    gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(134, 239, 172, 0.2) 50%, rgba(220, 252, 231, 0.1) 100%)" // Verde esperanza
  },
  {
    id: 6,
    name: "Josué",
    title: "El Conquistador",
    description: "Sucesor de Moisés que conquistó la Tierra Prometida.",
    verse: "Josué 1:9",
    gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(252, 165, 165, 0.2) 50%, rgba(254, 226, 226, 0.1) 100%)" // Rojo guerrero
  },
  {
    id: 7,
    name: "Abraham",
    title: "El Padre de la Fe",
    description: "Patriarca que obedeció a Dios y se convirtió en padre de muchas naciones.",
    verse: "Génesis 12:1",
    gradient: "linear-gradient(135deg, rgba(120, 113, 108, 0.3) 0%, rgba(168, 162, 158, 0.2) 50%, rgba(231, 229, 228, 0.1) 100%)" // Gris patriarca
  },
  {
    id: 8,
    name: "María",
    title: "La Madre Bendita",
    description: "Madre de Jesús, ejemplo de fe y obediencia a la voluntad de Dios.",
    verse: "Lucas 1:38",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(165, 180, 252, 0.2) 50%, rgba(224, 231, 255, 0.1) 100%)" // Azul celestial
  },
  {
    id: 9,
    name: "Pedro",
    title: "La Roca",
    description: "Apóstol impetuoso que se convirtió en líder de la iglesia primitiva.",
    verse: "Mateo 16:18",
    gradient: "linear-gradient(135deg, rgba(107, 114, 128, 0.3) 0%, rgba(156, 163, 175, 0.2) 50%, rgba(229, 231, 235, 0.1) 100%)" // Gris roca
  },
  {
    id: 10,
    name: "Pablo",
    title: "El Apóstol de los Gentiles",
    description: "De perseguidor a predicador, llevó el evangelio por todo el mundo conocido.",
    verse: "Hechos 9:15",
    gradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(251, 146, 60, 0.2) 50%, rgba(254, 215, 170, 0.1) 100%)" // Naranja misión
  },
  {
    id: 11,
    name: "Noé",
    title: "El Obediente",
    description: "Construyó el arca por obediencia a Dios y salvó a la humanidad del diluvio.",
    verse: "Génesis 6:19",
    gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(103, 232, 249, 0.2) 50%, rgba(207, 250, 254, 0.1) 100%)" // Cian agua
  },
  {
    id: 12,
    name: "Salomón",
    title: "El Rey Sabio",
    description: "Rey conocido por su sabiduría y por construir el primer templo de Jerusalén.",
    verse: "1 Reyes 3:12",
    gradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, rgba(237, 233, 254, 0.1) 100%)" // Violeta sabiduría
  }
];

function CharacterCard({ character, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Configurar estado inicial con nueva animación
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 80,
      rotationX: 45,
      scale: 0.8
    });

    // Crear observer para animación al entrar en vista
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.08,
      rotationY: 8,
      rotationX: -5,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl p-6 cursor-pointer relative overflow-hidden group backdrop-blur-sm"
      style={{
        background: character.gradient,
        border: '2px solid rgba(107, 114, 128, 0.4)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        transition: 'all 0.4s ease'
      }}
    >
      {/* Efecto de brillo mejorado */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 shine-effect"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
          transform: 'translateX(-100%)'
        }}
      ></div>

      {/* Efecto de glow plomo */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          boxShadow: '0 0 30px rgba(107, 114, 128, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      ></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300" style={{ color: 'rgb(17, 24, 39)' }}>
          {character.name}
        </h3>
        <p className="text-sm font-semibold mb-3 uppercase tracking-wide transition-colors duration-300" style={{ color: 'rgb(55, 65, 81)' }}>
          {character.title}
        </p>
        <p className="mb-4 leading-relaxed transition-colors duration-300" style={{ color: 'rgb(75, 85, 99)' }}>
          {character.description}
        </p>
        <div
          className="text-xs p-3 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: 'rgb(17, 24, 39)',
            border: '1px solid rgba(107, 114, 128, 0.3)'
          }}
        >
          <span className="font-bold">Versículo:</span> {character.verse}
        </div>
      </div>
    </div>
  );
}

function CharactersSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesContainerRef = useRef(null);
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    // Configurar estado inicial
    gsap.set([lineRef.current, taglineRef.current, titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30
    });

    // SISTEMA DE PARTÍCULAS SUTILES QUE ABARCAN TODA LA PÁGINA
    const createSubtleParticles = () => {
      const particles = [];

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'characters-particle';

        // Colores que se ven bien en fondo dorado
        const colors = [
          `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.4})`, // Blanco más visible
          `rgba(107, 114, 128, ${Math.random() * 0.6 + 0.3})`, // Plomo
          `rgba(75, 85, 99, ${Math.random() * 0.5 + 0.4})`,    // Gris oscuro
          `rgba(55, 65, 81, ${Math.random() * 0.4 + 0.3})`     // Gris muy oscuro
        ];

        particle.style.cssText = `
          position: fixed;
          width: ${Math.random() * 5 + 3}px;
          height: ${Math.random() * 5 + 3}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(particle);
        particles.push(particle);

        // Posición inicial que abarca TODA la ventana
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        gsap.set(particle, {
          x: startX,
          y: startY,
          scale: Math.random() * 0.5 + 0.5
        });

        // Animación de flotación que cubre toda la pantalla
        gsap.to(particle, {
          y: "-=120",
          x: `+=${Math.random() * 300 - 150}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 25 + 15,
          repeat: -1,
          ease: "none",
          modifiers: {
            y: gsap.utils.unitize(gsap.utils.wrap(-50, window.innerHeight + 50)),
            x: gsap.utils.unitize(gsap.utils.wrap(-50, window.innerWidth + 50))
          }
        });

        // Efecto de respiración sutil
        gsap.to(particle, {
          scale: Math.random() * 0.8 + 0.4,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 4 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
      return particles;
    };

    // ELEMENTOS FLOTANTES QUE ABARCAN TODA LA PÁGINA
    const createDiscreteElements = () => {
      // Partículas doradas que se ven en toda la pantalla
      for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'characters-golden-particle';
        element.style.cssText = `
          position: fixed;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(217, 119, 6, ${Math.random() * 0.6 + 0.4});
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          box-shadow: 0 0 8px rgba(217, 119, 6, 0.6);
        `;

        document.body.appendChild(element);

        // Posición inicial que cubre toda la ventana
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        gsap.set(element, {
          x: startX,
          y: startY,
          scale: Math.random() * 0.5 + 0.5
        });

        // Movimiento que abarca toda la pantalla
        gsap.to(element, {
          y: "-=180",
          x: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 35 + 25,
          repeat: -1,
          ease: "none",
          modifiers: {
            y: gsap.utils.unitize(gsap.utils.wrap(-50, window.innerHeight + 50)),
            x: gsap.utils.unitize(gsap.utils.wrap(-50, window.innerWidth + 50))
          }
        });

        // Pulsación visible
        gsap.to(element, {
          scale: Math.random() * 0.5 + 0.8,
          opacity: Math.random() * 0.4 + 0.3,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    };

    // Crear observer para animación del título
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Crear partículas sutiles que abarcan toda la página
          console.log('🎨 Creando partículas de la sección de personajes...');
          createSubtleParticles();
          createDiscreteElements();

          const tl = gsap.timeline();

          tl.to(lineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          })
          .to(taglineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.3")
          .to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.3")
          .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.4");

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Limpiar partículas de la sección de personajes
      const particles = document.querySelectorAll('.characters-particle');
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });

      // Limpiar partículas doradas
      const goldenParticles = document.querySelectorAll('.characters-golden-particle');
      goldenParticles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="personajes"
      className="w-full py-16 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg,
            rgb(196, 164, 132) 0%,
            rgb(255, 255, 255) 50%,
            rgb(107, 114, 128) 100%
          )
        `
      }}
    >
      {/* Contenedor de partículas bíblicas */}
      <div ref={particlesContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-1"></div>

      {/* Contenedor de elementos flotantes temáticos */}
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden pointer-events-none z-2"></div>

      {/* Efectos de luz sutiles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-radial from-yellow-300/5 to-transparent rounded-full animate-pulse" style={{ animationDuration: '15s', animationDelay: '3s' }}></div>
      </div>
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-12">
          <div ref={lineRef} className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: 'rgb(120, 53, 15)' }}></div>
          <p ref={taglineRef} className="text-sm tracking-widest uppercase font-semibold mb-4" style={{ color: 'rgb(120, 53, 15)' }}>
            Conoce a los Héroes
          </p>
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: 'rgb(55, 65, 81)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            PERSONAJES <span style={{ color: 'rgb(120, 53, 15)' }}>LEGENDARIOS</span>
          </h2>
          <p ref={subtitleRef} className="text-xl max-w-4xl mx-auto" style={{
            color: 'rgb(75, 85, 99)',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
          }}>
            Cada uno con una historia única de fe, valor y propósito divino que trasciende el tiempo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8">
          {biblicalCharacters.map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CharactersSection;
