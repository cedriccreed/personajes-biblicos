import { useCallback, useRef } from 'react';

// Sistema de sonidos avanzado para interacciones
export const useSoundEffects = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Inicializar Web Audio API
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.1; // Volumen bajo
    }
  }, []);

  // Generar tonos sintéticos
  const playTone = useCallback((frequency, duration = 0.1, type = 'sine') => {
    initAudio();
    
    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();
    
    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    // Envelope ADSR
    const now = audioContextRef.current.currentTime;
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
    envelope.gain.exponentialRampToValueAtTime(0.1, now + 0.05); // Decay
    envelope.gain.exponentialRampToValueAtTime(0.01, now + duration); // Release
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  }, [initAudio]);

  // Efectos de sonido específicos
  const sounds = {
    hover: () => playTone(800, 0.1, 'sine'),
    click: () => playTone(1200, 0.15, 'square'),
    success: () => {
      playTone(523.25, 0.1); // C5
      setTimeout(() => playTone(659.25, 0.1), 100); // E5
      setTimeout(() => playTone(783.99, 0.2), 200); // G5
    },
    scroll: () => playTone(440, 0.05, 'triangle'),
    cardFlip: () => {
      playTone(330, 0.1, 'sawtooth');
      setTimeout(() => playTone(440, 0.1, 'sawtooth'), 50);
    },
    navigation: () => {
      playTone(880, 0.08, 'sine');
      setTimeout(() => playTone(1108, 0.08, 'sine'), 80);
    }
  };

  return sounds;
};

// Hook para efectos de vibración
export const useHapticFeedback = () => {
  const vibrate = useCallback((pattern = [100]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const haptics = {
    light: () => vibrate([50]),
    medium: () => vibrate([100]),
    heavy: () => vibrate([200]),
    success: () => vibrate([100, 50, 100]),
    error: () => vibrate([300, 100, 300])
  };

  return haptics;
};

// Sistema de partículas para clicks
export const useParticleEffects = () => {
  const createClickParticles = useCallback((x, y) => {
    const colors = ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d'];
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
      `;
      
      document.body.appendChild(particle);
      
      // Animación de explosión
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let posX = x;
      let posY = y;
      let opacity = 1;
      let scale = 1;
      
      const animate = () => {
        posX += vx * 0.02;
        posY += vy * 0.02 + 0.5; // Gravedad
        opacity -= 0.02;
        scale -= 0.01;
        
        particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(particle);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, []);

  return { createClickParticles };
};
