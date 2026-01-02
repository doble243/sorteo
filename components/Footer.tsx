import React from 'react';
import { Instagram, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-10">
           <h2 className="text-[10vw] md:text-[6vw] leading-none font-black tracking-tighter text-white/5 select-none">
             WORLD CASE UY
           </h2>
           
           <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <a 
                href="https://instagram.com/world_case_uy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300"
              >
                 <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-celeste group-hover:bg-brand-celeste/10 transition-all">
                   <Instagram size={24} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-brand-celeste uppercase tracking-widest">Seguinos</span>
                   <span className="text-xl font-black tracking-tight">@world_case_uy</span>
                 </div>
              </a>

              <a 
                href="https://worldcaseuy.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300"
              >
                 <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-acid group-hover:bg-brand-acid/10 transition-all">
                   <ShoppingBag size={24} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-brand-acid uppercase tracking-widest">Nuestra Tienda</span>
                   <span className="text-xl font-black tracking-tight">worldcaseuy.com</span>
                 </div>
              </a>
           </div>

           <div className="w-full border-t border-white/5 pt-8 mt-4 text-center">
             <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
               © 2026 WORLD CASE UY · ATLÁNTIDA · URUGUAY
             </p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;