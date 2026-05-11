import { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackendItem, fetchApi } from '../lib/api';
import {
  Search,
  Star,
  ShoppingCart,
  Heart,
  Filter,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const fallbackProductImage =
  'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=1080';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<BackendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchApi<BackendItem[]>('/api/items');

        if (!active) {
          return;
        }

        setProducts(data);
        setError(null);
      } catch (err) {
        if (!active) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Failed to load marketplace items');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        (product.description ?? '').toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === 'all' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesQuery && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleAddToCart = (productName: string) => {
    toast.info(`Backend connected for ${productName}. Cart checkout still needs authenticated user flows.`);
  };

  const handleWishlist = (productName: string) => {
    toast.success(`${productName} saved to wishlist preview`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Tennis Equipment Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse real marketplace listings from the backend catalog for rackets, apparel, shoes, and accessories.
            </p>
          </div>

          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search for rackets, shoes, apparel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rackets">Rackets</SelectItem>
                  <SelectItem value="balls">Balls</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">Browse Products</h2>
              <p className="text-gray-600">
                {loading ? 'Loading marketplace...' : `${filteredProducts.length} products available`}
              </p>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {error ? (
            <Card className="p-6 text-center text-red-600">{error}</Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-64 bg-gray-100">
                    <ImageWithFallback
                      src={product.images?.[0] || fallbackProductImage}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {index < 4 && (
                      <Badge className="absolute top-3 left-3 bg-orange-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                    {product.suggestedPrice && product.suggestedPrice > product.askingPrice && (
                      <Badge className="absolute top-3 right-3 bg-red-500">
                        Deal
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleWishlist(product.title)}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {product.category}
                    </Badge>

                    <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.suggestedPrice ? '4.8' : '4.6'}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.condition})
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      Sold by {product.owner ? `${product.owner.firstName} ${product.owner.lastName}` : 'Marketplace seller'}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl text-gray-900">EGP {product.askingPrice}</span>
                      {product.suggestedPrice && (
                        <span className="text-sm text-gray-500">
                          AI estimate: EGP {product.suggestedPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(product.title)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Backend Product Feed</h3>
              <p className="text-gray-600">
                Listings now come from the real Tennis Finder marketplace API instead of static frontend data.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Seller Information</h3>
              <p className="text-gray-600">
                Product cards now show actual owner details when they are returned by the backend.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">AI Price Context</h3>
              <p className="text-gray-600">
                The UI can display backend-provided suggested prices to support smarter marketplace decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
