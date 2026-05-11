import { motion } from 'motion/react';
import { Search, Clock, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Search Courts',
    description: 'Browse available tennis courts in your area with detailed information and photos.',
  },
  {
    icon: Clock,
    number: '02',
    title: 'Choose Time',
    description: 'Select your preferred date and time slot with real-time availability updates.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Book Instantly',
    description: 'Confirm your booking and receive instant confirmation. Start playing!',
  },
];

export function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book your court in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#163E1B]/50 to-transparent"></div>
              )}

              {/* Icon Circle */}
              <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-[#163E1B] to-[#1F5A24] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <step.icon className="w-14 h-14 text-white" />
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-[#163E1B]">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
