import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Instagram, CheckCircle, Sparkles, ExternalLink, Loader2, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xsfsdlolgfwigqkjzlll.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZnNkbG9sZ2Z3aWdxa2p6bGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NzExNDMsImV4cCI6MjA3OTA0NzE0M30.5HgJxG_MAInuYWrZY8Wb2zB3zymROoGI_9xIopWUH1I'
);

const RaffleRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    instagram: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isOpeningInsta, setIsOpeningInsta] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('raffle_tickets')
        .insert([
          {
            full_name: formData.name,
            whatsapp_number: formData.phone,
            instagram_username: formData.instagram,
            is_following_on_instagram: false
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error('Error saving ticket:', error);
        alert('Hubo un error al guardar tu ticket. Por favor intenta nuevamente.');
        return;
      }
      
      if (data) {
        setTicketId(data.id);
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al guardar tu ticket. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmFollowing = async (checked: boolean) => {
    setIsConfirmed(checked);
    
    if (checked && ticketId) {
      try {
        const { error } = await supabase
          .from('raffle_tickets')
          .update({ is_following_on_instagram: true })
          .eq('id', ticketId);
        
        if (error) {
          console.error('Error updating ticket:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  const goToInstagram = () => {
    setIsOpeningInsta(true);
    // Visual feedback delay before opening
    setTimeout(() => {
      window.open('https://instagram.com/world_case_uy', '_blank');
      setIsOpeningInsta(false);
    }, 600);
  };

  return (
    <section id="register" className="py-16 md:py-24 bg-brand-dark border-t border-white/10 relative overflow-hidden min-h-screen flex items-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-celeste/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            {/* Left Content - Pitch */}
            <div className="order-2 lg:order-1">
                <h2 className="font-mono text-brand-celeste text-lg md:text-xl mb-4 tracking-widest">
                    REGISTRO TEMPORADA '26
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase mb-6 md:mb-8 leading-none">
                    TUS DATOS <br/>
                    <span className="text-transparent text-stroke" style={{WebkitTextStroke: '2px white'}}>AQUÍ</span>
                </h3>
                <div className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
                    <p className="mb-4">Completá el formulario para participar en los sorteos de la temporada.</p>
                    <ul className="space-y-2 font-mono text-sm md:text-base">
                      <li><strong className="text-brand-celeste">Primer Sorteo:</strong> 05/01/2026</li>
                      <li><strong className="text-brand-celeste">Segundo Sorteo:</strong> A CONFIRMAR</li>
                      <li><strong className="text-brand-celeste">Tercer Sorteo:</strong> 28/02/2026</li>
                    </ul>
                    <p className="mt-6">Recordá que somos <strong>World Case UY</strong>, líderes en personalización con tecnología UV y Tinta Resina.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                   <div className="p-3 md:p-4 border border-white/10 bg-white/5 rounded-xl backdrop-blur-sm text-center">
                      <Sparkles className="text-brand-celeste mb-2 mx-auto" size={20} />
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Proceso</div>
                      <div className="font-bold text-white text-sm">Full Custom</div>
                   </div>
                   <div className="p-3 md:p-4 border border-white/10 bg-white/5 rounded-xl backdrop-blur-sm text-center">
                      <Sparkles className="text-brand-acid mb-2 mx-auto" size={20} />
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Exclusivo</div>
                      <div className="font-bold text-white text-sm">Atlántida</div>
                   </div>
                </div>
            </div>

            {/* Right Content - Form */}
            <div className="order-1 lg:order-2">
                <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-celeste via-brand-acid to-brand-celeste opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    <div className="relative bg-[#0a0a0a] rounded-xl md:rounded-2xl p-4 md:p-6 z-10 h-full">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="text-center mb-4">
                                    <Ticket size={40} className="text-white mx-auto mb-4" />
                                    <h4 className="text-xl md:text-2xl font-bold text-white uppercase">Ticket de Sorteo</h4>
                                    <p className="text-[10px] md:text-xs text-gray-500 font-mono">Válido para toda la temporada 2026</p>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-brand-celeste mb-2 uppercase">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 focus:border-brand-celeste text-white px-3 md:px-4 py-3 md:py-4 outline-none transition-colors rounded-lg text-sm md:text-base"
                                        placeholder="Ej: Mateo Rodríguez"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-brand-celeste mb-2 uppercase">Número de Contacto</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 focus:border-brand-celeste text-white px-3 md:px-4 py-3 md:py-4 outline-none transition-colors rounded-lg text-sm md:text-base"
                                        placeholder="Ej: 094 123 456"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-brand-celeste mb-2 uppercase">Tu Instagram (@)</label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <input 
                                            type="text" 
                                            name="instagram"
                                            required
                                            value={formData.instagram}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 focus:border-brand-celeste text-white pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 outline-none transition-colors rounded-lg text-sm md:text-base"
                                            placeholder="@tu.perfil"
                                        />
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 md:py-5 bg-brand-celeste text-white font-black uppercase tracking-widest hover:bg-white hover:text-brand-celeste transition-all rounded-lg shadow-xl shadow-brand-celeste/20 text-sm md:text-base"
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="animate-spin mx-auto" size={20} />
                                      </>
                                    ) : (
                                      'REGISTRARME'
                                    )}
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-8 md:py-12"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-celeste rounded-full flex items-center justify-center mb-4 md:mb-6 text-white shadow-lg shadow-brand-celeste/20">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">¡CASI LISTO!</h3>
                                <p className="text-gray-400 mb-4 md:mb-6 max-w-xs text-sm md:text-base">
                                    Para validar tu participación, es <strong>obligatorio</strong> seguirnos en Instagram.
                                </p>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={goToInstagram}
                                    disabled={isOpeningInsta}
                                    className={`w-full py-4 md:py-5 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-black uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-2 shadow-xl shadow-pink-500/20 text-sm md:text-base ${isOpeningInsta ? 'brightness-75' : 'hover:brightness-110 active:scale-95'}`}
                                >
                                    {isOpeningInsta ? (
                                      <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                      <Instagram size={18} />
                                    )}
                                    {isOpeningInsta ? 'ABRIENDO...' : 'SEGUIR @WORLD_CASE_UY'}
                                </motion.button>
                                
                                <div className="mt-4 md:mt-6 flex items-start gap-2 md:gap-3">
                                    <input
                                        type="checkbox"
                                        id="followConfirm"
                                        checked={isConfirmed}
                                        onChange={(e) => handleConfirmFollowing(e.target.checked)}
                                        className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded border-gray-600 bg-gray-700 text-brand-celeste focus:ring-brand-celeste focus:ring-2"
                                    />
                                    <label htmlFor="followConfirm" className="text-xs md:text-sm text-gray-400 cursor-pointer leading-tight">
                                        Confirmo que ya estoy siguiendo a <span className="text-white font-bold">@world_case_uy</span> en Instagram
                                    </label>
                                </div>
                                
                                {isConfirmed && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 md:mt-6 text-center"
                                    >
                                        <div className="mb-4">
                                            <img src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_sinfondo_WC.png" alt="World Case" className="h-10 md:h-12 mx-auto opacity-80" />
                                        </div>
                                        <p className="text-brand-celeste font-bold text-base md:text-lg mb-2">¡MUCHAS GRACIAS POR PARTICIPAR!</p>
                                        <p className="text-white text-sm md:text-base">MUCHA SUERTE EN EL SORTEO 🍀</p>
                                    </motion.div>
                                )}

                                <div className="mt-6 md:mt-8 flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-mono">
                                    <ExternalLink size={10} />
                                    <span>Se abrirá en una nueva pestaña</span>
                                </div>
                                
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 md:mt-8 text-xs md:text-sm text-gray-500 underline hover:text-white active:text-white"
                                >
                                    Volver a editar mis datos
                                </button>
                                
                                <button 
                                    onClick={() => window.location.href = '#home'}
                                    className="mt-4 px-4 py-2 md:px-6 md:py-3 bg-brand-celeste/20 text-brand-celeste border border-brand-celeste/30 font-black text-xs md:text-sm uppercase tracking-widest rounded-lg hover:bg-brand-celeste hover:text-white transition-all active:scale-95"
                                >
                                    VOLVER A LA PÁGINA PRINCIPAL
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default RaffleRegistration;