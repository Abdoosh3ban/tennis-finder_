import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Find Courts',
    traditional: true,
    tennisFinder: true,
  },
  {
    feature: 'Real-Time Availability',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Instant Booking',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Player Matchmaking',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Equipment Marketplace',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'AI Recommendations',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Mobile Payment',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: '24/7 Support',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Community Features',
    traditional: false,
    tennisFinder: true,
  },
  {
    feature: 'Court Reviews & Ratings',
    traditional: false,
    tennisFinder: true,
  },
];

export function Comparison() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Tennis Finder?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how we compare to traditional court booking methods
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            </div>
            <div className="p-6 text-center border-l border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600">Traditional Method</h3>
            </div>
            <div className="p-6 text-center bg-gradient-to-r from-[#163E1B] to-[#1F5A24] border-l border-gray-200">
              <h3 className="text-lg font-bold text-white">Tennis Finder</h3>
            </div>
          </div>

          {/* Table Body */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="grid grid-cols-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="p-6">
                <span className="text-gray-900 font-medium">{row.feature}</span>
              </div>
              <div className="p-6 flex items-center justify-center border-l border-gray-200">
                {row.traditional ? (
                  <Check className="w-6 h-6 text-gray-400" />
                ) : (
                  <X className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="p-6 flex items-center justify-center bg-[#163E1B]/5 border-l border-gray-200">
                {row.tennisFinder && (
                  <div className="w-8 h-8 bg-[#163E1B] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-10 py-4 bg-[#163E1B] text-white rounded-full font-bold text-lg hover:bg-[#1F5A24] transition-colors shadow-lg">
            Try Tennis Finder Free
          </button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
