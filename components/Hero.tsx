import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, MapPin, Calendar, PartyPopper, Star, ShoppingCart } from 'lucide-react';
import { useParallax, useParallaxOffset } from '../hooks/useParallax';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: any[] = [];
    const colors = ['#38b6ff', '#ccff00', '#ffffff', '#00e5ff'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;

      constructor() {
        this.x = canvas!.width / 2;
        this.y = canvas!.height / 2 - 100;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 15;
        this.speedY = (Math.random() - 0.7) * 20;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.2; // gravity
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.005;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const init = () => {
      for (let i = 0; i < 150; i++) {
        setTimeout(() => {
          particles.push(new Particle());
        }, i * 5);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />;
};

const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-01-10T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 md:gap-4 lg:gap-8 font-mono mt-6 md:mt-8">
      {[
        { label: 'DÍAS', value: pad(timeLeft.days) },
        { label: 'HORAS', value: pad(timeLeft.hours) },
        { label: 'MINS', value: pad(timeLeft.minutes) },
        { label: 'SEGS', value: pad(timeLeft.seconds) }
      ].map((item, i) => (
        <div key={item.label} className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + (i * 0.1) }}
            className="text-xl md:text-2xl lg:text-4xl font-black text-white"
          >
            {item.value}
          </motion.span>
          <span className="text-[8px] md:text-xs text-brand-celeste font-bold tracking-widest mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const { y: parallaxY, opacity: parallaxOpacity, scale: parallaxScale, isMobile } = useParallax({ speed: 0.3 });
  const { y: videoY } = useParallaxOffset(0, 0.2);
  const { y: textY } = useParallaxOffset(100, 0.1);
  const [showConfetti, setShowConfetti] = useState(false);

  const scrollToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToShop = () => {
    window.open('https://worldcaseuy.com', '_blank');
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-brand-dark flex items-center justify-center">
      
      {/* Confetti Layer */}
      {showConfetti && <Confetti />}

      {/* Parallax Video Background - Beach/Summer Vibe */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 md:opacity-50 grayscale-0 contrast-110"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-blue-ocean-34638-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-celeste/20 to-brand-dark md:from-brand-dark/40 md:via-brand-celeste/10 md:to-brand-dark"></div>
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </motion.div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1600px] px-4 md:px-8 flex flex-col justify-between h-full pb-8 md:pb-12 pt-24 md:pt-32">
        
        {/* Top Meta Data */}
        <div className="flex justify-between items-start text-[10px] md:text-xs font-mono text-white uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 md:gap-2"><MapPin size={10} className="text-brand-celeste hidden sm:block"/> COSTA DE ORO</span>
            <span className="flex items-center gap-1 md:gap-2 text-white/60 text-[8px] md:text-xs">ATLÁNTIDA, URUGUAY</span>
          </div>
          <div className="text-right">
            <span className="flex items-center justify-end gap-1 md:gap-2 text-[8px] md:text-xs">HASTA 28 FEB <Calendar size={10} className="text-brand-celeste hidden sm:block"/></span>
            <span className="text-brand-celeste font-bold tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm">ATLANTIDA 2026</span>
          </div>
        </div>

        {/* Main Typography */}
        <div className="flex flex-col items-center justify-center text-center">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="mb-4 inline-block px-3 py-1 md:px-4 md:py-1 border border-brand-celeste rounded-full bg-brand-celeste/10 backdrop-blur-md"
           >
             <span className="text-brand-celeste font-mono text-xs md:text-sm md:text-base font-bold tracking-widest uppercase flex items-center gap-1 md:gap-2">
                <Star size={12} className="animate-spin-slow hidden sm:block"/> Gran Sorteo de Verano
             </span>
           </motion.div>
           
           <motion.h1 
             style={{ scale: parallaxScale }}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             onAnimationComplete={() => setShowConfetti(true)}
             className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter text-white select-none drop-shadow-2xl"
           >
             ATLANTIDA
             <br />
             <span className="text-transparent text-stroke-blue relative">
               TEMPORADA
               <motion.span 
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 md:-top-8 md:-right-8 text-lg sm:text-2xl md:text-5xl text-brand-celeste font-mono"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
               >
                 '26
               </motion.span>
             </span>
           </motion.h1>
           
           <div className="mt-6 flex flex-col items-center">
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="text-white/80 max-w-xs sm:max-w-md md:max-w-2xl text-base md:text-lg md:text-xl font-light px-4"
             >
               Viví el verano en la Costa de Oro con World Case UY. <br className="hidden sm:block"/> 
               <span className="text-brand-celeste font-bold uppercase tracking-widest text-sm md:text-base">Primer Sorteo: 10 de Enero</span>
               <br className="hidden sm:block"/>
               <span className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-wider mt-2 inline-block">
                Anotándote participás automáticamente de todos los sorteos de la temporada
               </span>
             </motion.p>
             
             {/* Countdown Component */}
             <CountdownTimer />
           </div>
        </div>

        {/* Bottom CTA Area */}
        <motion.div 
          style={{ opacity: parallaxOpacity }}
          className="flex flex-col items-center gap-6"
        >
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <a 
                href="#register"
                onClick={scrollToRegister}
                className="group relative px-6 py-4 md:px-10 md:py-5 bg-brand-celeste text-white font-black text-sm md:text-lg uppercase tracking-widest overflow-hidden clip-path-slant hover:bg-white hover:text-brand-celeste transition-all duration-300 active:scale-95"
              >
                 <span className="relative z-10 flex items-center gap-2 md:gap-3">
                   OBTENER TICKET <ArrowDown size={14} className="animate-bounce" />
                 </span>
                 <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
              </a>

              <button 
                onClick={goToShop}
                className="group relative px-6 py-4 md:px-10 md:py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black text-sm md:text-lg uppercase tracking-widest overflow-hidden clip-path-slant hover:bg-brand-acid hover:text-black transition-all duration-300 active:scale-95"
              >
                 <span className="relative z-10 flex items-center gap-2 md:gap-3">
                   IR A LA TIENDA <ShoppingCart size={14} />
                 </span>
                 <div className="absolute inset-0 bg-brand-acid transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
              </button>
            </div>
            
            <p className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-widest px-4 text-center">
              Deslizá para ver las fundas en sorteo
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;