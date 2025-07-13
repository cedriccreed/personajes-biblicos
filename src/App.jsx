import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CharactersSection from './components/CharactersSection'
import CustomCursor from './components/CustomCursor'
import { useSoundEffects, useHapticFeedback, useParticleEffects } from './hooks/useSoundEffects'
import { performanceMonitor } from './utils/performanceMonitor'

function App() {
  const sounds = useSoundEffects();
  const haptics = useHapticFeedback();
  const { createClickParticles } = useParticleEffects();

  useEffect(() => {
    // Inicializar monitoreo de performance
    console.log('🚀 Performance monitoring started');

    // Generar reporte cada 30 segundos en desarrollo
    let reportInterval;
    if (process.env.NODE_ENV === 'development') {
      reportInterval = setInterval(() => {
        performanceMonitor.generateReport();
      }, 30000);
    }

    // Sistema de eventos globales para efectos avanzados
    const handleGlobalClick = (e) => {
      // Efectos de partículas en cada click
      createClickParticles(e.clientX, e.clientY);

      // Sonido y vibración según el elemento
      if (e.target.matches('button')) {
        sounds.click();
        haptics.medium();
      } else if (e.target.matches('a, .nav-link')) {
        sounds.navigation();
        haptics.light();
      }
    };

    const handleGlobalHover = (e) => {
      if (e.target.matches('button, a, .cursor-hover')) {
        sounds.hover();
        haptics.light();
      }
    };

    // Smooth scroll con sonido
    const handleScroll = () => {
      if (Math.random() > 0.98) { // Sonido ocasional durante scroll
        sounds.scroll();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('mouseenter', handleGlobalHover, true);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('mouseenter', handleGlobalHover, true);
      document.removeEventListener('scroll', handleScroll);

      if (reportInterval) {
        clearInterval(reportInterval);
      }

      performanceMonitor.stop();
    };
  }, [sounds, haptics, createClickParticles]);

  return (
    <div className="font-sans bg-amber-50 text-amber-900 w-full min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <CharactersSection />
    </div>
  );
}

export default App;
