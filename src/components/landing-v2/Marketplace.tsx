import { motion } from 'motion/react';
import { ShoppingBag, Star, MapPin, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    name: 'Wilson Pro Staff 97',
    price: '$189',
    originalPrice: '$249',
    rating: 4.8,
    reviews: 124,
    location: '2.3 km away',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1773186315376-88aaf9878707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NDI5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
  {
    name: 'Nike Court Zoom Vapor',
    price: '$85',
    originalPrice: '$120',
    rating: 4.6,
    reviews: 89,
    location: '3.7 km away',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1773186315376-88aaf9878707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NDI5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
  {
    name: 'Babolat Tennis Balls (12)',
    price: '$15',
    originalPrice: '$25',
    rating: 4.9,
    reviews: 203,
    location: '1.2 km away',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1773186315376-88aaf9878707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NDI5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
  {
    name: 'Head Tennis Bag',
    price: '$45',
    originalPrice: '$70',
    rating: 4.7,
    reviews: 67,
    location: '4.1 km away',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1773186315376-88aaf9878707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NDI5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
];

const marketplaceStats = [
  { label: 'Active Listings', value: '2,500+' },
  { label: 'Items Sold', value: '12,000+' },
  { label: 'Average Savings', value: '35%' },
  { label: 'Verified Sellers', value: '1,200+' },
];

export function Marketplace() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
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
            <ShoppingBag className="w-5 h-5 text-[#163E1B]" />
            <span className="text-[#163E1B] font-semibold">Equipment Marketplace</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Buy & Sell Tennis Equipment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find great deals on quality tennis gear from trusted sellers in your area
          </p>
        </motion.div>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {marketplaceStats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="text-3xl font-bold text-[#163E1B] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#163E1B] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Featured
                  </div>
                )}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white text-gray-900 text-xs font-semibold rounded-full">
                  {product.condition}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#163E1B]">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>

                {/* CTA Button */}
                <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-[#163E1B] text-white rounded-full font-semibold text-lg hover:bg-[#1F5A24] transition-colors">
            Browse All Equipment
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Join 1,200+ verified sellers • Safe transactions • Buyer protection
          </p>
        </motion.div>
      </div>
    </section>
  );
}
