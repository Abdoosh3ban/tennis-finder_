import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for casual players',
    features: [
      'Find nearby courts',
      'Basic court information',
      'Community access',
      'Profile creation',
      'Up to 5 bookings/month',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Most popular for regular players',
    features: [
      'Everything in Free',
      'Unlimited bookings',
      'AI-powered matchmaking',
      'Priority booking',
      'Equipment marketplace access',
      'Advanced statistics',
      'No booking fees',
      'Premium support',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '$24.99',
    period: 'per month',
    description: 'For serious tennis enthusiasts',
    features: [
      'Everything in Pro',
      'Personal coach matching',
      'Tournament access',
      'Exclusive court access',
      'Video analysis tools',
      'Nutrition & training plans',
      'VIP community events',
      'Concierge service',
    ],
    highlighted: false,
  },
];

export function Pricing() {
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
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing for every type of player
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#163E1B] to-[#1F5A24] text-white shadow-2xl scale-105'
                  : 'bg-gray-50 text-gray-900 shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-semibold text-sm flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-white' : 'text-[#163E1B]'
                      }`}
                    />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-[#163E1B] hover:bg-gray-100'
                    : 'bg-[#163E1B] text-white hover:bg-[#1F5A24]'
                }`}
              >
                {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            All plans include a <span className="font-semibold text-[#163E1B]">14-day money-back guarantee</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
