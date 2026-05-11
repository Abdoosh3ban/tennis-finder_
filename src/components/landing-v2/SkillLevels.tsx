import { motion } from 'motion/react';
import { Trophy, TrendingUp, Target, Award, Star, Users } from 'lucide-react';

const skillLevels = [
  {
    level: '1.0 - 2.0',
    name: 'Beginner',
    icon: Star,
    color: 'bg-[#163E1B]',
    description: 'New to tennis, learning basic strokes and rules',
    characteristics: [
      'Limited playing experience',
      'Working on basic groundstrokes',
      'Learning court positioning',
      'Focus on consistency',
    ],
    players: '2,340',
  },
  {
    level: '2.5 - 3.0',
    name: 'Advanced Beginner',
    icon: TrendingUp,
    color: 'bg-[#1F5A24]',
    description: 'Developing reliable strokes with moderate pace',
    characteristics: [
      'Consistent groundstrokes',
      'Basic net play ability',
      'Understanding of singles strategy',
      'Can sustain rallies',
    ],
    players: '4,890',
  },
  {
    level: '3.5 - 4.0',
    name: 'Intermediate',
    icon: Target,
    color: 'bg-[#2E7D32]',
    description: 'Good shot anticipation and dependable strokes',
    characteristics: [
      'Directional control on shots',
      'Comfortable at the net',
      'Doubles strategies understood',
      'Variable spin and pace',
    ],
    players: '5,120',
  },
  {
    level: '4.5 - 5.0',
    name: 'Advanced',
    icon: Award,
    color: 'bg-[#4D8E41]',
    description: 'Strong all-around game with power and consistency',
    characteristics: [
      'Powerful serves with spin',
      'Strong volleys and overheads',
      'Tactical game awareness',
      'Tournament experience',
    ],
    players: '2,180',
  },
  {
    level: '5.5+',
    name: 'Expert/Pro',
    icon: Trophy,
    color: 'bg-[#9CCC65]',
    description: 'Professional or near-professional level player',
    characteristics: [
      'Exceptional shot-making',
      'Advanced tactical knowledge',
      'Competitive tournament play',
      'Teaching capability',
    ],
    players: '470',
  },
];

const matchmakingFeatures = [
  {
    title: 'Dynamic Skill Assessment',
    description: 'Our AI continuously evaluates your performance across matches to update your skill rating in real-time.',
    stat: '95% accuracy',
  },
  {
    title: 'Compatible Pairing',
    description: 'Match with players within ±0.5 NTRP rating for competitive yet enjoyable games.',
    stat: '10K+ weekly matches',
  },
  {
    title: 'Progress Tracking',
    description: 'Watch your skill level improve over time with detailed analytics and coaching insights.',
    stat: '85% see improvement',
  },
  {
    title: 'Fair Play Guarantee',
    description: 'Community ratings and reviews ensure players accurately represent their skill levels.',
    stat: '4.8/5 rating system',
  },
];

export function SkillLevels() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#163E1B]/10 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-[#163E1B]" />
            <span className="text-[#163E1B] font-semibold">NTRP Rating System</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Find Players at Your Level
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We use the official NTRP (National Tennis Rating Program) system to ensure fair and competitive matches
          </p>
        </motion.div>

        {/* Skill Levels */}
        <div className="space-y-6 mb-20">
          {skillLevels.map((skill, index) => (
            <motion.div
              key={skill.level}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="grid md:grid-cols-3 gap-6 p-8">
                {/* Left Section - Level Info */}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${skill.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{skill.level}</div>
                    <div className="text-lg font-semibold text-[#163E1B] mb-2">{skill.name}</div>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{skill.players} active players</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Characteristics */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Player Characteristics:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {skill.characteristics.map((char) => (
                      <div key={char} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#163E1B] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Matchmaking Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Our Skill Matching Works
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {matchmakingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#163E1B]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 flex-1">{feature.title}</h4>
                  <span className="px-3 py-1 bg-[#163E1B]/10 text-[#163E1B] text-sm font-semibold rounded-full whitespace-nowrap ml-4">
                    {feature.stat}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Assessment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-br from-[#163E1B] to-[#1F5A24] rounded-3xl p-12 text-white"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-[#9CCC65]" />
          <h3 className="text-3xl font-bold mb-4">Not Sure About Your Level?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take our free 5-minute AI-powered skill assessment to get your official NTRP rating
          </p>
          <button className="px-10 py-4 bg-white text-[#163E1B] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            Take Skill Assessment
          </button>
          <p className="text-sm text-white/70 mt-4">Used by 15,000+ players • 95% accuracy rating</p>
        </motion.div>
      </div>
    </section>
  );
}
