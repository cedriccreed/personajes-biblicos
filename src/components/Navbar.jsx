import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import cruzJesus from '../assets/cruz-jesus.webp';

// Registrar el plugin
gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
  // Función para scroll suave a las secciones
  const handleSmoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: targetId === 'inicio' ? 0 : 80
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav
      className="w-full backdrop-blur-md sticky top-0 z-50 relative"
      style={{
        background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.95) 0%, rgba(75, 85, 99, 0.9) 50%, rgba(55, 65, 81, 0.95) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Efecto de brillo superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)'
        }}
      />

      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            {/* Logo de cruz de Jesús transparente con brillo en hover */}
            <div className="relative group">
              <img
                src={cruzJesus}
                alt="Cruz de Jesús"
                className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110 cursor-pointer"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.filter = 'brightness(1.5) contrast(1.3) drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(217, 119, 6, 0.5))';
                  e.target.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.filter = 'brightness(1.1) contrast(1.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Título con tipografía estilo Assassin's Creed */}
            <h1
              className="text-2xl font-bold text-white tracking-widest relative"
              style={{
                fontFamily: "'Marcellus', serif",
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                letterSpacing: '0.15em',
                fontWeight: '400'
              }}
            >
              HÉROES DE LA FE
            </h1>
          </div>

          {/* Navegación */}
          <div className="hidden md:flex gap-8">
            <NavLink onClick={() => handleSmoothScroll('inicio')} text="Inicio" />
            <NavLink onClick={() => handleSmoothScroll('personajes')} text="Personajes" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// SOLO LAS LETRAS SE ILUMINAN - SIN MARCO FEO AL HACER CLIC
function NavLink({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="py-3 px-4 font-medium tracking-wide transition-all duration-400 cursor-pointer focus:outline-none"
      style={{
        fontFamily: "'Marcellus', serif",
        letterSpacing: '0.05em',
        color: 'white',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        transition: 'all 0.4s ease-out',
        background: 'transparent',
        border: 'none',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.color = 'white';
        e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.7), 0 0 24px rgba(255, 255, 255, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.8)';
        e.target.style.filter = 'brightness(1.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = 'white';
        e.target.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
        e.target.style.filter = 'brightness(1)';
      }}
      onFocus={(e) => {
        e.target.blur(); // Quita el focus inmediatamente
      }}
    >
      {text}
    </button>
  );
}

export default Navbar;
