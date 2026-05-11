import { motion } from 'motion/react';
import courtFinderPreview from '../../img/WhatsApp Image 2026-04-11 at 00.16.45 (2).jpeg';
import bookingDashboardPreview from '../../img/WhatsApp Image 2026-04-16 at 21.56.29.jpeg';
import financialPreview from '../../img/WhatsApp Image 2026-04-16 at 22.14.35.jpeg';
import { 
  Smartphone, 
  Calendar, 
  Bell, 
  MessageSquare, 
  BarChart3, 
  CreditCard, 
  Map,
  Camera,
  Share2,
  Shield,
  Zap,
  Heart
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const appScreenshots = [
  {
    title: 'Court Finder',
    description: 'Browse nearby courts, filter by city and surface, and book available sessions in a few clicks.',
    image: courtFinderPreview,
    imageClassName: 'object-contain object-top',
  },
  {
    title: 'Court Schedule',
    description: 'Manage bookings from the admin dashboard with a clear court timeline and fast reservation tools.',
    image: bookingDashboardPreview,
    imageClassName: 'object-contain object-top',
  },
  {
    title: 'Financial Analytics',
    description: 'Track revenue, expenses, payment methods, and profit from one simple reporting view.',
    image: financialPreview,
    imageClassName: 'object-contain object-top',
  },
];

const appFeatures = [
  {
    icon: Calendar,
    title: 'Smart Booking',
    description: 'Book courts instantly with real-time availability. Set recurring bookings and get automatic reminders.',
    color: 'bg-[#163E1B]',
  },
  {
    icon: Bell,
    title: 'Push Notifications',
    description: 'Get instant alerts for match requests, booking confirmations, weather updates, and court availability.',
    color: 'bg-[#1F5A24]',
  },
  {
    icon: MessageSquare,
    title: 'In-App Chat',
    description: 'Connect with players, coordinate matches, and build your tennis network with secure messaging.',
    color: 'bg-[#2E7D32]',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed statistics, match history, and personalized insights.',
    color: 'bg-[#4D8E41]',
  },
  {
    icon: Map,
    title: 'GPS Navigation',
    description: 'Get turn-by-turn directions to any court. Save favorites and discover new locations nearby.',
    color: 'bg-[#5E9C4E]',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Save payment methods, split costs with friends, and get instant receipts for all transactions.',
    color: 'bg-[#6EAA59]',
  },
  {
    icon: Camera,
    title: 'Match Recording',
    description: 'Record and analyze your matches. Share highlights with friends and coaches for feedback.',
    color: 'bg-[#7DB663]',
  },
  {
    icon: Share2,
    title: 'Social Sharing',
    description: 'Share your achievements, court check-ins, and match results on social media platforms.',
    color: 'bg-[#88BF6B]',
  },
  {
    icon: Shield,
    title: 'Privacy Controls',
    description: 'Full control over your profile visibility, match history, and who can contact you.',
    color: 'bg-[#9CCC65]',
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Use widgets and shortcuts for instant booking, match finding, and checking court availability.',
    color: 'bg-[#4B7F36]',
  },
  {
    icon: Heart,
    title: 'Favorites & Lists',
    description: 'Save favorite courts, players, and equipment. Create custom lists for easy access.',
    color: 'bg-[#355F2D]',
  },
  {
    icon: BarChart3,
    title: 'Skill Rating System',
    description: 'Official NTRP rating integration plus our proprietary skill assessment algorithm.',
    color: 'bg-[#2A5A2A]',
  },
];

const appStats = [
  { number: '4.9', label: 'App Store Rating', sublabel: 'From 12K+ reviews' },
  { number: '50K+', label: 'Daily Active Users', sublabel: 'And growing' },
  { number: '99.9%', label: 'Uptime', sublabel: 'Reliable service' },
  { number: '<1s', label: 'Booking Speed', sublabel: 'Lightning fast' },
];

const deviceFeatures = [
  {
    title: 'iOS App',
    version: 'v3.2.1',
    requirements: 'iOS 14.0 or later',
    size: '45 MB',
    features: ['Face ID Support', 'Apple Watch App', 'Siri Shortcuts', 'Widget Support', 'iCloud Sync'],
  },
  {
    title: 'Android App',
    version: 'v3.2.0',
    requirements: 'Android 8.0 or later',
    size: '38 MB',
    features: ['Fingerprint Auth', 'Wear OS App', 'Google Assistant', 'Home Screen Widgets', 'Google Drive Backup'],
  },
];

export function MobileAppFeatures() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#163E1B]/10 rounded-full mb-4">
            <Smartphone className="w-5 h-5 text-[#163E1B]" />
            <span className="text-[#163E1B] font-semibold">Mobile Application</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need in One App
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive mobile experience designed for tennis players by tennis players
          </p>
        </motion.div>

        {/* App Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {appStats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
            >
              <div className="text-4xl font-bold text-[#163E1B] mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Device Specific Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Optimized for Your Device
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {deviceFeatures.map((device, index) => (
              <motion.div
                key={device.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold">{device.title}</h4>
                  <span className="px-3 py-1 bg-[#163E1B] rounded-full text-sm font-semibold">
                    {device.version}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Requirements</div>
                    <div className="font-semibold">{device.requirements}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Download Size</div>
                    <div className="font-semibold">{device.size}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-300 mb-3">Platform Features:</div>
                  {device.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#163E1B] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Screenshots Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Intuitive Design, Powerful Features
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every screen is designed for speed and simplicity. Book a court, find a match, or browse equipment in seconds.
          </p>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {appScreenshots.map((screen) => (
              <div key={screen.title} className="rounded-[2rem] border border-[#dce7d9] bg-white p-4 shadow-[0_18px_40px_rgba(25,54,25,0.08)]">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[#e3ece0] bg-[#f5faf2] p-2">
                  <div className="h-full w-full overflow-hidden rounded-[1.1rem] bg-white">
                    <ImageWithFallback
                      src={screen.image}
                      alt={screen.title}
                      className={`w-full h-full ${screen.imageClassName}`}
                    />
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">{screen.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{screen.description}</p>
              </div>
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
          <button className="px-10 py-4 bg-[#163E1B] text-white rounded-full font-bold text-lg hover:bg-[#1F5A24] transition-colors shadow-lg">
            Download Now - It's Free
          </button>
          <p className="text-gray-500 mt-4">Available on iOS and Android • No credit card required</p>
        </motion.div>
      </div>
    </section>
  );
}
