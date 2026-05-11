import { motion } from 'motion/react';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '15,000+',
    label: 'Active Players',
    description: 'Join our growing community',
  },
  {
    icon: Award,
    number: '500+',
    label: 'Partner Courts',
    description: 'Across 50+ cities',
  },
  {
    icon: TrendingUp,
    number: '75,000+',
    label: 'Matches Completed',
    description: 'And counting every day',
  },
  {
    icon: Clock,
    number: '24/7',
    label: 'Support Available',
    description: 'Always here to help',
  },
];

export function Statistics() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#163E1B] to-[#1F5A24]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tennis Finder by the Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Trusted by thousands of players worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-xl font-semibold mb-2">{stat.label}</p>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
