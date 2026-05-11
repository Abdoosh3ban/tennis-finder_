import { motion } from 'motion/react';
import { Users, MapPin, ShoppingBag, Calendar, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Smart Matchmaking',
    description: 'Connect with players of similar skill levels and find your perfect tennis partner.',
  },
  {
    icon: MapPin,
    title: 'Find Courts Nearby',
    description: 'Discover tennis courts in your area with detailed information and directions.',
  },
  {
    icon: ShoppingBag,
    title: 'Equipment Marketplace',
    description: 'Buy and sell tennis equipment easily within our trusted community.',
  },
  {
    icon: Calendar,
    title: 'Easy Booking System',
    description: 'Book courts instantly with real-time availability and seamless payment.',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Get personalized court and player suggestions powered by AI technology.',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the tools to elevate your tennis game in one powerful app
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#163E1B]/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-[#163E1B]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
