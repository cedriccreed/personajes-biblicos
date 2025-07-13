// Sistema de monitoreo de performance avanzado
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      memoryUsage: [],
      renderTimes: [],
      interactionLatency: [],
      scrollPerformance: []
    };
    
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastTime = performance.now();
    
    this.init();
  }

  init() {
    // Monitoreo de FPS
    this.startFPSMonitoring();
    
    // Monitoreo de memoria (si está disponible)
    if ('memory' in performance) {
      this.startMemoryMonitoring();
    }
    
    // Monitoreo de interacciones
    this.startInteractionMonitoring();
    
    // Monitoreo de scroll performance
    this.startScrollMonitoring();
    
    // Web Vitals
    this.measureWebVitals();
  }

  startFPSMonitoring() {
    const measureFPS = () => {
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= this.lastTime + 1000) {
        const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.metrics.fps.push({
          timestamp: currentTime,
          value: fps
        });
        
        // Mantener solo los últimos 60 segundos
        if (this.metrics.fps.length > 60) {
          this.metrics.fps.shift();
        }
        
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        // Alertar si FPS es muy bajo
        if (fps < 30) {
          console.warn(`⚠️ Low FPS detected: ${fps}`);
        }
      }
      
      if (this.isMonitoring) {
        requestAnimationFrame(measureFPS);
      }
    };
    
    this.isMonitoring = true;
    requestAnimationFrame(measureFPS);
  }

  startMemoryMonitoring() {
    setInterval(() => {
      const memory = performance.memory;
      this.metrics.memoryUsage.push({
        timestamp: performance.now(),
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      });
      
      // Mantener solo las últimas 100 mediciones
      if (this.metrics.memoryUsage.length > 100) {
        this.metrics.memoryUsage.shift();
      }
    }, 5000);
  }

  startInteractionMonitoring() {
    const measureInteraction = (eventType) => (e) => {
      const startTime = performance.now();
      
      // Medir tiempo hasta el próximo frame
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const latency = endTime - startTime;
        
        this.metrics.interactionLatency.push({
          timestamp: startTime,
          type: eventType,
          latency: latency,
          target: e.target.tagName
        });
        
        if (this.metrics.interactionLatency.length > 200) {
          this.metrics.interactionLatency.shift();
        }
        
        // Alertar si la latencia es alta
        if (latency > 100) {
          console.warn(`⚠️ High interaction latency: ${latency.toFixed(2)}ms for ${eventType}`);
        }
      });
    };

    document.addEventListener('click', measureInteraction('click'));
    document.addEventListener('scroll', measureInteraction('scroll'), { passive: true });
    document.addEventListener('mousemove', measureInteraction('mousemove'));
  }

  startScrollMonitoring() {
    let scrollStartTime = null;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        scrollStartTime = performance.now();
        isScrolling = true;
      }
    };

    const handleScrollEnd = () => {
      if (isScrolling) {
        const scrollDuration = performance.now() - scrollStartTime;
        this.metrics.scrollPerformance.push({
          timestamp: scrollStartTime,
          duration: scrollDuration
        });
        
        if (this.metrics.scrollPerformance.length > 100) {
          this.metrics.scrollPerformance.shift();
        }
        
        isScrolling = false;
      }
    };

    let scrollTimeout;
    document.addEventListener('scroll', () => {
      handleScrollStart();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    }, { passive: true });
  }

  measureWebVitals() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          console.log(`📊 FID: ${fid.toFixed(2)}ms`);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log(`📊 CLS: ${clsValue.toFixed(4)}`);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      summary: {
        avgFPS: this.metrics.fps.length > 0 
          ? this.metrics.fps.reduce((sum, m) => sum + m.value, 0) / this.metrics.fps.length 
          : 0,
        avgInteractionLatency: this.metrics.interactionLatency.length > 0
          ? this.metrics.interactionLatency.reduce((sum, m) => sum + m.latency, 0) / this.metrics.interactionLatency.length
          : 0,
        currentMemoryUsage: this.metrics.memoryUsage.length > 0
          ? this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
          : null
      }
    };
  }

  generateReport() {
    const metrics = this.getMetrics();
    console.group('🚀 Performance Report');
    console.log(`Average FPS: ${metrics.summary.avgFPS.toFixed(2)}`);
    console.log(`Average Interaction Latency: ${metrics.summary.avgInteractionLatency.toFixed(2)}ms`);
    if (metrics.summary.currentMemoryUsage) {
      const memMB = (metrics.summary.currentMemoryUsage.used / 1024 / 1024).toFixed(2);
      console.log(`Memory Usage: ${memMB}MB`);
    }
    console.groupEnd();
    
    return metrics;
  }

  stop() {
    this.isMonitoring = false;
  }
}

// Instancia global del monitor
export const performanceMonitor = new PerformanceMonitor();

// Función para mostrar métricas en desarrollo
if (process.env.NODE_ENV === 'development') {
  window.showPerformanceReport = () => performanceMonitor.generateReport();
  console.log('💡 Tip: Use window.showPerformanceReport() to see performance metrics');
}
