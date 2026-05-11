import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CTASection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1773186315376-88aaf9878707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NDI5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Tennis equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#163E1B]/95 to-[#1F5A24]/95"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto max-w-4xl text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Start Playing Today
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-white/90">
          Join thousands of players already using Tennis Finder to elevate their game
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-white text-[#163E1B] rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition-colors"
        >
          Get Started
        </motion.button>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">10K+</p>
            <p className="text-white/80">Active Players</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">500+</p>
            <p className="text-white/80">Tennis Courts</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">50K+</p>
            <p className="text-white/80">Bookings Made</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">4.9</p>
            <p className="text-white/80">App Rating</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
