import React, { useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Sparkles, Star, X } from 'lucide-react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ProductShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondPrizeModalOpen, setIsSecondPrizeModalOpen] = useState(false);

  return (
    <section id="prizes" className="py-32 bg-brand-surface relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-20 left-20 w-96 h-96 bg-brand-celeste/30 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-acid/20 rounded-full blur-[120px]"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">
            QUÉ <span className="text-brand-celeste">GANÁS</span>
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
             En el primer sorteo de la temporada, regalamos un <span className="text-brand-celeste font-bold">PARLANTE BLUETOOTH PREMIUM</span> y <span className="text-brand-acid font-bold">2 FUNDAS PERSONALIZADAS</span> con nuestra tecnología de impresión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* 1st Place Prize */}
          <TiltCard className="group perspective-1000">
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2rem] border border-brand-celeste/30 p-1 shadow-[0_0_50px_rgba(56,182,255,0.15)] group-hover:shadow-[0_0_80px_rgba(56,182,255,0.3)] transition-shadow duration-500">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-celeste text-white px-8 py-2 rounded-full font-black uppercase tracking-widest shadow-lg z-20 border-4 border-black flex items-center gap-2">
                  <Crown size={20} fill="currentColor" /> 1er PUESTO
               </div>
               
               <div className="bg-black/50 rounded-[1.8rem] p-8 h-full flex flex-col items-center text-center backdrop-blur-sm overflow-hidden relative">
                  {/* Visual Representation */}
                  <div className="flex justify-center mb-8 relative z-10 mt-6">
                      <div 
                        className="w-44 h-44 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[2rem] border border-brand-celeste/50 shadow-[0_0_40px_rgba(56,182,255,0.3)] relative overflow-visible flex items-center justify-center backdrop-blur-md cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setIsModalOpen(true)}
                      >
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-celeste/10 to-transparent rounded-[2rem]"></div>
                         <img src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/fotoparlantepremio.png" className="w-52 h-52 object-contain relative z-10 -mt-4" />
                      </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">PARLANTE BLUETOOTH</h3>
                  <div className="text-5xl font-black text-brand-celeste mb-4 uppercase">PREMIUM</div>
                  <p className="text-gray-400 text-sm font-mono mb-6 max-w-xs">
                    El primer ganador se lleva un parlante Bluetooth profesional con todas las conexiones y luces LED para disfrutar del verano al máximo.
                  </p>
                  
                  <ul className="text-left space-y-2 text-sm text-gray-300 mb-8">
                     <li className="flex items-center gap-2"><Sparkles size={14} className="text-brand-celeste"/> Luces LED RGB</li>
                     <li className="flex items-center gap-2"><Sparkles size={14} className="text-brand-celeste"/> Radio FM integrada</li>
                     <li className="flex items-center gap-2"><Sparkles size={14} className="text-brand-celeste"/> Entradas USB y micro SD</li>
                     <li className="flex items-center gap-2"><Sparkles size={14} className="text-brand-celeste"/> AUX 3.5mm y MIC</li>
                     <li className="flex items-center gap-2"><Sparkles size={14} className="text-brand-celeste"/> Bluetooth 5.0</li>
                  </ul>
               </div>
            </div>
          </TiltCard>

          {/* 2nd Place Prize */}
          <TiltCard className="group perspective-1000">
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2rem] border border-white/10 p-1 shadow-2xl group-hover:border-brand-acid/50 transition-colors duration-500 h-full">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-acid text-black px-8 py-2 rounded-full font-black uppercase tracking-widest shadow-lg z-20 border-4 border-black flex items-center gap-2">
                  <Trophy size={20} /> 2do PUESTO
               </div>
               
               <div className="bg-black/50 rounded-[1.8rem] p-8 h-full flex flex-col items-center text-center backdrop-blur-sm overflow-hidden relative">
                  {/* Visual Representation */}
                  <div className="flex justify-center mb-8 relative z-10 mt-6">
                      <div 
                        className="w-32 h-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[2rem] border border-brand-acid/50 shadow-[0_0_40px_rgba(255,255,0,0.3)] relative overflow-visible flex items-center justify-center backdrop-blur-md cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setIsSecondPrizeModalOpen(true)}
                      >
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-acid/10 to-transparent rounded-[2rem]"></div>
                         <img src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/fundaspersonalizadas.png" className="w-40 h-40 object-contain relative z-10 -mt-4" />
                      </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">COMBO DUO</h3>
                  <div className="text-5xl font-black text-brand-acid mb-4 uppercase">2 FUNDAS</div>
                  <p className="text-gray-400 text-sm font-mono mb-6 max-w-xs">
                    El segundo ganador se lleva dos fundas personalizadas premium para compartir o combinar. Vos ponés las fotos o diseños, nosotros la magia.
                  </p>
                   <ul className="text-left space-y-2 text-sm text-gray-300 mb-8">
                     <li className="flex items-center gap-2"><Star size={14} className="text-brand-acid"/> Personalización Total</li>
                     <li className="flex items-center gap-2"><Star size={14} className="text-brand-acid"/> Todos los modelos de Celu</li>
                     <li className="flex items-center gap-2"><Star size={14} className="text-brand-acid"/> Impresión UV Duradera</li>
                     <li className="flex items-center gap-2"><Star size={14} className="text-brand-acid"/> Calidad World Case</li>
                  </ul>
               </div>
            </div>
          </TiltCard>

        </div>

        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs font-mono text-gray-400 uppercase">
                    Temporada Verano 2026 en Atlántida
                </p>
            </div>
        </div>

      </div>

      {/* Modal for first prize enlarged image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
              >
                <X size={32} />
              </button>
              <img 
                src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/fotoparlantepremio.png" 
                className="w-full h-full object-contain"
                alt="Parlante Bluetooth Premium"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for second prize enlarged image */}
      <AnimatePresence>
        {isSecondPrizeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsSecondPrizeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSecondPrizeModalOpen(false)}
                className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
              >
                <X size={32} />
              </button>
              <img 
                src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/fundas_premium.webp" 
                className="w-full h-full object-contain"
                alt="Fundas Personalizadas Premium"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductShowcase;