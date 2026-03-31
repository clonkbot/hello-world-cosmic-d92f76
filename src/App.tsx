import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

function App() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-dvh w-full overflow-hidden relative flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#050505',
        fontFamily: "'Space Mono', monospace"
      }}
    >
      {/* Ambient gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[150px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)',
          top: '-20%',
          left: '-20%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[120px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #8B7355 0%, transparent 70%)',
          bottom: '-15%',
          right: '-15%',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#F5F0E8',
            opacity: particle.opacity,
            animation: `float ${particle.speed}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay for texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#F5F0E8 1px, transparent 1px),
            linear-gradient(90deg, #F5F0E8 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <main className="relative z-10 text-center px-6 flex-1 flex flex-col items-center justify-center">
        {/* Decorative line above */}
        <div
          className={`w-16 md:w-24 h-px mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            backgroundColor: '#D4A574',
            transitionDelay: '200ms'
          }}
        />

        {/* "Hello" - elegant serif */}
        <h1
          className={`transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F5F0E8',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            transitionDelay: '400ms',
          }}
        >
          Hello
        </h1>

        {/* "World" - technical mono */}
        <h2
          className={`mt-2 md:mt-4 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(1.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#D4A574',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            transitionDelay: '600ms',
          }}
        >
          World
        </h2>

        {/* Subtitle */}
        <p
          className={`mt-6 md:mt-10 max-w-md transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
            color: 'rgba(245, 240, 232, 0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transitionDelay: '800ms',
          }}
        >
          The beginning of every journey
        </p>

        {/* Decorative brackets */}
        <div
          className={`mt-10 md:mt-16 flex items-center gap-4 md:gap-6 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: 'rgba(212, 165, 116, 0.3)',
            }}
          >
            {'<'}
          </span>
          <div
            className="w-12 md:w-20 h-px"
            style={{ backgroundColor: 'rgba(245, 240, 232, 0.1)' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#D4A574' }}
          />
          <div
            className="w-12 md:w-20 h-px"
            style={{ backgroundColor: 'rgba(245, 240, 232, 0.1)' }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: 'rgba(212, 165, 116, 0.3)',
            }}
          >
            {'/>'}
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 pb-6 md:pb-8 transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(245, 240, 232, 0.25)',
            letterSpacing: '0.05em',
          }}
        >
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
