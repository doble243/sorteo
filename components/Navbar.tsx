import React, { useState, useEffect } from 'react';
import { Ticket, Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Evento', href: '#home' },
    { name: 'Premios', href: '#prizes' },
    { name: 'Participar', href: '#register' },
  ];

  const goToShop = () => {
    window.open('https://worldcaseuy.com', '_blank');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none`}
      >
        <div className={`
          pointer-events-auto
          flex items-center gap-2 sm:gap-6 px-2 sm:px-6 py-3 
          bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-full shadow-2xl transition-all duration-500
          ${isScrolled ? 'scale-90 bg-black/60' : 'scale-100'}
        `}>
          {/* Logo */}
          <a href="#" className="px-4 hover:brightness-125 transition-all">
            <img 
              src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_sinfondo_WC.png" 
              alt="World Case UY" 
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 p-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-brand-celeste/20 rounded-full transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={goToShop}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-acid hover:bg-brand-acid/10 rounded-full transition-all duration-300"
            >
              TIENDA
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pl-2 md:pl-0">
            <button 
               onClick={goToShop}
               title="Ver Tienda"
               className="relative p-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors group overflow-hidden"
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
            </button>
            <a 
               href="#register"
               title="Obtener Ticket de Sorteo"
               className="relative p-3 rounded-full bg-brand-celeste text-white hover:bg-white hover:text-brand-celeste transition-colors group overflow-hidden"
            >
              <Ticket size={18} strokeWidth={2.5} />
            </a>
            
            <button 
              className="md:hidden p-3 text-white hover:text-brand-celeste"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-brand-dark flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-4 border border-white/10 rounded-full hover:bg-white/10 hover:text-brand-celeste transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl font-black uppercase text-transparent text-stroke hover:text-brand-celeste hover:text-stroke-0 transition-all duration-300"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                onClick={goToShop}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="text-5xl font-black uppercase text-brand-acid hover:text-white transition-all duration-300"
              >
                TIENDA
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;