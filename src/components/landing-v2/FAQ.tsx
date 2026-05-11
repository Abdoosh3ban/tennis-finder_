import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I book a tennis court?',
    answer: 'Simply download the Tennis Finder app, create an account, search for courts near you, select your preferred time slot, and confirm your booking. You\'ll receive instant confirmation and directions to the court.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, Apple Pay, Google Pay, and PayPal. All transactions are secure and encrypted.',
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes! You can cancel or reschedule your booking up to 2 hours before your scheduled time for a full refund. Cancellations made within 2 hours are subject to a 50% cancellation fee.',
  },
  {
    question: 'How does the matchmaking feature work?',
    answer: 'Our AI-powered matchmaking analyzes your skill level, playing style, location, and availability to connect you with compatible players. You can filter by skill level, age group, and preferred playing times.',
  },
  {
    question: 'Is the equipment marketplace safe?',
    answer: 'Absolutely! All sellers are verified users, and we have a rating system. Transactions are protected, and we offer dispute resolution services. You can also read reviews before purchasing.',
  },
  {
    question: 'Do I need a membership to use Tennis Finder?',
    answer: 'No membership is required! You can use the free version to find courts and make basic bookings. Premium features like AI matchmaking and unlimited bookings require a Pro or Elite subscription.',
  },
  {
    question: 'Are there courts available for beginners?',
    answer: 'Yes! We have courts suitable for all skill levels. You can filter courts by skill level recommendations, and many locations offer coaching services and beginner-friendly sessions.',
  },
  {
    question: 'What if it rains on my booking day?',
    answer: 'For outdoor courts, if weather conditions are unsafe, you can reschedule free of charge. Indoor courts are available year-round regardless of weather. Check our weather protection policy for details.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#0f172a]">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about Tennis Finder
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-7 py-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className="pr-8 text-xl font-semibold text-[#0f172a]">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[#163E1B] transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-100 px-7 pb-6 pt-1 text-base leading-8 text-slate-600">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="mb-4 text-2xl font-medium text-slate-600">Still have questions?</p>
          <button className="rounded-full bg-[#163E1B] px-10 py-3.5 font-semibold text-white shadow-lg transition-colors hover:bg-[#1F5A24]">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
