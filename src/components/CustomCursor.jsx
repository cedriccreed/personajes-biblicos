import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Crear trail de partículas
    const createTrail = () => {
      for (let i = 0; i < 8; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          width: ${8 - i}px;
          height: ${8 - i}px;
          background: rgba(217, 119, 6, ${0.8 - i * 0.1});
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
        `;
        document.body.appendChild(trail);
        trailRefs.current.push(trail);
      }
    };

    // Movimiento del cursor con física avanzada
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Cursor principal con anticipación
      gsap.to(cursor, {
        x: x - 10,
        y: y - 10,
        duration: 0.1,
        ease: "power2.out"
      });

      // Follower con retraso elástico
      gsap.to(follower, {
        x: x - 20,
        y: y - 20,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)"
      });

      // Trail con retrasos escalonados
      trailRefs.current.forEach((trail, index) => {
        gsap.to(trail, {
          x: x - (4 - index * 0.5),
          y: y - (4 - index * 0.5),
          duration: 0.1 + index * 0.05,
          ease: "power2.out"
        });
      });
    };

    // Efectos en hover
    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, .cursor-hover')) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: 'rgba(217, 119, 6, 0.8)',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        
        gsap.to(follower, {
          scale: 2,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a, .cursor-hover')) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          scale: 1,
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Inicializar
    createTrail();
    
    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Ocultar cursor por defecto
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.style.cursor = 'auto';
      
      // Limpiar trail
      trailRefs.current.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
    };
  }, []);

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-[10000] mix-blend-mode-difference"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
        }}
      />
      
      {/* Follower */}
      <div
        ref={followerRef}
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9999] border-2"
        style={{
          borderColor: 'rgba(217, 119, 6, 0.5)',
          opacity: 0.5
        }}
      />
    </>
  );
}

export default CustomCursor;
