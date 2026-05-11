import { motion } from 'motion/react';
import { Apple, Smartphone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import appDownloadPreview from '../../img/WhatsApp Image 2026-04-16 at 21.26.52.jpeg';

export function DownloadApp() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Download Tennis Finder Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Available on iOS and Android. Start booking courts and connecting with players in minutes.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              {[
                'Real-time court availability',
                'Instant booking confirmation',
                'Secure payment processing',
                'Player community access',
                'GPS navigation to courts',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#163E1B] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* QR Code Info */}
            <p className="text-sm text-gray-400 mt-6">
              Scan the QR code with your phone to download instantly
            </p>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end py-6"
          >
            <div className="absolute inset-0">
              <div className="absolute right-6 top-12 h-28 w-28 rounded-full bg-[#163E1B]/25 blur-3xl"></div>
              <div className="absolute bottom-10 left-4 h-36 w-36 rounded-full bg-white/8 blur-3xl"></div>
            </div>

            <div className="relative w-[320px] rounded-[3.25rem] bg-[#111c2d] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="rounded-[2.8rem] bg-[#f8f6ef] p-3 shadow-inner">
                <div className="relative overflow-hidden rounded-[2.35rem] bg-white">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-3">
                    <div className="h-8 w-40 rounded-full bg-black shadow-lg"></div>
                  </div>

                  <ImageWithFallback
                    src={appDownloadPreview}
                    alt="Tennis Finder app preview"
                    className="h-[640px] w-full object-cover object-top"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/8 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
