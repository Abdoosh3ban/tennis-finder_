import { motion } from 'motion/react';
import { Brain, Target, Users2, Sparkles, TrendingUp, MapPin, Clock, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const matchmakingSteps = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our advanced algorithm analyzes your playing style, skill level, match history, and preferences',
    stats: '50+ data points analyzed',
  },
  {
    icon: Target,
    title: 'Perfect Match Finding',
    description: 'We find players with compatible skill levels, schedules, and playing styles in your area',
    stats: '95% match satisfaction',
  },
  {
    icon: Users2,
    title: 'Connect & Play',
    description: 'Receive instant notifications, chat with potential partners, and schedule matches seamlessly',
    stats: '10K+ matches weekly',
  },
];

const matchingCriteria = [
  {
    icon: Award,
    title: 'Skill Level',
    details: ['NTRP Rating (1.0-7.0)', 'Win/Loss Ratio', 'Match History', 'Tournament Experience'],
  },
  {
    icon: Target,
    title: 'Playing Style',
    details: ['Baseline vs Net Play', 'Aggressive vs Defensive', 'Singles vs Doubles Preference', 'Pace & Spin'],
  },
  {
    icon: Clock,
    title: 'Availability',
    details: ['Preferred Time Slots', 'Frequency (1-7 days/week)', 'Match Duration', 'Timezone Matching'],
  },
  {
    icon: MapPin,
    title: 'Location',
    details: ['Distance Radius (1-50 km)', 'Favorite Courts', 'Indoor/Outdoor Preference', 'Travel Willingness'],
  },
];

const successStories = [
  {
    name: 'Sarah & James',
    match: '98% Compatible',
    image: 'https://images.unsplash.com/photo-1714802064623-cb489f99e309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBkb3VibGVzJTIwbWF0Y2glMjBwYXJ0bmVyc3xlbnwxfHx8fDE3NzU0MzQ5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: 'Matched in March 2026, now regular doubles partners. Won 3 local tournaments together!',
    matchesPlayed: 47,
  },
  {
    name: 'Marcus & Lisa',
    match: '96% Compatible',
    image: 'https://images.unsplash.com/photo-1646649852033-7e0f3d679f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXJzJTIwaGFuZHNoYWtlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU0MzQ5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: 'Found each other through skill-based matching. Perfect practice partners for improving serves.',
    matchesPlayed: 32,
  },
  {
    name: 'Tennis Club Group',
    match: '94% Compatible',
    image: 'https://images.unsplash.com/photo-1720751150237-bcb01b6c32b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBza2lsbCUyMGxldmVscyUyMHRyYWluaW5nfGVufDF8fHx8MTc3NTQzNDkwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: 'AI matched 8 players of similar level. Now they have weekly round-robin tournaments!',
    matchesPlayed: 156,
  },
];

export function SmartMatchmaking() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#163E1B] to-[#1F5A24] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">AI-Powered Technology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Matchmaking System
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our intelligent algorithm connects you with the perfect playing partners based on skill, style, and schedule
          </p>
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {matchmakingSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 text-xl shadow-lg">
                  {index + 1}
                </div>

                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h3>
                <p className="text-white/80 text-center mb-4">{step.description}</p>
                
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-white">
                    <TrendingUp className="w-4 h-4" />
                    {step.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Matching Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What We Consider for Perfect Matches
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingCriteria.map((criteria, index) => (
              <motion.div
                key={criteria.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#163E1B]/10 rounded-full flex items-center justify-center mb-4">
                  <criteria.icon className="w-6 h-6 text-[#163E1B]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{criteria.title}</h4>
                <ul className="space-y-2">
                  {criteria.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#163E1B] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Real Matches, Real Success Stories
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#163E1B] text-white text-sm font-semibold rounded-full">
                    {story.match}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{story.story}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-8 h-8 bg-[#163E1B]/10 rounded-full flex items-center justify-center">
                      <Users2 className="w-4 h-4 text-[#163E1B]" />
                    </div>
                    <span className="font-semibold">{story.matchesPlayed} matches played together</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="px-10 py-4 bg-white text-[#163E1B] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            Find Your Perfect Match
          </button>
          <p className="text-white/80 mt-4">Join 15,000+ players who found their ideal tennis partners</p>
        </motion.div>
      </div>
    </section>
  );
}
