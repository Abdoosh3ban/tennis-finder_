import { motion } from 'motion/react';
import { Shield, Award, Users, Zap } from 'lucide-react';

const partners = [
  { name: 'USTA', description: 'Official Partner' },
  { name: 'ATP', description: 'Tour Sponsor' },
  { name: 'ITF', description: 'Federation Member' },
  { name: 'WTA', description: 'Certified Partner' },
];

const trustBadges = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-level encryption',
  },
  {
    icon: Award,
    title: 'Verified Courts',
    description: 'Quality guaranteed',
  },
  {
    icon: Users,
    title: 'Trusted Community',
    description: '15K+ active users',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Real-time availability',
  },
];

export function Partners() {
  return (
    <section className="py-20 px-4 bg-white">
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
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partnered with the world's top tennis organizations
          </p>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl font-bold text-[#163E1B] mb-2">{partner.name}</div>
              <p className="text-sm text-gray-500">{partner.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#163E1B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-8 h-8 text-[#163E1B]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
