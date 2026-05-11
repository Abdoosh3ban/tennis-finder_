import { motion } from 'motion/react';
import bookingPreview from '../../img/WhatsApp Image 2026-04-16 at 21.26.16.jpeg';
import marketplacePreview from '../../img/WhatsApp Image 2026-04-16 at 21.26.29.jpeg';
import homePreview from '../../img/WhatsApp Image 2026-04-16 at 21.26.52.jpeg';
import { ImageWithFallback } from './figma/ImageWithFallback';

const previews = [
  { image: homePreview, alt: 'TennisFinder home preview', delay: 0, offset: '-50' },
  { image: bookingPreview, alt: 'TennisFinder booking preview', delay: 0.2, elevated: true },
  { image: marketplacePreview, alt: 'TennisFinder marketplace preview', delay: 0.4, offset: '50' },
] as const;

export function AppPreview() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Experience the App
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real app screens from TennisFinder, linked directly from the local image files.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {previews.map((preview) => (
            <motion.div
              key={preview.alt}
              initial={{
                opacity: 0,
                x: preview.offset ? Number(preview.offset) : 0,
                y: preview.elevated ? 30 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: preview.delay }}
              className={`w-72 ${preview.elevated ? 'md:-mt-8' : ''}`}
            >
              <div className="bg-[#ecefe8] rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#d9e4d2]">
                  <ImageWithFallback
                    src={preview.image}
                    alt={preview.alt}
                    className="w-full h-[600px] object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
