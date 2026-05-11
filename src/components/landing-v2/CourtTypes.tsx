import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const courtTypes = [
  {
    name: 'Hard Court',
    description: 'Most common surface, consistent bounce, ideal for all playing styles',
    image: 'https://images.unsplash.com/photo-1773941811695-4e35ef23ceed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3IlMjBsb2NhdGlvbnxlbnwxfHx8fDE3NzU0MzQyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    courts: 234,
  },
  {
    name: 'Clay Court',
    description: 'Slower pace, higher bounce, perfect for baseline players',
    image: 'https://images.unsplash.com/photo-1658530190197-29f63baaa460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwdGVubmlzJTIwY291cnQlMjByZWR8ZW58MXx8fHwxNzc1NDM0NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    courts: 87,
  },
  {
    name: 'Grass Court',
    description: 'Fast-paced, low bounce, favors serve and volley game',
    image: 'https://images.unsplash.com/photo-1719762888013-6ae1e96d0eb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzcyUyMHRlbm5pcyUyMGNvdXJ0JTIwd2ltYmxlZG9ufGVufDF8fHx8MTc3NTQzNDQ4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    courts: 45,
  },
  {
    name: 'Indoor Court',
    description: 'Climate-controlled, available year-round, premium experience',
    image: 'https://images.unsplash.com/photo-1570736304069-20eb54e53450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjB0ZW5uaXMlMjBjb3VydCUyMGx1eHVyeXxlbnwxfHx8fDE3NzU0MzQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    courts: 156,
  },
];

export function CourtTypes() {
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
            Explore Court Types
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect surface for your playing style
          </p>
        </motion.div>

        {/* Court Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {courtTypes.map((court, index) => (
            <motion.div
              key={court.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{court.name}</h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{court.courts} courts available</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{court.description}</p>
                <button className="mt-4 text-[#163E1B] font-semibold hover:underline">
                  Find {court.name}s Near You →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
